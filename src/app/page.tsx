"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Clock, XCircle, Send, Copy, Pencil, Trash2, Plus } from "lucide-react";

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

  // Estados para el Modal CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentGuest, setCurrentGuest] = useState<Partial<Guest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchGuests = async () => {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("name", { ascending: true });
      
    if (error) {
      console.error("Error fetching guests:", error);
    } else {
      setGuests(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchGuests();
    
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'guests',
        },
        (payload) => {
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
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F9F7F1]">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-wine/10 max-w-sm w-full text-center">
          <h1 className="text-3xl font-serif text-wine mb-2">Panel de Control</h1>
          <p className="text-foreground/70 mb-6 text-sm font-sans">Ingresa el PIN de acceso para ver la lista de invitados.</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (pin === "2026") setIsAuthenticated(true);
                else alert("PIN incorrecto");
              }
            }}
            className="w-full p-4 rounded-xl border border-wine/20 text-center text-2xl tracking-[0.5em] mb-6 focus:outline-none focus:border-gold transition-colors font-mono"
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
            className="w-full bg-wine text-white p-4 rounded-xl font-sans font-semibold tracking-widest hover:bg-wine/90 transition-colors"
          >
            ENTRAR
          </button>
          <p className="mt-4 text-xs text-foreground/40 font-sans">Pista: Año de la boda (2026)</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: guests.length,
    attending: guests.filter(g => g.status === "attending").length,
    declined: guests.filter(g => g.status === "declined").length,
    pending: guests.filter(g => g.status === "pending").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "attending":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" /> Confirmado</span>;
      case "declined":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3" /> No asiste</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3" /> Pendiente</span>;
    }
  };

  const handleSendWhatsApp = (guest: Guest) => {
    if (!guest.phone) {
      alert("Este invitado no tiene número de teléfono registrado.");
      return;
    }

    const phone = guest.phone.replace(/\D/g, '');
    const baseUrl = window.location.origin;
    const invitationUrl = `${baseUrl}/invitacion/${guest.id}`;
    const message = `¡Hola ${guest.name}! ❤️\n\nEstamos muy felices de dar un gran paso en nuestras vidas y nos encantaría compartir este momento tan especial contigo.\n\nHemos preparado todos los detalles de nuestra boda con mucho cariño. Descubre tu invitación, acompáñanos en este sueño y confirma tu asistencia en el siguiente enlace:\n\n✨ ${invitationUrl}`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  const handleCopyLink = (guest: Guest) => {
    const baseUrl = window.location.origin;
    const invitationUrl = `${baseUrl}/invitacion/${guest.id}`;
    navigator.clipboard.writeText(invitationUrl);
    alert("¡Enlace copiado al portapapeles!");
  };

  // --- Lógica del CRUD ---

  const handleOpenModal = (mode: "add" | "edit", guest?: Guest) => {
    setModalMode(mode);
    setCurrentGuest(guest || { name: "", phone: "", observation: "Cupos: 1", status: "pending" });
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
      if (modalMode === "add") {
        const { error } = await supabase.from("guests").insert([
          {
            name: currentGuest.name,
            phone: currentGuest.phone || null,
            observation: currentGuest.observation || null,
            status: currentGuest.status || "pending",
          }
        ]);
        if (error) throw error;
      } else if (modalMode === "edit" && currentGuest.id) {
        const { error } = await supabase
          .from("guests")
          .update({
            name: currentGuest.name,
            phone: currentGuest.phone || null,
            observation: currentGuest.observation || null,
            status: currentGuest.status,
          })
          .eq("id", currentGuest.id);
        if (error) throw error;
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Error saving guest:", error);
      alert("Hubo un error al guardar el invitado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGuest = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${name}? Esta acción no se puede deshacer y su link de invitación dejará de funcionar.`)) {
      try {
        const { error } = await supabase.from("guests").delete().eq("id", id);
        if (error) throw error;
      } catch (error) {
        console.error("Error deleting guest:", error);
        alert("Hubo un error al eliminar el invitado.");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center min-h-screen items-center"><div className="animate-spin w-8 h-8 border-4 border-wine border-t-transparent rounded-full" /></div>;
  }

  return (
    <main className="min-h-screen bg-[#F9F7F1] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-wine">Panel de Control</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm font-sans text-foreground/60 hover:text-wine underline underline-offset-4 transition-colors"
          >
            Salir
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-wine/10 text-center">
            <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Total</p>
            <p className="text-4xl font-serif text-wine">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-wine/10 text-center">
            <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Confirman</p>
            <p className="text-4xl font-serif text-green-700">{stats.attending}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-wine/10 text-center">
            <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Rechazan</p>
            <p className="text-4xl font-serif text-red-700">{stats.declined}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-wine/10 text-center">
            <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Pendientes</p>
            <p className="text-4xl font-serif text-yellow-700">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-wine/10 overflow-hidden relative">
          <div className="px-6 py-5 border-b border-wine/10 bg-wine/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-serif text-xl text-wine">Lista de Invitados</h3>
            <button 
              onClick={() => handleOpenModal("add")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-wine text-white rounded-lg hover:bg-wine/90 transition-colors shadow-sm font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Nuevo Invitado
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm min-w-[800px]">
              <thead className="bg-white border-b border-wine/5 text-foreground/60 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Nombre</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium">Observación</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine/5">
                {guests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-foreground/50">
                      No hay invitados registrados todavía.
                    </td>
                  </tr>
                ) : (
                  guests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-wine/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{guest.name}</td>
                      <td className="px-6 py-4">{getStatusBadge(guest.status)}</td>
                      <td className="px-6 py-4 text-foreground/70 max-w-xs truncate" title={guest.observation || ""}>
                        {guest.observation || "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleCopyLink(guest)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-wine/10 hover:bg-wine/20 text-wine rounded-lg transition-colors shadow-sm"
                            title="Copiar enlace"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleSendWhatsApp(guest)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors shadow-sm"
                            title="Enviar invitación por WhatsApp"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleOpenModal("edit", guest)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors shadow-sm"
                            title="Editar invitado"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteGuest(guest.id, guest.name)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors shadow-sm"
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

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-wine/10 flex justify-between items-center bg-wine/5">
              <h3 className="font-serif text-xl text-wine">
                {modalMode === "add" ? "Nuevo Invitado" : "Editar Invitado"}
              </h3>
              <button type="button" onClick={handleCloseModal} className="text-foreground/50 hover:text-foreground">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveGuest} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  value={currentGuest.name || ""}
                  onChange={(e) => setCurrentGuest({...currentGuest, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-wine/20 focus:outline-none focus:ring-2 focus:ring-wine/50 font-sans"
                  placeholder="Ej: Familia Pérez"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Teléfono (WhatsApp)</label>
                <input 
                  type="text" 
                  value={currentGuest.phone || ""}
                  onChange={(e) => setCurrentGuest({...currentGuest, phone: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-wine/20 focus:outline-none focus:ring-2 focus:ring-wine/50 font-sans"
                  placeholder="Ej: 573001234567"
                />
                <p className="text-xs text-foreground/50 mt-1 font-sans">Incluye el código de país sin el + (ej. 57 para Colombia).</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Observación (Cupos)</label>
                <input 
                  type="text" 
                  value={currentGuest.observation || ""}
                  onChange={(e) => setCurrentGuest({...currentGuest, observation: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-wine/20 focus:outline-none focus:ring-2 focus:ring-wine/50 font-sans"
                  placeholder="Ej: Cupos: 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Estado</label>
                <select 
                  value={currentGuest.status || "pending"}
                  onChange={(e) => setCurrentGuest({...currentGuest, status: e.target.value as any})}
                  className="w-full px-4 py-2 rounded-lg border border-wine/20 focus:outline-none focus:ring-2 focus:ring-wine/50 bg-white font-sans"
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
                  className="px-4 py-2 text-foreground/60 hover:text-foreground font-sans font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-wine text-white rounded-lg hover:bg-wine/90 transition-colors shadow-sm font-sans font-medium disabled:opacity-50 flex items-center justify-center min-w-25"
                >
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
