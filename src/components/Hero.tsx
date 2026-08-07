"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { useRef } from "react";

const CornerBorder = ({ className }: { className?: string }) => (
  <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute text-gold opacity-80 ${className}`}>
    <path d="M0 0 L 45 0 L 45 2 L 2 2 L 2 45 L 0 45 Z" fill="currentColor"/>
    <path d="M8 8 L 28 8 L 28 9 L 9 9 L 9 28 L 8 28 Z" fill="currentColor"/>
    <path d="M15 15 L 20 15 L 20 16 L 16 16 L 16 20 L 15 20 Z" fill="currentColor"/>
    <circle cx="4" cy="4" r="2" fill="currentColor"/>
  </svg>
);

export default function Hero({ guestName }: { guestName?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 py-20 text-center bg-background/50">
      {/* Texture background overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center mix-blend-multiply">
        <div className="w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,var(--color-gold)_0%,transparent_60%)] opacity-20 blur-[80px]" />
        <div className="absolute w-[80vw] h-[80vw] max-w-150 max-h-150 rounded-full bg-[radial-gradient(circle_at_center,var(--color-wine)_0%,transparent_70%)] blur-[100px] opacity-40" />
      </div>

      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 relative flex flex-col items-center bg-[#FDFBF7]/90 p-10 md:p-20 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-2xl min-w-[320px] max-w-4xl"
      >
        {/* Decoraciones en las esquinas */}
        <CornerBorder className="top-6 left-6" />
        <CornerBorder className="top-6 right-6 rotate-90" />
        <CornerBorder className="bottom-6 right-6 rotate-180" />
        <CornerBorder className="bottom-6 left-6 -rotate-90" />

        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="font-script text-4xl md:text-5xl text-gold mb-2 font-medium"
        >
          ¡Nos Casamos!
        </motion.span>
        {guestName && (
           <motion.p 
             initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}
             className="font-serif italic text-wine/70 text-lg md:text-xl mb-6 tracking-wide"
           >
             Queremos que estés allí, {guestName}
           </motion.p>
        )}

        <div className="my-4 flex flex-col items-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif text-wine leading-none drop-shadow-sm">
            Ricardo
          </h1>
          <span className="font-script text-6xl md:text-8xl text-gold my-2 drop-shadow-sm">&</span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif text-wine leading-none drop-shadow-sm">
            Natalia
          </h1>
        </div>

        <motion.div 
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 mb-8 flex justify-center items-center text-gold opacity-80"
        >
          <svg width="220" height="24" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12 L80 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M140 12 L210 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M110 0 C 120 12, 120 12, 110 24 C 100 12, 100 12, 110 0 Z" fill="currentColor"/>
            <circle cx="110" cy="12" r="3" fill="#FDFBF7"/>
            <circle cx="215" cy="12" r="2" fill="currentColor"/>
            <circle cx="5" cy="12" r="2" fill="currentColor"/>
          </svg>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-3 text-lg md:text-2xl font-sans mt-2 text-foreground/80 font-light"
        >
          <div className="flex items-center gap-2">
            <CalendarHeart className="w-5 h-5 md:w-6 md:h-6 text-wine" />
            <span className="tracking-wide">Domingo, 06 de Septiembre 2026</span>
          </div>
          <span className="text-sm md:text-base tracking-[0.2em] uppercase mt-3 font-medium text-wine/80">Raíces Villa Rosario</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
