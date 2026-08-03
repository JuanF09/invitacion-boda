"use client";

import { motion } from "framer-motion";

export default function Gallery() {
  const photos = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", // pareja
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800", // anillos
    "https://images.unsplash.com/photo-1583939000240-692742468798?auto=format&fit=crop&q=80&w=800", // decoracion
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800", // manos
  ];

  return (
    <section className="py-24 bg-background px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-olive mb-4">Nuestros Momentos</h2>
          <div className="h-px w-20 mx-auto bg-gold" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {photos.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className={`relative rounded-2xl overflow-hidden shadow-md cursor-pointer ${
                idx === 0 || idx === 3 ? "col-span-2 md:col-span-2 aspect-4/3" : "col-span-1 aspect-3/4"
              } ${idx === 0 ? "md:aspect-video" : ""}`}
            >
              {/* Usamos img estándar para evitar problemas de configuración de dominios en Next.js por ahora */}
              <img 
                src={src}
                alt={`Nuestra foto ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
