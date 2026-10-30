import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { FALLBACK_GUESTS_WITH_IDS } from "@/lib/defaultGuests";
import InvitationClient from "./InvitationClient";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const localGuest =
    resolvedParams.id === "demo"
      ? FALLBACK_GUESTS_WITH_IDS[0]
      : FALLBACK_GUESTS_WITH_IDS.find((g) => g.id === resolvedParams.id);

  let guestName = localGuest?.name || "Invitado Especial";

  try {
    const { data } = await supabase
      .from("guests")
      .select("name")
      .eq("id", resolvedParams.id)
      .single();
    if (data?.name) guestName = data.name;
  } catch {
    // fallback
  }

  const siteUrl = "https://invitacion-boda-mauve.vercel.app";
  const photoUrl = `${siteUrl}/portada.jpg?v=2`;

  return {
    metadataBase: new URL(siteUrl),
    title: `✦ Invitación para ${guestName} | Boda David & Thalia`,
    description: `Acompáñanos a celebrar nuestra boda este Domingo 15 de Noviembre de 2026 a las 4:00 PM en el Club del Comercio (Salón Patio de los Cujíes).`,
    openGraph: {
      title: `✦ ${guestName}, tienes una invitación de boda`,
      description: `“No fue casualidad, fue el propósito de Dios encontrando su tiempo en nuestras vidas.” David & Thalia · 15 · Noviembre · 2026`,
      siteName: "Boda David & Thalia",
      images: [
        {
          url: photoUrl,
          secureUrl: photoUrl,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: "David & Thalia frente a la capilla colonial",
        },
      ],
      locale: "es_CO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `✦ Invitación de Boda para ${guestName}`,
      description: "David & Thalia — 15 de Noviembre de 2026 · Club del Comercio.",
      images: [photoUrl],
    },
  };
}

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
