"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Clock, XCircle, Send, Copy } from "lucide-react";

type Guest = {
  id: string;
  name: string;
  phone: string | null;
  status: "pending" | "attending" | "declined";
  observation: string | null;
};

export default function DashboardPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuests = async () => {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: true });
      
    if (error) {
      console.error("Error fetching guests:", error);
    } else {
      setGuests(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuests();
    
    // Configurar suscripción en tiempo real
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
          console.log('Cambio detectado:', payload);
          fetchGuests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

    // Limpiar el teléfono de espacios o caracteres especiales
    const phone = guest.phone.replace(/\D/g, '');
    
    // Obtener la URL base dinámicamente
    const baseUrl = window.location.origin;
    const invitationUrl = `${baseUrl}/invitacion/${guest.id}`;
    
    const message = `¡Hola ${guest.name}! Nos casamos y queremos que estés con nosotros. Mira tu invitación y confirma tu asistencia aquí: ${invitationUrl}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  const handleCopyLink = (guest: Guest) => {
    const baseUrl = window.location.origin;
    const invitationUrl = `${baseUrl}/invitacion/${guest.id}`;
    navigator.clipboard.writeText(invitationUrl);
    alert("¡Enlace copiado al portapapeles!");
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-olive border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-olive/10 text-center">
          <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Total</p>
          <p className="text-4xl font-serif text-olive">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-olive/10 text-center">
          <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Confirman</p>
          <p className="text-4xl font-serif text-green-700">{stats.attending}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-olive/10 text-center">
          <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Rechazan</p>
          <p className="text-4xl font-serif text-red-700">{stats.declined}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-olive/10 text-center">
          <p className="text-sm text-foreground/60 font-sans uppercase tracking-wider mb-1">Pendientes</p>
          <p className="text-4xl font-serif text-yellow-700">{stats.pending}</p>
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-2xl shadow-sm border border-olive/10 overflow-hidden">
        <div className="px-6 py-5 border-b border-olive/10 bg-olive/5">
          <h3 className="font-serif text-xl text-olive">Lista de Invitados</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-white border-b border-olive/5 text-foreground/60 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Observación</th>
                <th className="px-6 py-4 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive/5">
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-foreground/50">
                    No hay invitados registrados todavía.
                  </td>
                </tr>
              ) : (
                guests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-olive/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{guest.name}</td>
                    <td className="px-6 py-4">{getStatusBadge(guest.status)}</td>
                    <td className="px-6 py-4 text-foreground/70 max-w-xs truncate" title={guest.observation || ""}>
                      {guest.observation || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleCopyLink(guest)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-olive/10 hover:bg-olive/20 text-olive rounded-lg transition-colors shadow-sm"
                          title="Copiar enlace"
                        >
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copiar Link</span>
                        </button>
                        <button 
                          onClick={() => handleSendWhatsApp(guest)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                          <span className="hidden sm:inline">Enviar invitación</span>
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
  );
}
