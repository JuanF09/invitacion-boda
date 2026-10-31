"use client";

import { motion } from "framer-motion";
import { EditorialCard } from "./EditorialDecorations";

export default function Message() {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] px-4 overflow-hidden">
      <div className="max-w-lg mx-auto">
        {/* Main Editorial Card with Olive Green Offset Block Behind (00:16 of video) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, margin: "-40px" }}
          className="relative pt-8 pl-3 sm:pl-5"
        >
          {/* Decorative Olive Green Block Behind Top-Left */}
          <div
            className="absolute top-0 left-0 w-44 sm:w-56 h-80 sm:h-96 bg-[#4A5B2B] shadow-lg rounded-xs z-0"
            aria-hidden="true"
          />

          <EditorialCard
            hasTopSeal={true}
            sealText="D&T"
            topRightFlower={true}
            bottomLeftFlower={true}
            className="z-10 shadow-2xl"
          >
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.2em] text-[#1B2412] uppercase leading-snug mt-3 font-bold">
              DAVID &
              <br />
              THALIA
            </h2>

            <div className="w-16 h-0.5 bg-[#C59B47] mx-auto my-6" />

            <div className="space-y-4 font-serif text-base sm:text-lg md:text-xl text-[#1E2713] leading-relaxed">
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
              <p className="italic text-[#3B4A20] font-semibold pt-2 text-lg sm:text-xl">
                Nos encantaría que nos acompañaras a celebrar el inicio de esta nueva historia.
              </p>
            </div>

            <p className="font-serif text-sm sm:text-base text-[#38481E] mt-8 mb-3 tracking-widest uppercase font-semibold">
              Que se celebrará el próximo
            </p>

            {/* Single-line Date: 15 - NOV - 2026 */}
            <div className="w-full max-w-xs mx-auto border-y-2 border-[#3B4920]/70 py-3.5 px-3 my-2 bg-[#FAF8F5] flex items-center justify-center">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.14em] text-[#141C0A] font-extrabold whitespace-nowrap">
                15 - NOV - 2026
              </span>
            </div>

            {/* Highlighted Day & Time (4:00 PM stands out clearly in sans/lining numerals) */}
            <div className="mt-4 flex flex-col items-center gap-1.5">
              <span className="font-serif text-sm sm:text-base text-[#4A5D27] tracking-[0.28em] uppercase font-bold">
                DOMINGO
              </span>
              <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-[#4A5B2B] text-white shadow-md border border-[#C59B47]/50">
                <span className="font-sans text-lg sm:text-xl md:text-2xl tracking-[0.16em] font-bold">
                  4:00 PM
                </span>
              </div>
            </div>
          </EditorialCard>
        </motion.div>

        {/* Overlapping Tilted Polaroids + Bible Verse (00:21-00:24 of video) */}
        <div className="mt-20 sm:mt-24 flex flex-col items-center">
          <div className="relative w-full max-w-85 sm:max-w-95 h-92 sm:h-100 mx-auto">
            {/* Top-Left Polaroid */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -12 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute top-0 left-2 w-52 sm:w-58 bg-white p-3 pb-9 shadow-[0_16px_36px_rgba(20,28,10,0.18)] border border-black/5 z-10"
            >
              <div className="w-full aspect-square overflow-hidden bg-[#EBF0E4]">
                <img
                  src="/FOTOS/DSC02812.JPG.jpeg"
                  alt="David & Thalia"
                  className="w-full h-full object-cover object-[center_35%]"
                />
              </div>
            </motion.div>

            {/* Bottom-Right Polaroid */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 12 }}
              whileInView={{ opacity: 1, x: 0, rotate: 5 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute bottom-2 right-2 w-56 sm:w-62 bg-white p-3 pb-9 shadow-[0_20px_42px_rgba(20,28,10,0.22)] border border-black/5 z-20"
            >
              <div className="w-full aspect-square overflow-hidden bg-[#EBF0E4]">
                <img
                  src="/FOTOS/DSC02835.JPG.jpeg"
                  alt="David & Thalia"
                  className="w-full h-full object-cover object-[center_25%]"
                />
              </div>
            </motion.div>
          </div>

          {/* Bible Verse: 1 Corintios 13:7 NTV */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            viewport={{ once: true }}
            className="text-center max-w-md mx-auto mt-12 px-6"
          >
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#1E2713] leading-relaxed">
              “El amor nunca se da por vencido, jamás pierde la fe, siempre tiene esperanzas y se
              mantiene firme en toda circunstancia.”
            </p>
            <p className="font-serif text-sm sm:text-base tracking-[0.25em] uppercase text-[#4A5D27] font-bold mt-4">
              1 Corintios 13:7 NTV
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
