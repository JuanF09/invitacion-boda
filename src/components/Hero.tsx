"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero({ guestName }: { guestName?: string }) {
  return (
    <section className="relative h-screen min-h-155 max-h-240 w-full overflow-hidden flex flex-col justify-between items-center text-center select-none">
      {/* Full-bleed Background Image with Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/FOTOS/DSC02860.JPG.jpeg"
          alt="David & Thalia frente a la capilla"
          className="w-full h-full object-cover object-[center_35%]"
        />
        {/* Soft editorial top & bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(25,33,14,0.68) 0%, rgba(25,33,14,0.2) 36%, rgba(25,33,14,0.2) 68%, rgba(25,33,14,0.75) 100%)",
          }}
        />
      </motion.div>

      {/* Top Editorial Header ("Nuestra boda / DAVID & THALIA") */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1.1 }}
        className="relative z-10 pt-16 sm:pt-24 px-4 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 text-[#E7C97B] mb-1">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="font-serif text-xs sm:text-sm tracking-[0.3em] uppercase text-white/90">
            Nuestra Unión
          </span>
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>

        <span className="font-script text-5xl sm:text-7xl text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
          Nuestra boda
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.26em] text-white font-bold mt-2 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          DAVID & THALIA
        </h1>

        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="w-12 sm:w-20 h-px bg-[#E7C97B]/70" />
          <span className="font-serif italic text-sm sm:text-base text-[#FAF8F5] tracking-[0.2em]">
            15 · Noviembre · 2026
          </span>
          <span className="w-12 sm:w-20 h-px bg-[#E7C97B]/70" />
        </div>
      </motion.div>

      {/* Bottom Guest Welcome & Intuitive Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="relative z-10 pb-12 px-6 flex flex-col items-center gap-4"
      >
        {guestName && (
          <div className="px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/30 shadow-lg">
            <p className="font-serif italic text-white text-base sm:text-lg tracking-wide">
              Especialmente para <span className="font-bold text-[#E7C97B]">{guestName}</span>
            </p>
          </div>
        )}

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="text-white/90 flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
          }}
        >
          <span className="font-serif text-xs tracking-[0.28em] uppercase text-white/90 font-medium">
            Desliza para continuar
          </span>
          <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/25">
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
