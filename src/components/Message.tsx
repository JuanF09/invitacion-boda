"use client";

import { motion } from "framer-motion";
import { EditorialCard } from "./EditorialDecorations";

export default function Message() {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F5F0] px-4 overflow-hidden">
      <div className="max-w-lg mx-auto">
        {/* Main Editorial Card with Olive Green Offset Block Behind */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          viewport={{ once: true, margin: "-40px" }}
          className="relative pt-8 pl-3 sm:pl-5"
        >
          {/* Decorative Olive Green Block Behind Top-Left (exact match to 00:16 of video) */}
          <div
            className="absolute top-0 left-0 w-40 sm:w-48 h-72 sm:h-80 bg-[#526330] shadow-md z-0"
            aria-hidden="true"
          />

          <EditorialCard
            hasTopSeal={true}
            sealText="D&T"
            topRightFlower={true}
            bottomLeftFlower={true}
            className="z-10"
          >
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.16em] text-[#2C3325] uppercase leading-snug mt-2">
              DAVID &
              <br />
              THALIA
            </h2>

            <div className="w-12 h-px bg-[#526330]/40 mx-auto my-5" />

            <div className="space-y-4 font-serif text-sm sm:text-base text-[#2C3325]/90 leading-relaxed">
              <p>
                Hay momentos que se convierten en recuerdos eternos y sueños que Dios hace realidad.
              </p>
              <p>
                No fue casualidad, fue el propósito de Dios encontrando su tiempo en nuestras vidas.
              </p>
              <p>
                Hoy, nuestros corazones se preparan para dar el sí más importante de nuestras vidas
                y comenzar juntos una hermosa historia de amor.
              </p>
              <p className="italic text-[#3B4920] font-medium pt-1">
                Nos encantaría que nos acompañaras a celebrar el inicio de esta nueva historia.
              </p>
            </div>

            <p className="font-serif text-xs sm:text-sm text-[#2C3325]/75 mt-7 mb-3 tracking-wide">
              Que se celebrará el próximo
            </p>

            {/* Framed Date (15 - 11 - 2026) */}
            <div className="inline-block border-y border-[#3B4920]/60 px-6 py-2 my-1">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#2C3325]">
                15 · 11 · 2026
              </span>
            </div>

            <p className="font-serif text-xs sm:text-sm text-[#2C3325]/80 mt-3 tracking-wider uppercase">
              Domingo · 4:00 PM
            </p>
          </EditorialCard>
        </motion.div>

        {/* Overlapping Tilted Polaroids + Bible Verse (exact match to 00:21-00:24 of video) */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center">
          <div className="relative w-full max-w-80 h-85 sm:h-92.5 mx-auto">
            {/* Top-Left Polaroid */}
            <motion.div
              initial={{ opacity: 0, x: -25, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ duration: 0.75 }}
              viewport={{ once: true }}
              className="absolute top-0 left-2 w-48 sm:w-52 bg-white p-2.5 pb-8 shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-black/5 z-10"
            >
              <div className="w-full aspect-square overflow-hidden bg-[#EBF0E4]">
                <img
                  src="/FOTOS/DSC04797.jpg.jpeg"
                  alt="David & Thalia"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Bottom-Right Polaroid */}
            <motion.div
              initial={{ opacity: 0, x: 25, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 4 }}
              transition={{ delay: 0.2, duration: 0.75 }}
              viewport={{ once: true }}
              className="absolute bottom-2 right-2 w-52 sm:w-56 bg-white p-2.5 pb-8 shadow-[0_15px_32px_rgba(0,0,0,0.15)] border border-black/5 z-20"
            >
              <div className="w-full aspect-square overflow-hidden bg-[#EBF0E4]">
                <img
                  src="/FOTOS/DSC04800.jpg.jpeg"
                  alt="David & Thalia"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>

          {/* Bible Verse: 1 Corintios 13:7 NTV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-sm mx-auto mt-8 px-4"
          >
            <p className="font-serif italic text-base sm:text-lg text-[#2C3325]/90 leading-relaxed">
              “El amor nunca se da por vencido, jamás pierde la fe, siempre tiene esperanzas y se
              mantiene firme en toda circunstancia.”
            </p>
            <p className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase text-[#526330] font-semibold mt-3">
              1 Corintios 13:7 NTV
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
