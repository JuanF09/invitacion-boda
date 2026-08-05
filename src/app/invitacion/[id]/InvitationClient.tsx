"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CalendarHeart, Camera, CheckCircle } from "lucide-react";

import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Message from "@/components/Message";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import Details from "@/components/Details";
import RSVPForm from "@/components/RSVPForm";
import AudioPlayer from "@/components/AudioPlayer";
import GoldParticles from "@/components/GoldParticles";

type Tab = "inicio" | "detalles" | "galeria" | "asistencia";

export default function InvitationClient({ guest }: { guest: any }) {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("inicio");

  // Efecto para hacer scroll hacia arriba cada vez que se cambia de pestaña
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const tabs = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "detalles", label: "Detalles", icon: CalendarHeart },
    { id: "galeria", label: "Galería", icon: Camera },
    { id: "asistencia", label: "Confirmar", icon: CheckCircle },
  ] as const;

  return (
    <main className="flex flex-col min-h-screen bg-background relative">
      <GoldParticles />
      <AudioPlayer autoPlayTrigger={isEnvelopeOpened} />

      {!isEnvelopeOpened && (
        <Envelope guestName={guest.name} onOpen={() => setIsEnvelopeOpened(true)} />
      )}

      {/* Solo renderizamos el contenido si el sobre se ha abierto */}
      {isEnvelopeOpened && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 pb-24" // pb-24 para dejar espacio a la barra de navegación
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "inicio" && (
                <div className="flex flex-col pb-8">
                  <Hero guestName={guest.name} />
                  <Message />
                  <div className="text-center mt-8">
                    <button 
                      onClick={() => setActiveTab("detalles")}
                      className="px-8 py-4 bg-wine text-white rounded-full inline-flex items-center gap-2 hover:bg-wine/90 transition-colors shadow-lg font-serif text-lg"
                    >
                      Ver Detalles del Evento
                      <CalendarHeart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "detalles" && (
                <div className="flex flex-col pb-8">
                  <Countdown />
                  <Details />
                  <div className="text-center mt-8">
                    <button 
                      onClick={() => setActiveTab("galeria")}
                      className="px-8 py-4 bg-wine text-white rounded-full inline-flex items-center gap-2 hover:bg-wine/90 transition-colors shadow-lg font-serif text-lg"
                    >
                      Ver Nuestra Galería
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "galeria" && (
                <div className="flex flex-col pb-8">
                  <Gallery />
                  <div className="text-center mt-8">
                    <button 
                      onClick={() => setActiveTab("asistencia")}
                      className="px-8 py-4 bg-wine text-white rounded-full inline-flex items-center gap-2 hover:bg-wine/90 transition-colors shadow-lg font-serif text-lg"
                    >
                      Confirmar Asistencia
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "asistencia" && (
                <div className="flex flex-col pb-8">
                  <RSVPForm guest={guest} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Footer Minimalista al final de cualquier tab */}
          <footer className="bg-background py-10 mt-12 text-center border-t border-wine/10">
            <p className="font-serif italic text-lg text-wine">
              Ricardo & Natalia
            </p>
            <p className="font-sans text-xs tracking-[0.2em] uppercase mt-2 text-foreground/50">
              Septiembre 06, 2026
            </p>
          </footer>
        </motion.div>
      )}

      {/* Bottom Navigation Bar */}
      {isEnvelopeOpened && (
        <motion.nav 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-wine/10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-40 px-6 pt-3 pb-6 md:pb-3"
        >
          <div className="max-w-md mx-auto flex justify-between items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                    isActive ? "text-wine scale-110" : "text-foreground/40 hover:text-wine/70"
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full"
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-sans font-medium mt-1 ${isActive ? "text-wine" : ""}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </main>
  );
}
