"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero({ guestName }: { guestName?: string }) {
  return (
    <section className="relative h-screen min-h-150 max-h-230 w-full overflow-hidden flex flex-col justify-between items-center text-center select-none">
      {/* Full-bleed Background Image */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/FOTOS/DSC04810.jpg.jpeg"
          alt="David & Thalia"
          className="w-full h-full object-cover object-top"
        />
        {/* Soft editorial top & bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(35,43,22,0.52) 0%, rgba(35,43,22,0.18) 38%, rgba(35,43,22,0.15) 70%, rgba(35,43,22,0.65) 100%)",
          }}
        />
      </motion.div>

      {/* Top Editorial Header ("Nuestra boda / DAVID & THALIA") */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-10 pt-16 sm:pt-20 px-4 flex flex-col items-center"
      >
        <span className="font-script text-4xl sm:text-5xl text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          Nuestra boda
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] text-white font-normal mt-1 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
          DAVID & THALIA
        </h1>
      </motion.div>

      {/* Bottom Guest Welcome & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-10 pb-10 px-6 flex flex-col items-center gap-3"
      >
        {guestName && (
          <div className="px-5 py-1.5 rounded-full bg-black/25 backdrop-blur-sm border border-white/25">
            <p className="font-serif italic text-white/95 text-sm sm:text-base tracking-wide">
              Especialmente para {guestName}
            </p>
          </div>
        )}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/80 flex flex-col items-center gap-1 mt-1"
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">Desliza</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
