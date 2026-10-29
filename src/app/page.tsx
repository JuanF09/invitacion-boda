"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DAVID_THALIA_GUESTS, FALLBACK_GUESTS_WITH_IDS } from "@/lib/defaultGuests";
import {
  CheckCircle,
  Clock,
  XCircle,
  Send,
  Copy,
  Pencil,
  Trash2,
  Plus,
  Search,
  ExternalLink,
  Users,
  Database,
  AlertTriangle,
} from "lucide-react";
import { parseGuestObservation } from "@/components/RSVPForm";

type Guest = {
  id: string;
  name: string;
  phone: string | null;
  status: "pending" | "attending" | "declined";
  observation: string | null;
};

export default function Home() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Filtros de búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "attending" | "pending" | "declined">("all");

  // Estados para el Modal CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentGuest, setCurrentGuest] = useState<Partial<Guest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selector cuando un invitado tiene 2 teléfonos registrados
  const [phoneChoiceGuest, setPhoneChoiceGuest] = useState<{ guest: Guest; phones: string[] } | null>(null);

  const fetchGuests = async () => {
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.warn("Supabase no disponible, activando lista local de respaldo:", error.message);
        setIsOfflineFallback(true);
        setGuests(FALLBACK_GUESTS_WITH_IDS);
      } else {
        setIsOfflineFallback(false);
        setGuests(data || []);
      }
    } catch (err) {
      console.warn("Error de conexión con Supabase, activando lista local:", err);
      setIsOfflineFallback(true);
      setGuests(FALLBACK_GUESTS_WITH_IDS);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        "¿Deseas reemplazar la base de datos con los 75 invitados oficiales de David & Thalia (125 cupos)?"
      )
    ) {
      return;
    }

    setIsSeeding(true);
    try {
      const { data: existing, error: fetchErr } = await supabase.from("guests").select("id");
      if (fetchErr) throw fetchErr;

      if (existing && existing.length > 0) {
        const ids = existing.map((g) => g.id);
        const { error: delErr } = await supabase.from("guests").delete().in("id", ids);
        if (delErr) throw delErr;
      }

      const { error: insErr } = await supabase.from("guests").insert(DAVID_THALIA_GUESTS);
      if (insErr) throw insErr;

      await fetchGuests();
      alert("¡Se han cargado exitosamente los 75 invitados de David & Thalia!");
    } catch (error) {
      console.error("Error seeding guests:", error);
      alert(
        "No se pudo conectar con Supabase. Verifica que tu proyecto en app.supabase.com esté activo (no pausado)."
      );
    } finally {
      setIsSeeding(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchGuests();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "guests",
        },
        () => {
          fetchGuests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F7F5F0]">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-[#526330]/20 max-w-sm w-full text-center">
          <p className="font-script text-3xl text-[#526330] mb-1">David & Thalia</p>
          <h1 className="text-3xl font-serif text-[#2C3325] mb-2 uppercase tracking-wider">
            Panel de Control
          </h1>
          <p className="text-[#2C3325]/70 mb-6 text-sm font-sans">
            Ingresa el PIN de acceso para gestionar la lista de invitados.
          </p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (pin === "2026") setIsAuthenticated(true);
                else alert("PIN incorrecto");
              }
            }}
            className="w-full p-4 rounded-xl border border-[#526330]/30 text-center text-2xl tracking-[0.5em] mb-6 focus:outline-none focus:border-[#526330] transition-colors font-mono"
            placeholder="****"
            maxLength={4}
          />
          <button
            onClick={() => {
              if (pin === "2026") {
                setIsAuthenticated(true);
              } else {
                alert("PIN incorrecto");
              }
            }}
            className="w-full bg-[#526330] text-white p-4 rounded-xl font-serif font-semibold tracking-[0.2em] hover:bg-[#3B4920] transition-colors cursor-pointer"
          >
            ENTRAR
          </button>
          <p className="mt-4 text-xs text-[#2C3325]/50 font-sans">Pista: Año de la boda (2026)</p>
        </div>
      </div>
    );
  }

  // Cálculo de estadísticas tanto por invitaciones como por cupos/personas reales
  const stats = guests.reduce(
    (acc, g) => {
      const parsed = parseGuestObservation(g.observation);
      acc.totalInvitations += 1;
      acc.totalPasses += parsed.maxPasses;

      if (g.status === "attending") {
        acc.attendingInvitations += 1;
        acc.attendingPasses += parsed.confirmedPasses ?? parsed.maxPasses;
      } else if (g.status === "declined") {
        acc.declinedInvitations += 1;
        acc.declinedPasses += parsed.maxPasses;
      } else {
        acc.pendingInvitations += 1;
        acc.pendingPasses += parsed.maxPasses;
      }
      return acc;
    },
    {
      totalInvitations: 0,
      totalPasses: 0,
      attendingInvitations: 0,
      attendingPasses: 0,
      declinedInvitations: 0,
      declinedPasses: 0,
      pendingInvitations: 0,
      pendingPasses: 0,
    }
  );

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.phone && g.phone.includes(searchQuery)) ||
      (g.observation && g.observation.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (guest: Guest) => {
    const parsed = parseGuestObservation(guest.observation);
    switch (guest.status) {
      case "attending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3.5 h-3.5" /> Confirmado (
            {parsed.confirmedPasses ?? parsed.maxPasses}/{parsed.maxPasses})
          </span>
        );
      case "declined":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3.5 h-3.5" /> No asiste
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Pendiente ({parsed.maxPasses}{" "}
            {parsed.maxPasses === 1 ? "cupo" : "cupos"})
          </span>
        );
    }
  };

  const openWhatsAppWithPhone = (guest: Guest, rawPhone: string) => {
    let cleanPhone = rawPhone.replace(/\D/g, "");
    if (cleanPhone.length === 10 && cleanPhone.startsWith("3")) {
      cleanPhone = `57${cleanPhone}`;
    }
    const baseUrl = window.location.origin;
    const invitationUrl = `${baseUrl}/invitacion/${guest.id}`;
    const message = `¡Hola ${guest.name}! 🤍\n\nHay momentos que se convierten en recuerdos eternos y sueños que Dios hace realidad. Hoy nuestros corazones se preparan para dar el sí más importante de nuestras vidas y nos encantaría que nos acompañaras a celebrar nuestra boda.\n\nDescubre tu invitación personalizada y confirma tu asistencia antes del 06 de noviembre en el siguiente enlace:\n\n✨ ${invitationUrl}\n\nCon cariño,\nDavid & Thalia`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, "_blank");
    setPhoneChoiceGuest(null);
  };

  const handleSendWhatsApp = (guest: Guest) => {
    if (!guest.phone || !guest.phone.trim()) {
      alert("Este invitado aún no tiene número de teléfono registrado. Puedes agregarlo en el botón Editar.");
      return;
    }

    const phones = guest.phone
      .split(/[-/]/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (phones.length > 1) {
      setPhoneChoiceGuest({ guest, phones });
    } else {
      openWhatsAppWithPhone(guest, phones[0]);
    }
  };

  const handleCopyLink = (guest: Guest) => {
    const baseUrl = window.location.origin;
    const invitationUrl = `${baseUrl}/invitacion/${guest.id}`;
    navigator.clipboard.writeText(invitationUrl);
    alert(`¡Enlace de ${guest.name} copiado al portapapeles!`);
  };

  // --- Lógica del CRUD ---
  const handleOpenModal = (mode: "add" | "edit", guest?: Guest) => {
    setModalMode(mode);
    setCurrentGuest(
      guest || { name: "", phone: "", observation: "Cupos: 2", status: "pending" }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentGuest({});
  };

  const handleSaveGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isOfflineFallback) {
        if (modalMode === "add") {
          const newG: Guest = {
            id: `inv-${guests.length + 1}`,
            name: currentGuest.name || "Invitado",
            phone: currentGuest.phone || null,
            observation: currentGuest.observation || "Cupos: 1",
            status: currentGuest.status || "pending",
          };
          setGuests((prev) => [...prev, newG]);
        } else if (modalMode === "edit" && currentGuest.id) {
          setGuests((prev) =>
            prev.map((g) => (g.id === currentGuest.id ? ({ ...g, ...currentGuest } as Guest) : g))
          );
        }
        handleCloseModal();
        return;
      }

      if (modalMode === "add") {
        const { error } = await supabase.from("guests").insert([
          {
            name: currentGuest.name,
            phone: currentGuest.phone || null,
            observation: currentGuest.observation || "Cupos: 1",
            status: currentGuest.status || "pending",
          },
        ]);
        if (error) throw error;
      } else if (modalMode === "edit" && currentGuest.id) {
        const { error } = await supabase
          .from("guests")
          .update({
            name: currentGuest.name,
            phone: currentGuest.phone || null,
            observation: currentGuest.observation || "Cupos: 1",
            status: currentGuest.status,
          })
          .eq("id", currentGuest.id);
        if (error) throw error;
      }

      await fetchGuests();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving guest:", error);
      alert("Hubo un error al guardar el invitado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGuest = async (id: string, name: string) => {
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar a ${name}? Esta acción no se puede deshacer y su link de invitación dejará de funcionar.`
      )
    ) {
      if (isOfflineFallback) {
        setGuests((prev) => prev.filter((g) => g.id !== id));
        return;
      }
      try {
        const { error } = await supabase.from("guests").delete().eq("id", id);
        if (error) throw error;
        await fetchGuests();
      } catch (error) {
        console.error("Error deleting guest:", error);
        alert("Hubo un error al eliminar el invitado.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center bg-[#F7F5F0]">
        <div className="animate-spin w-8 h-8 border-4 border-[#526330] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#526330]/15 pb-6">
          <div>
            <p className="font-script text-3xl text-[#526330]">David & Thalia</p>
            <h1 className="text-3xl md:text-4xl font-serif text-[#2C3325] uppercase tracking-wider">
              Panel de Control de Invitados
            </h1>
            <p className="text-xs sm:text-sm text-[#2C3325]/65 font-sans mt-1">
              Domingo, 15 de Noviembre 2026 · Club del Comercio (Salón Patio de los Cujíes)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/invitacion/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#526330]/10 hover:bg-[#526330]/20 text-[#3B4920] rounded-lg text-xs sm:text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Invitación Demo
            </a>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm font-sans text-[#2C3325]/60 hover:text-[#526330] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Aviso si Supabase está pausado o botón para sincronizar lista */}
        {isOfflineFallback ? (
          <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-900">
                <p className="font-semibold">
                  Modo Vista Previa Activo (75 invitados de David & Thalia cargados localmente)
                </p>
                <p className="mt-0.5 text-amber-800/90">
                  El proyecto de Supabase (<code>fhmsehgnpjayookogbck.supabase.co</code>) aparece
                  pausado por inactividad. Puedes reactivarlo en{" "}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    supabase.com/dashboard
                  </a>{" "}
                  y pulsar <strong>Sincronizar Base de Datos</strong>, o probar ahora mismo todas
                  las invitaciones desde la tabla inferior.
                </p>
              </div>
            </div>
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <Database className="w-4 h-4" />
              {isSeeding ? "Sincronizando..." : "Sincronizar Base de Datos"}
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#526330]/30 hover:bg-[#526330]/10 text-[#3B4920] rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-2xs"
            >
              <Database className="w-3.5 h-3.5" />
              {isSeeding
                ? "Cargando invitados..."
                : "Cargar / Restaurar los 75 invitados de David & Thalia"}
            </button>
          </div>
        )}

        {/* Stats Cards (Invitaciones + Personas/Cupos) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#526330]/15 text-center">
            <p className="text-xs text-[#2C3325]/60 font-sans uppercase tracking-wider mb-1">
              Total Cupos
            </p>
            <p className="text-4xl font-serif text-[#526330] font-semibold">{stats.totalPasses}</p>
            <p className="text-xs text-[#2C3325]/55 mt-1">
              en {stats.totalInvitations} invitaciones
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#526330]/15 text-center">
            <p className="text-xs text-[#2C3325]/60 font-sans uppercase tracking-wider mb-1">
              Personas Confirmadas
            </p>
            <p className="text-4xl font-serif text-green-700 font-semibold">
              {stats.attendingPasses}
            </p>
            <p className="text-xs text-[#2C3325]/55 mt-1">
              {stats.attendingInvitations} familias/pases
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#526330]/15 text-center">
            <p className="text-xs text-[#2C3325]/60 font-sans uppercase tracking-wider mb-1">
              No Asisten
            </p>
            <p className="text-4xl font-serif text-red-700 font-semibold">
              {stats.declinedPasses}
            </p>
            <p className="text-xs text-[#2C3325]/55 mt-1">
              {stats.declinedInvitations} familias/pases
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#526330]/15 text-center">
            <p className="text-xs text-[#2C3325]/60 font-sans uppercase tracking-wider mb-1">
              Cupos Pendientes
            </p>
            <p className="text-4xl font-serif text-amber-700 font-semibold">
              {stats.pendingPasses}
            </p>
            <p className="text-xs text-[#2C3325]/55 mt-1">
              {stats.pendingInvitations} por responder
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xs border border-[#526330]/15 overflow-hidden">
          <div className="px-6 py-5 border-b border-[#526330]/10 bg-[#526330]/5 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#526330]" />
              <h3 className="font-serif text-xl text-[#2C3325] font-semibold">
                Lista de Invitados ({filteredGuests.length})
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Buscador */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#2C3325]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar invitado o teléfono..."
                  className="pl-9 pr-4 py-2 text-sm rounded-lg border border-[#526330]/25 bg-white focus:outline-none focus:border-[#526330] w-full sm:w-60"
                />
              </div>

              {/* Filtro por estado */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "attending" | "pending" | "declined")
                }
                className="px-3 py-2 text-sm rounded-lg border border-[#526330]/25 bg-white focus:outline-none focus:border-[#526330]"
              >
                <option value="all">Todos los estados</option>
                <option value="attending">Confirmados</option>
                <option value="pending">Pendientes</option>
                <option value="declined">No asisten</option>
              </select>

              <button
                onClick={() => handleOpenModal("add")}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#526330] text-white rounded-lg hover:bg-[#3B4920] transition-colors shadow-xs font-medium text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nuevo Invitado
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm min-w-205">
              <thead className="bg-white border-b border-[#526330]/10 text-[#2C3325]/60 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Invitado / Familia</th>
                  <th className="px-6 py-4 font-medium">Teléfono(s)</th>
                  <th className="px-6 py-4 font-medium">Estado / Cupos</th>
                  <th className="px-6 py-4 font-medium">Detalle / Mensaje</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#526330]/10">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-[#2C3325]/50">
                      No se encontraron invitados con ese criterio.
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-[#526330]/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#2C3325]">{guest.name}</td>
                      <td className="px-6 py-4 text-[#2C3325]/70 text-xs font-mono">
                        {guest.phone || (
                          <span className="text-amber-700/70 italic">Sin teléfono</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(guest)}</td>
                      <td
                        className="px-6 py-4 text-[#2C3325]/75 max-w-xs truncate"
                        title={guest.observation || ""}
                      >
                        {guest.observation || "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/invitacion/${guest.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 bg-[#526330]/10 hover:bg-[#526330]/20 text-[#526330] rounded-lg transition-colors"
                            title="Ver tarjeta de invitación"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleCopyLink(guest)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-[#526330]/10 hover:bg-[#526330]/20 text-[#526330] rounded-lg transition-colors cursor-pointer"
                            title="Copiar enlace de invitación"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSendWhatsApp(guest)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors cursor-pointer"
                            title="Enviar invitación por WhatsApp"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenModal("edit", guest)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors cursor-pointer"
                            title="Editar invitado"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteGuest(guest.id, guest.name)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar invitado"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para elegir a cuál teléfono enviar WhatsApp cuando tiene 2 números */}
      {phoneChoiceGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <h3 className="font-serif text-xl text-[#2C3325] font-semibold">
              Enviar invitación a {phoneChoiceGuest.guest.name}
            </h3>
            <p className="text-sm text-[#2C3325]/70">
              Este invitado tiene 2 números registrados. ¿A cuál deseas enviar el WhatsApp?
            </p>
            <div className="space-y-2.5">
              {phoneChoiceGuest.phones.map((ph, idx) => (
                <button
                  key={idx}
                  onClick={() => openWhatsAppWithPhone(phoneChoiceGuest.guest, ph)}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Enviar al número {idx + 1}</span>
                  <span className="font-mono text-xs bg-black/15 px-2.5 py-1 rounded-md">
                    {ph}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setPhoneChoiceGuest(null)}
              className="w-full py-2 text-sm text-[#2C3325]/60 hover:text-[#2C3325] cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-[#526330]/15 flex justify-between items-center bg-[#526330]/5">
              <h3 className="font-serif text-xl text-[#2C3325] font-semibold">
                {modalMode === "add" ? "Nuevo Invitado" : "Editar Invitado"}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-[#2C3325]/50 hover:text-[#2C3325] cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveGuest} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-[#2C3325]/80 mb-1">
                  Nombre Completo / Familia
                </label>
                <input
                  type="text"
                  required
                  value={currentGuest.name || ""}
                  onChange={(e) => setCurrentGuest({ ...currentGuest, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#526330]/25 focus:outline-none focus:ring-2 focus:ring-[#526330]/40 font-sans"
                  placeholder="Ej: Familia Castellanos Gonzalez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3325]/80 mb-1">
                  Teléfono (WhatsApp)
                </label>
                <input
                  type="text"
                  value={currentGuest.phone || ""}
                  onChange={(e) => setCurrentGuest({ ...currentGuest, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#526330]/25 focus:outline-none focus:ring-2 focus:ring-[#526330]/40 font-sans"
                  placeholder="Ej: 573006494725 o 573006494725 - 573142810209"
                />
                <p className="text-xs text-[#2C3325]/55 mt-1 font-sans">
                  Puedes poner 1 o 2 números separados por guion (-).
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3325]/80 mb-1">
                  Observación / Cupos
                </label>
                <input
                  type="text"
                  value={currentGuest.observation || ""}
                  onChange={(e) =>
                    setCurrentGuest({ ...currentGuest, observation: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-[#526330]/25 focus:outline-none focus:ring-2 focus:ring-[#526330]/40 font-sans"
                  placeholder="Ej: Cupos: 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3325]/80 mb-1">Estado</label>
                <select
                  value={currentGuest.status || "pending"}
                  onChange={(e) =>
                    setCurrentGuest({
                      ...currentGuest,
                      status: e.target.value as Guest["status"],
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-[#526330]/25 focus:outline-none focus:ring-2 focus:ring-[#526330]/40 bg-white font-sans"
                >
                  <option value="pending">Pendiente</option>
                  <option value="attending">Confirmado</option>
                  <option value="declined">No Asiste</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-[#2C3325]/60 hover:text-[#2C3325] font-sans font-medium transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#526330] text-white rounded-lg hover:bg-[#3B4920] transition-colors shadow-xs font-sans font-medium disabled:opacity-50 flex items-center justify-center min-w-25 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Guardar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
