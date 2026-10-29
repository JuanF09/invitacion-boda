"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Message from "@/components/Message";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import Details from "@/components/Details";
import RSVPForm, { parseGuestObservation } from "@/components/RSVPForm";
import type { GuestRecord } from "@/lib/defaultGuests";
import AudioPlayer from "@/components/AudioPlayer";
import GoldParticles from "@/components/GoldParticles";

export default function InvitationClient({ guest }: { guest: GuestRecord }) {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const { maxPasses } = parseGuestObservation(guest?.observation);

  return (
    <main className="flex flex-col min-h-screen bg-[#F7F5F0] relative">
      <GoldParticles />
      <AudioPlayer autoPlayTrigger={isEnvelopeOpened} />

      {!isEnvelopeOpened && (
        <Envelope
          guestName={guest?.name}
          guestPasses={maxPasses}
          onOpen={() => {
            setIsEnvelopeOpened(true);
            window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          }}
        />
      )}

      {isEnvelopeOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="flex-1 flex flex-col"
        >
          {/* 1. Portada a pantalla completa */}
          <Hero guestName={guest?.name} />

          {/* 2. Tarjeta principal con bloque verde olivo, polaroids inclinadas y versículo */}
          <Message />

          {/* 3. Cuenta regresiva limpia estilo editorial */}
          <Countdown />

          {/* 4. Ceremonia y Recepción, Código de Vestimenta, Foto intermedia, Lluvia de sobres y No niños */}
          <Details />

          {/* 5. Galería con marco tipo encaje sobre fondo verde olivo + foto "donde estás tú, está mi hogar" */}
          <Gallery />

          {/* 6. Confirmación de asistencia con modal limitado por cupos + medallón D & T */}
          <RSVPForm guest={guest} />

          {/* 7. Barra final Verde Olivo idéntica al cierre del video */}
          <footer className="bg-[#526330] text-white py-5 px-4 text-center border-t border-[#3B4920]">
            <p className="font-serif tracking-[0.22em] text-sm sm:text-base uppercase">
              David & Thalia
            </p>
            <p className="font-serif text-[11px] tracking-[0.18em] text-white/75 uppercase mt-1">
              15 · Noviembre · 2026
            </p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
