"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const PHOTOS = [
  {
    src: "/FOTOS/DSC02860.JPG.jpeg",
    alt: "David & Thalia frente a la capilla colonial",
    focus: "object-[center_35%]",
  },
  {
    src: "/FOTOS/DSC02870.JPG.jpeg",
    alt: "David besando con ternura la frente de Thalia",
    focus: "object-[center_30%]",
  },
  {
    src: "/FOTOS/DSC02866.JPG.jpeg",
    alt: "Retrato sonriente de David & Thalia",
    focus: "object-[center_20%]",
  },
  {
    src: "/FOTOS/DSC02835.JPG.jpeg",
    alt: "Abrazo cómplice y feliz de los novios",
    focus: "object-[center_25%]",
  },
  {
    src: "/FOTOS/DSC02812.JPG.jpeg",
    alt: "Paseo romántico de David & Thalia entre los árboles",
    focus: "object-[center_35%]",
  },
  {
    src: "/FOTOS/DSC02846.JPG.jpeg",
    alt: "David & Thalia bajo la pérgola de madera rústica",
    focus: "object-[center_35%]",
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
  };

  return (
    <section className="overflow-hidden relative">
      {/* 1. LUXURY OLIVE GREEN FINE-ART GALLERY SECTION */}
      <div
        className="relative py-20 sm:py-24 px-4 text-white text-center overflow-hidden max-w-lg mx-auto shadow-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #516430 0%, #3B4A21 60%, #263114 100%)",
        }}
      >
        {/* Subtle top gold foil accent line */}
        <div className="flex items-center justify-center gap-3 mb-10 opacity-75">
          <span className="w-12 sm:w-20 h-px bg-linear-to-r from-transparent to-[#C59B47]" />
          <Sparkles className="w-4 h-4 text-[#E7C97B]" />
          <span className="w-12 sm:w-20 h-px bg-linear-to-l from-transparent to-[#C59B47]" />
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-8 px-4"
        >
          <span className="font-script text-3xl sm:text-4xl text-[#E7C97B] block">
            Nuestros Momentos
          </span>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.2em] text-white uppercase mt-1 font-semibold">
            HISTORIA DE AMOR
          </h2>
        </motion.div>

        {/* ULTRA-ELEGANT FINE-ART / MUSEUM MATTE FRAME */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-85 sm:max-w-97.5"
        >
          {/* Museum Passe-Partout Outer Card (Warm Ivory with Soft Depth Shadow) */}
          <div
            className="relative bg-[#FAF8F5] p-4 sm:p-5 rounded-sm shadow-[0_22px_60px_rgba(15,22,8,0.55)] border border-[#E7E2D5]"
            style={{
              backgroundImage:
                "radial-gradient(#D5CEBD 0.6px, transparent 0.6px), radial-gradient(#E8E2D4 0.6px, #FAF8F5 0.6px)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0, 8px 8px",
            }}
          >
            {/* Double Gold Leaf Foil Border */}
            <div className="relative border-2 border-[#C59B47] p-1.5 sm:p-2 rounded-xs">
              <div className="relative border border-[#C59B47]/60 p-2 sm:p-2.5 rounded-xs">
                {/* 4 Fine Gold Filigree Corner Ornaments */}
                {/* Top-Left Corner Flourish */}
                <svg
                  viewBox="0 0 40 40"
                  className="absolute -top-1 -left-1 w-7 h-7 text-[#C59B47] pointer-events-none z-20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M2 18 C2 8, 8 2, 18 2 M6 14 C6 8, 8 6, 14 6" strokeLinecap="round" />
                  <circle cx="5" cy="5" r="2" fill="#C59B47" />
                  <path d="M2 2 L10 10" strokeLinecap="round" />
                </svg>

                {/* Top-Right Corner Flourish */}
                <svg
                  viewBox="0 0 40 40"
                  className="absolute -top-1 -right-1 w-7 h-7 text-[#C59B47] pointer-events-none z-20 scale-x-[-1]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M2 18 C2 8, 8 2, 18 2 M6 14 C6 8, 8 6, 14 6" strokeLinecap="round" />
                  <circle cx="5" cy="5" r="2" fill="#C59B47" />
                  <path d="M2 2 L10 10" strokeLinecap="round" />
                </svg>

                {/* Bottom-Left Corner Flourish */}
                <svg
                  viewBox="0 0 40 40"
                  className="absolute -bottom-1 -left-1 w-7 h-7 text-[#C59B47] pointer-events-none z-20 scale-y-[-1]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M2 18 C2 8, 8 2, 18 2 M6 14 C6 8, 8 6, 14 6" strokeLinecap="round" />
                  <circle cx="5" cy="5" r="2" fill="#C59B47" />
                  <path d="M2 2 L10 10" strokeLinecap="round" />
                </svg>

                {/* Bottom-Right Corner Flourish */}
                <svg
                  viewBox="0 0 40 40"
                  className="absolute -bottom-1 -right-1 w-7 h-7 text-[#C59B47] pointer-events-none z-20 scale-[-1]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M2 18 C2 8, 8 2, 18 2 M6 14 C6 8, 8 6, 14 6" strokeLinecap="round" />
                  <circle cx="5" cy="5" r="2" fill="#C59B47" />
                  <path d="M2 2 L10 10" strokeLinecap="round" />
                </svg>

                {/* Photo Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xs bg-[#222B14] shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={PHOTOS[currentIndex].src}
                      alt={PHOTOS[currentIndex].alt}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      className={`w-full h-full object-cover ${PHOTOS[currentIndex].focus}`}
                    />
                  </AnimatePresence>

                  {/* Soft Inner Frame Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 25px rgba(20,28,10,0.35)",
                    }}
                  />

                  {/* Left / Right Subtle Luxury Navigation Controls */}
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Siguiente foto"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Minimalist Gold Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {PHOTOS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ver fotografía ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-[#E7C97B] shadow-[0_0_8px_rgba(231,201,123,0.8)]"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Story Quote with Generous Typography & Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mt-10 px-4"
        >
          <p className="font-serif text-base sm:text-lg md:text-xl text-[#FAF8F5] leading-relaxed drop-shadow-sm font-normal">
            No fue casualidad, fue el propósito de Dios encontrando su tiempo en nuestras vidas.
            Hoy, con el corazón lleno de gratitud, estamos listos para escribir nuestro...
          </p>
          <p className="font-script text-5xl sm:text-6xl text-[#E7C97B] mt-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            para siempre.
          </p>
        </motion.div>
      </div>

      {/* 2. FULL-BLEED ROMANTIC PHOTO WITH SCRIPT QUOTE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ aspectRatio: "4 / 4.8" }}
        className="relative w-full max-w-lg mx-auto overflow-hidden shadow-2xl"
      >
        <img
          src="/FOTOS/DSC02870.JPG.jpeg"
          alt="David & Thalia"
          className="w-full h-full object-cover object-[center_35%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,38,18,0.65) 0%, rgba(30,38,18,0.15) 35%, rgba(30,38,18,0.45) 100%)",
          }}
        />
        <div className="absolute top-12 sm:top-14 left-0 right-0 text-center px-6">
          <p className="font-script text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] leading-tight">
            donde estás tú, está
            <br />
            mi hogar.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
