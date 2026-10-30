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
          <footer className="bg-[#3A491E] text-white py-8 px-4 text-center border-t-2 border-[#C59B47] shadow-inner">
            <p className="font-serif tracking-[0.28em] text-base sm:text-lg uppercase font-bold text-[#FAF8F5]">
              David & Thalia
            </p>
            <p className="font-serif italic text-xs sm:text-sm tracking-[0.22em] text-[#E7C97B] mt-1.5 font-semibold">
              15 · Noviembre · 2026 · Salón Patio de los Cujíes
            </p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
