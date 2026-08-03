"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Message() {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <Heart className="w-12 h-12 text-gold fill-gold/20" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif text-olive mb-8 leading-relaxed"
        >
          "Hay momentos en la vida que son especiales por sí solos, pero compartirlos con las personas que más quieres los hace inolvidables."
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl font-sans text-foreground/70 leading-relaxed"
        >
          Queremos que seas parte de este nuevo capítulo en nuestra historia. 
          Tu presencia es el mejor regalo para celebrar nuestro amor y el inicio de nuestra familia.
        </motion.p>
      </div>
    </section>
  );
}
