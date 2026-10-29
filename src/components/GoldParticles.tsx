"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: (i * 17 + 7) % 100,
  y: (i * 29 + 13) % 100,
  driftX: ((i * 11) % 10) - 5,
  size: (i % 4) + 1.5,
  delay: (i % 5) * 0.9,
  duration: 12 + (i % 7) * 1.5,
}));

export default function GoldParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y + 20}vh` }}
          animate={{
            opacity: [0, 0.5, 0],
            y: `${p.y - 20}vh`,
            x: `${p.x + p.driftX}vw`,
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
            boxShadow: "0 0 4px rgba(197,155,71,0.7)",
          }}
        />
      ))}
    </div>
  );
}
