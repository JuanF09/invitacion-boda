"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Esperar a que la animación termine antes de cambiar de pantalla
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-olive/5 overflow-hidden">
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            key="closed-envelope"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[90vw] max-w-md aspect-4/3 bg-[#F9F7F1] shadow-2xl rounded-xl border border-olive/10 flex items-center justify-center"
          >
            {/* Solapa del sobre (Triángulo) */}
            <div 
              className="absolute top-0 left-0 w-full h-[60%] bg-[#F4F1E8] shadow-sm origin-top rounded-t-xl z-20" 
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} 
            />
            
            {/* Solapas laterales y base */}
            <div className="absolute inset-0 z-10 bg-[#FAF8F3]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 60%, 0 0)' }} />

            {/* Sello */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpen}
              className="z-30 absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-[20%] w-20 h-20 bg-gold rounded-full flex flex-col items-center justify-center text-white shadow-xl border-2 border-gold/50 cursor-pointer"
            >
              <span className="font-serif text-3xl italic leading-none">R&N</span>
            </motion.button>

            {/* Texto decorativo */}
            <motion.div 
              animate={{ y: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-6 left-0 w-full text-center z-30 pointer-events-none"
            >
              <span className="font-sans text-xs tracking-[0.2em] text-olive uppercase font-semibold bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm">
                Toca el sello para abrir
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Estado Animado (Abriendo) */}
      {isOpening && (
        <motion.div
          key="opening-envelope"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="relative w-[90vw] max-w-md aspect-4/3 bg-[#FAF8F3] shadow-2xl rounded-xl border border-olive/10 flex items-center justify-center"
        >
          {/* Solapa del sobre abriéndose (Triángulo) */}
          <motion.div 
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 180 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-[60%] bg-[#F4F1E8] origin-top rounded-t-xl z-20 shadow-lg" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }} 
          />
          
          {/* Solapas laterales y base */}
          <div className="absolute inset-0 z-30 bg-[#FAF8F3] shadow-[inset_0_10px_20px_rgba(0,0,0,0.05)] rounded-xl" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 60%, 0 0)' }} />
          
          {/* Tarjeta saliendo */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: -120 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="absolute top-4 left-4 right-4 bottom-4 bg-white shadow-xl border border-olive/10 z-10 flex flex-col items-center justify-center rounded-lg"
          >
             <span className="font-serif text-3xl text-olive">Ricardo & Natalia</span>
             <span className="font-serif text-gold italic mt-2">¡Nos Casamos!</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
