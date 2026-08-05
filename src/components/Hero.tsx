"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { useRef } from "react";

export default function Hero({ guestName }: { guestName?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  // Parallax: se mueve la mitad de lo que se scrollea hacia abajo
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 py-20 text-center">
      {/* Elegant minimalist background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-150 max-h-150 rounded-full bg-[radial-gradient(circle_at_center,var(--color-wine)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center bg-white/40 p-8 md:p-16 rounded-3xl backdrop-blur-md border border-white/50 shadow-xl"
      >
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="uppercase tracking-[0.3em] text-xs md:text-sm font-sans text-gold mb-2 font-semibold"
        >
          ¡Nos Casamos!
        </motion.span>
        {guestName && (
           <motion.p 
             initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}
             className="font-serif italic text-wine/80 text-lg md:text-xl mb-6"
           >
             Queremos que estés allí, {guestName}
           </motion.p>
        )}

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-serif text-wine leading-none mb-2">
          Ricardo
        </h1>
        <span className="font-serif text-3xl md:text-6xl text-gold my-2 italic">&</span>
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-serif text-wine leading-none mt-2">
          Natalia
        </h1>

        <motion.div 
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 mb-6 h-px w-32 bg-gold origin-center" 
        />

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-3 text-lg md:text-2xl font-sans mt-2 text-foreground/80 font-light"
        >
          <div className="flex items-center gap-2">
            <CalendarHeart className="w-5 h-5 md:w-6 md:h-6 text-wine" />
            <span>Domingo, 06 de Septiembre 2026</span>
          </div>
          <span className="text-sm md:text-base tracking-widest uppercase mt-2">Raíces Villa Rosario</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
