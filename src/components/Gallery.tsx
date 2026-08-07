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

        {/* Galería de Fotos (Collage) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { src: "/FOTOS/DSC04838.jpg.jpeg", className: "col-span-2 md:col-span-2 aspect-[4/3] md:aspect-[16/9]", imgClass: "object-[center_20%]" },
            { src: "/FOTOS/DSC04797.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-top" },
            { src: "/FOTOS/DSC04800.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-top" },
            { src: "/FOTOS/DSC04809.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-top" },
            { src: "/FOTOS/DSC04810.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-top" },
            { src: "/FOTOS/DSC04836.jpg.jpeg", className: "col-span-2 md:col-span-2 aspect-[4/3] md:aspect-[16/9]", imgClass: "object-[50%_25%]" },
            { src: "/FOTOS/DSC04829.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-top" },
            { src: "/FOTOS/DSC04833.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-top" },
            { src: "/FOTOS/DSC04843.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-top" },
            { src: "/FOTOS/DSC04869.jpg.jpeg", className: "col-span-1 aspect-square", imgClass: "object-[50%_15%]" },
          ].map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden shadow-sm border border-wine/10 bg-wine/5 group ${photo.className}`}
            >
              <img 
                src={photo.src} 
                alt={`Momento ${idx + 1}`} 
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${photo.imgClass || "object-center"}`}
              />
              <div className="absolute inset-0 bg-wine/0 group-hover:bg-wine/10 transition-colors duration-500" />
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
          <a href="https://photos.app.goo.gl/E4BAKhAuPXhJE4uT7" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-wine text-white rounded-full flex items-center justify-center gap-2 hover:bg-wine/90 transition-colors shadow-md font-semibold text-sm tracking-wider uppercase w-full md:w-auto">
            <Camera className="w-5 h-5" />
            <span>Ver y subir fotos</span>
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}
