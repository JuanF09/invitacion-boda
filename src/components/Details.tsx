"use client";

import { Church, Heart, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { EditorialCard, DressCodeIllustration } from "./EditorialDecorations";

export default function Details() {
  return (
    <section className="bg-[#F7F5F0] overflow-hidden">
      {/* 1. CEREMONIA Y RECEPCIÓN (00:26 - 00:33) */}
      <div className="py-12 px-4 max-w-lg mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <EditorialCard
            topLeftFlower={true}
            bottomRightFlower={true}
            topRightFlower={false}
            bottomLeftFlower={false}
            className="shadow-xl"
          >
            <div className="flex justify-center mb-4 text-[#3B4920]">
              <div className="w-14 h-14 rounded-full bg-[#EBF0E4] flex items-center justify-center border border-[#3B4920]/30 shadow-xs">
                <Church className="w-8 h-8 stroke-[1.4]" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#1B2312] uppercase font-bold">
              CEREMONIA Y RECEPCIÓN
            </h3>

            <div className="w-12 h-0.5 bg-[#C59B47] mx-auto my-4" />

            <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#3B4920] font-bold">
              Domingo, 15 de Noviembre · 4:00 PM
            </p>

            <p className="font-serif text-base sm:text-lg md:text-xl text-[#1E2713] mt-3 leading-relaxed max-w-xs mx-auto">
              Club del Comercio
              <br />
              <span className="italic text-[#4A5D27] font-semibold">Salón Patio de los Cujíes</span>
            </p>

            <div className="mt-8">
              <a
                href="https://maps.app.goo.gl/WLPKwXCP8Zg788Pg7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-3.5 bg-linear-to-r from-[#526330] to-[#435226] hover:from-[#3D4B22] hover:to-[#323E1B] text-white font-serif text-sm sm:text-base tracking-[0.2em] uppercase rounded-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-[#E7C97B]/40 font-semibold"
              >
                VER MAPA
              </a>
            </div>
          </EditorialCard>

          {/* Olive accent band underneath */}
          <div className="h-6 bg-[#4A5B2B] max-w-md mx-auto mt-6 shadow-sm rounded-xs" />
        </motion.div>

        {/* 2. CÓDIGO DE VESTIMENTA (00:36 - 00:41) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-6"
        >
          <EditorialCard
            hasTopSeal={true}
            sealText="D&T"
            topLeftFlower={true}
            bottomRightFlower={true}
            topRightFlower={false}
            bottomLeftFlower={false}
            className="shadow-xl"
          >
            <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#1B2312] uppercase mt-3 font-bold">
              CÓDIGO DE
              <br />
              VESTIMENTA
            </h3>
            <p className="font-script text-4xl sm:text-5xl text-[#4A5E28] mt-2 mb-3">
              Formal Elegante
            </p>

            {/* Bride & Groom Line Illustration */}
            <DressCodeIllustration className="my-3" />

            <div className="space-y-2 font-serif text-base sm:text-lg text-[#1E2713] mt-3">
              <p>
                <span className="font-bold text-[#3B4920]">Damas:</span> Vestido Largo
              </p>
              <p>
                <span className="font-bold text-[#3B4920]">Caballeros:</span> Traje
              </p>
            </div>

            <div className="w-16 h-0.5 bg-[#C59B47] mx-auto my-5" />

            <p className="font-serif text-sm sm:text-base text-[#1E2713] max-w-xs mx-auto leading-relaxed font-medium">
              Reservamos con cariño los colores{" "}
              <span className="font-bold text-[#3B4920]">
                verde olivo, beige y blanco
              </span>
              :
            </p>

            {/* 3 Reserved Color Circles */}
            <div className="flex items-center justify-center gap-6 mt-5">
              <div className="flex flex-col items-center gap-2">
                <span
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#526330] border-2 border-[#FAF9F5] shadow-md ring-1 ring-[#3B4920]/40"
                  title="Verde Olivo"
                />
                <span className="font-serif text-xs sm:text-sm text-[#1E2713] font-semibold">
                  Verde Olivo
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5DCCB] border-2 border-[#FAF9F5] shadow-md ring-1 ring-[#3B4920]/40"
                  title="Beige"
                />
                <span className="font-serif text-xs sm:text-sm text-[#1E2713] font-semibold">
                  Beige
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFFFF] border-2 border-[#FAF9F5] shadow-md ring-1 ring-[#3B4920]/40"
                  title="Blanco"
                />
                <span className="font-serif text-xs sm:text-sm text-[#1E2713] font-semibold">
                  Blanco
                </span>
              </div>
            </div>
          </EditorialCard>
        </motion.div>
      </div>

      {/* 3. FULL-WIDTH PHOTO INTERLUDE (00:42) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-lg mx-auto my-10 overflow-hidden shadow-2xl"
      >
        <div className="relative w-full" style={{ aspectRatio: "4 / 4.6" }}>
          <img
            src="/FOTOS/DSC02846.JPG.jpeg"
            alt="David & Thalia"
            className="w-full h-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/15" />
        </div>
      </motion.div>

      {/* 4. REGALOS (LLUVIA DE SOBRES) & NO NIÑOS (00:43 - 00:48) */}
      <div className="py-12 px-4 max-w-lg mx-auto space-y-10">
        {/* Card: Lluvia de Sobres */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <EditorialCard
            topLeftFlower={true}
            bottomRightFlower={false}
            topRightFlower={false}
            bottomLeftFlower={false}
            className="shadow-xl"
          >
            <div className="flex justify-center mb-4">
              <div className="relative inline-flex items-center justify-center w-12 h-9 bg-[#4A5B2B] rounded-xs text-[#E7C97B] shadow-md">
                <Mail className="w-7 h-7 stroke-[1.5]" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#1B2312] uppercase font-bold">
              LLUVIA DE SOBRES
            </h3>

            <p className="font-serif italic text-base sm:text-lg text-[#3B4920] mt-3 font-semibold">
              ¿Quieres ser parte de nuestra historia de amor?
            </p>

            <p className="font-serif text-base sm:text-lg md:text-xl text-[#1E2713] mt-3 leading-relaxed max-w-xs mx-auto">
              Si deseas bendecirnos en esta nueva etapa, puedes hacerlo mediante{" "}
              <span className="font-bold text-[#3B4920]">lluvia de sobres</span>.
            </p>
          </EditorialCard>
        </motion.div>

        {/* Card: No Niños */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <EditorialCard
            topRightFlower={true}
            bottomLeftFlower={true}
            topLeftFlower={false}
            bottomRightFlower={false}
            className="shadow-xl"
          >
            <div className="flex justify-center mb-4 text-[#4A5B2B]">
              <div className="w-12 h-12 rounded-full bg-[#EBF0E4] flex items-center justify-center border border-[#3B4920]/30 shadow-xs">
                <Heart className="w-7 h-7 fill-[#4A5B2B]" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#1B2312] uppercase font-bold">
              NO NIÑOS
            </h3>

            <p className="font-serif text-base sm:text-lg md:text-xl text-[#1E2713] mt-3 leading-relaxed max-w-xs mx-auto">
              Aunque amamos con todo el corazón a sus pequeños, este día especial es{" "}
              <span className="font-bold text-[#3B4920]">exclusivamente para adultos</span>. Les
              pedimos que nos acompañen sin niños.
            </p>
          </EditorialCard>
        </motion.div>
      </div>
    </section>
  );
}
