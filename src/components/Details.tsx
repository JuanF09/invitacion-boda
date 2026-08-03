"use client";

import { Church, GlassWater, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Details() {
  const events = [
    {
      title: "Ceremonia",
      icon: <Church className="w-10 h-10 text-gold mb-4" />,
      time: "4:00 PM",
      location: "Parroquia San Juan",
      address: "Calle Ficticia 123, Norte",
    },
    {
      title: "Recepción",
      icon: <GlassWater className="w-10 h-10 text-gold mb-4" />,
      time: "6:00 PM",
      location: "Hacienda El Bosque",
      address: "Km 5 Vía La Calera",
    }
  ];

  return (
    <section className="py-24 bg-background px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-olive mb-4">Detalles del Día</h2>
          <div className="h-px w-20 mx-auto bg-gold" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {events.map((evt, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-olive/10"
            >
              {evt.icon}
              <h3 className="text-2xl font-serif text-olive mb-2">{evt.title}</h3>
              <p className="text-xl font-sans text-foreground/80 mb-4">{evt.time}</p>
              <div className="flex flex-col items-center gap-1 text-foreground/70">
                <span className="font-semibold">{evt.location}</span>
                <span className="text-sm">{evt.address}</span>
              </div>
              <button className="mt-8 px-6 py-3 border border-olive text-olive rounded-full flex items-center gap-2 hover:bg-olive hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="text-sm tracking-wider uppercase">Ver Mapa</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
