"use client";

import { motion } from "framer-motion";
import { Camera, Hash, ImagePlus, Image as ImageIcon } from "lucide-react";

export default function Gallery() {
  return (
    <section className="py-24 bg-background px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Encabezado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-wine mb-4">Nuestros Momentos</h2>
          <div className="h-px w-20 mx-auto bg-gold" />
        </motion.div>

        {/* Sección del Hashtag */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-wine/10 text-center max-w-2xl mx-auto flex flex-col items-center"
        >
          <div className="flex justify-center gap-4 mb-4 text-gold">
            <Camera className="w-8 h-8" />
            <Hash className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif text-wine mb-2">Captura y Comparte</h3>
          <p className="text-foreground/70 font-sans mb-6">
            Ayúdanos a guardar cada momento especial. Sube tus fotos y videos a Instagram o Facebook usando nuestro hashtag oficial:
          </p>
          <div className="px-6 py-3 bg-wine/5 rounded-full border border-wine/20">
            <span className="font-sans font-bold text-wine tracking-widest text-lg">#BodaRicardoYNatalia</span>
          </div>
        </motion.div>

        {/* Galería de Fotos (Placeholders) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden shadow-sm border-2 border-dashed border-wine/20 bg-wine/5 flex flex-col items-center justify-center p-6 text-center ${
                idx === 0 || idx === 3 ? "col-span-2 md:col-span-2 aspect-4/3" : "col-span-1 aspect-3/4"
              } ${idx === 0 ? "md:aspect-video" : ""}`}
            >
              <ImageIcon className="w-10 h-10 text-wine/40 mb-3" />
              <p className="font-serif text-wine/60 text-sm md:text-base">
                Espacio reservado<br />para nuestras fotos
              </p>
            </motion.div>
          ))}
        </div>

        {/* Álbum Compartido CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-wine/5 p-8 md:p-12 rounded-3xl shadow-sm border border-wine/10 text-center max-w-2xl mx-auto flex flex-col items-center"
        >
          <ImagePlus className="w-12 h-12 text-wine mb-4" />
          <h3 className="text-3xl font-serif text-wine mb-4">Álbum Compartido</h3>
          <p className="text-foreground/80 font-sans mb-8 text-lg">
            Hemos creado un álbum digital para que todos nuestros invitados puedan subir las fotos y videos que tomen durante la boda. ¡Queremos ver la fiesta desde su perspectiva!
          </p>
          <a href="#" className="px-8 py-4 bg-wine text-white rounded-full flex items-center justify-center gap-2 hover:bg-wine/90 transition-colors shadow-md font-semibold text-sm tracking-wider uppercase w-full md:w-auto">
            <Camera className="w-5 h-5" />
            <span>Subir mis fotos</span>
          </a>
          <p className="text-xs text-foreground/50 mt-4">* El enlace al álbum estará disponible muy pronto</p>
        </motion.div>
        
      </div>
    </section>
  );
}
