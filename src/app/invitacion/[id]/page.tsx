import { supabase } from "@/lib/supabase";
import { FALLBACK_GUESTS_WITH_IDS } from "@/lib/defaultGuests";
import InvitationClient from "./InvitationClient";
import { notFound } from "next/navigation";

export default async function InvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  if (!resolvedParams.id) {
    notFound();
  }

  // Soporte para IDs locales de vista previa (inv-1 .. inv-75 o demo)
  const localGuest =
    resolvedParams.id === "demo"
      ? FALLBACK_GUESTS_WITH_IDS[0]
      : FALLBACK_GUESTS_WITH_IDS.find((g) => g.id === resolvedParams.id);

  let guest = null;

  try {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("id", resolvedParams.id)
      .single();

    if (!error && data) {
      guest = data;
    }
  } catch {
    // Si Supabase está pausado o sin conexión, usamos el respaldo local si coincide
  }

  if (!guest && localGuest) {
    guest = localGuest;
  }

  if (!guest) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0] p-4 text-center">
        <div className="bg-white p-8 border border-[#3B4920]/30 shadow-sm max-w-md">
          <h1 className="text-3xl font-serif text-[#526330] mb-3 uppercase tracking-wider">
            Invitación no encontrada
          </h1>
          <p className="font-serif text-[#2C3325]/80">
            Lo sentimos, no pudimos encontrar tu invitación. Por favor revisa el enlace
            proporcionado por David & Thalia.
          </p>
        </div>
      </div>
    );
  }

  return <InvitationClient guest={guest} />;
}
