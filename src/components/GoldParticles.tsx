"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GoldParticles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generar partículas aleatorias solo en el cliente para evitar hidratación diferente
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % horizontal
      y: Math.random() * 100, // % vertical
      size: Math.random() * 4 + 1, // Tamaño entre 1 y 5 px
      delay: Math.random() * 5, // Retraso de 0 a 5s
      duration: Math.random() * 10 + 10, // Duración de 10 a 20s
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y + 20}vh` }}
          animate={{ 
            opacity: [0, 0.6, 0], 
            y: `${p.y - 20}vh`,
            x: `${p.x + (Math.random() * 10 - 5)}vw` 
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bg-gold rounded-full"
          style={{
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            boxShadow: "0 0 4px rgba(212,175,55,0.8)"
          }}
        />
      ))}
    </div>
  );
}
