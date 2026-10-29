"use client";

import { Church, Heart, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { EditorialCard, DressCodeIllustration } from "./EditorialDecorations";

export default function Details() {
  return (
    <section className="bg-[#F7F5F0] overflow-hidden">
      {/* 1. CEREMONIA Y RECEPCIÓN (00:26 - 00:33) */}
      <div className="py-10 px-4 max-w-lg mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <EditorialCard
            topLeftFlower={true}
            bottomRightFlower={true}
            topRightFlower={false}
            bottomLeftFlower={false}
          >
            <div className="flex justify-center mb-3 text-[#3B4920]">
              <Church className="w-8 h-8 stroke-[1.3]" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl tracking-[0.16em] text-[#2C3325] uppercase">
              CEREMONIA Y RECEPCIÓN
            </h3>

            <p className="font-serif text-base sm:text-lg text-[#2C3325]/85 mt-3 font-medium">
              Domingo, 15 de Noviembre · 4:00 PM
            </p>

            <p className="font-serif text-sm sm:text-base text-[#2C3325]/80 mt-2 leading-relaxed max-w-xs mx-auto">
              Club del Comercio
              <br />
              <span className="italic text-[#3B4920]">Salón Patio de los Cujíes</span>
            </p>

            <div className="mt-6">
              <a
                href="https://maps.app.goo.gl/WLPKwXCP8Zg788Pg7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-2.5 bg-[#526330] hover:bg-[#3B4920] text-white font-serif text-xs sm:text-sm tracking-[0.18em] uppercase rounded-sm shadow-sm transition-colors"
              >
                VER MAPA
              </a>
            </div>
          </EditorialCard>

          {/* Olive accent band underneath */}
          <div className="h-6 bg-[#526330] max-w-md mx-auto mt-6 shadow-sm" />
        </motion.div>

        {/* 2. CÓDIGO DE VESTIMENTA (00:36 - 00:41) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="pt-8"
        >
          <EditorialCard
            hasTopSeal={true}
            sealText="D&T"
            topLeftFlower={true}
            bottomRightFlower={true}
            topRightFlower={false}
            bottomLeftFlower={false}
          >
            <h3 className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-[#2C3325] uppercase mt-2">
              CÓDIGO DE
              <br />
              VESTIMENTA
            </h3>
            <p className="font-script text-3xl sm:text-4xl text-[#526330] mt-1 mb-2">
              Formal Elegante
            </p>

            {/* Bride & Groom Line Illustration */}
            <DressCodeIllustration className="my-2" />

            <div className="space-y-1 font-serif text-sm sm:text-base text-[#2C3325]/90 mt-2">
              <p>
                <span className="font-semibold">Damas:</span> Vestido Largo
              </p>
              <p>
                <span className="font-semibold">Caballeros:</span> Traje
              </p>
            </div>

            <div className="w-12 h-px bg-[#526330]/35 mx-auto my-4" />

            <p className="font-serif text-xs sm:text-sm text-[#2C3325]/80 max-w-xs mx-auto leading-relaxed">
              Reservamos los colores{" "}
              <span className="font-semibold text-[#3B4920]">
                verde olivo, beige y blanco
              </span>
              :
            </p>

            {/* 3 Reserved Color Circles */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex flex-col items-center gap-1">
                <span
                  className="w-6 h-6 rounded-full bg-[#526330] border border-[#2C3325]/40 shadow-inner"
                  title="Verde Olivo"
                />
                <span className="font-serif text-[10px] text-[#2C3325]/70">Verde Olivo</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span
                  className="w-6 h-6 rounded-full bg-[#E3DAC9] border border-[#2C3325]/40 shadow-inner"
                  title="Beige"
                />
                <span className="font-serif text-[10px] text-[#2C3325]/70">Beige</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span
                  className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#2C3325]/40 shadow-inner"
                  title="Blanco"
                />
                <span className="font-serif text-[10px] text-[#2C3325]/70">Blanco</span>
              </div>
            </div>
          </EditorialCard>
        </motion.div>
      </div>

      {/* 3. FULL-WIDTH PHOTO INTERLUDE (00:42) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="w-full max-w-lg mx-auto my-8 overflow-hidden shadow-md"
      >
        <div className="relative aspect-[4/4.6] w-full">
          <img
            src="/FOTOS/DSC04836.jpg.jpeg"
            alt="David & Thalia"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-black/10" />
        </div>
      </motion.div>

      {/* 4. REGALOS (LLUVIA DE SOBRES) & NO NIÑOS (00:43 - 00:48) */}
      <div className="py-10 px-4 max-w-lg mx-auto space-y-8">
        {/* Card: Lluvia de Sobres */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <EditorialCard
            topLeftFlower={true}
            bottomRightFlower={false}
            topRightFlower={false}
            bottomLeftFlower={false}
          >
            <div className="flex justify-center mb-3">
              <div className="relative inline-flex items-center justify-center w-10 h-7 bg-[#526330] rounded-xs text-[#E7C97B] shadow-xs">
                <Mail className="w-6 h-6 stroke-[1.4]" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl tracking-[0.16em] text-[#2C3325] uppercase">
              LLUVIA DE SOBRES
            </h3>

            <p className="font-serif italic text-sm sm:text-base text-[#3B4920] mt-3">
              ¿Quieres ser parte de nuestra historia de amor?
            </p>

            <p className="font-serif text-sm sm:text-base text-[#2C3325]/85 mt-3 leading-relaxed max-w-xs mx-auto">
              Si deseas bendecirnos en esta nueva etapa, puedes hacerlo mediante{" "}
              <span className="font-semibold text-[#3B4920]">lluvia de sobres</span>.
            </p>
          </EditorialCard>
        </motion.div>

        {/* Card: No Niños */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <EditorialCard
            topRightFlower={true}
            bottomLeftFlower={true}
            topLeftFlower={false}
            bottomRightFlower={false}
          >
            <div className="flex justify-center mb-3 text-[#526330]">
              <Heart className="w-7 h-7 fill-[#526330]" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl tracking-[0.16em] text-[#2C3325] uppercase">
              NO NIÑOS
            </h3>

            <p className="font-serif text-sm sm:text-base text-[#2C3325]/85 mt-3 leading-relaxed max-w-xs mx-auto">
              Aunque amamos a sus pequeños, este día especial es{" "}
              <span className="font-semibold text-[#3B4920]">solo para adultos</span>. Les
              pedimos que nos acompañen sin niños.
            </p>
          </EditorialCard>
        </motion.div>
      </div>
    </section>
  );
}
