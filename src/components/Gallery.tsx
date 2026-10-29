"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  "/FOTOS/DSC04838.jpg.jpeg",
  "/FOTOS/DSC04797.jpg.jpeg",
  "/FOTOS/DSC04800.jpg.jpeg",
  "/FOTOS/DSC04809.jpg.jpeg",
  "/FOTOS/DSC04810.jpg.jpeg",
  "/FOTOS/DSC04829.jpg.jpeg",
  "/FOTOS/DSC04833.jpg.jpeg",
  "/FOTOS/DSC04843.jpg.jpeg",
  "/FOTOS/DSC04869.jpg.jpeg",
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
  };

  return (
    <section className="overflow-hidden">
      {/* 1. OLIVE GREEN LACE-FRAMED GALLERY SECTION (00:49 - 00:56 of reference video) */}
      <div
        className="relative py-16 sm:py-20 px-4 text-white text-center overflow-hidden max-w-lg mx-auto shadow-inner"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, #5C6F36 0%, #445424 65%, #323E19 100%)",
        }}
      >
        {/* Subtle top lace border */}
        <div
          className="w-full h-3 opacity-35 mb-8"
          style={{
            backgroundImage:
              "radial-gradient(circle at 6px 6px, rgba(255,255,255,0.85) 3px, transparent 4px)",
            backgroundSize: "14px 12px",
          }}
        />

        {/* Scalloped / Eyelet Lace Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center"
        >
          {/* Decorative White Eyelet Lace SVG Frame */}
          <svg
            viewBox="0 0 320 320"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 drop-shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
          >
            {/* Outer scalloped lace loops */}
            {Array.from({ length: 10 }).map((_, i) => {
              const pos = 34 + i * 28;
              return (
                <g key={i} fill="none" stroke="#FAF9F5" strokeWidth="1.5" opacity="0.9">
                  {/* Top scallops */}
                  <circle cx={pos} cy="16" r="12" fill="#FAF9F5" fillOpacity="0.22" />
                  <circle cx={pos} cy="16" r="4" fill="#445424" />
                  {/* Bottom scallops */}
                  <circle cx={pos} cy="304" r="12" fill="#FAF9F5" fillOpacity="0.22" />
                  <circle cx={pos} cy="304" r="4" fill="#445424" />
                  {/* Left scallops */}
                  <circle cx="16" cy={pos} r="12" fill="#FAF9F5" fillOpacity="0.22" />
                  <circle cx="16" cy={pos} r="4" fill="#445424" />
                  {/* Right scallops */}
                  <circle cx="304" cy={pos} r="12" fill="#FAF9F5" fillOpacity="0.22" />
                  <circle cx="304" cy={pos} r="4" fill="#445424" />
                </g>
              );
            })}
            {/* Corner medallions */}
            {[
              [18, 18],
              [302, 18],
              [18, 302],
              [302, 302],
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill="#FAF9F5"
                  fillOpacity="0.3"
                  stroke="#FAF9F5"
                  strokeWidth="1.5"
                />
                <circle cx={cx} cy={cy} r="5" fill="#445424" stroke="#FAF9F5" strokeWidth="1" />
              </g>
            ))}
            {/* Inner crisp white border */}
            <rect
              x="28"
              y="28"
              width="264"
              height="264"
              rx="18"
              fill="none"
              stroke="#FAF9F5"
              strokeWidth="4"
            />
          </svg>

          {/* Photo Carousel Inside the Lace Frame */}
          <div className="relative w-58 h-58 sm:w-64.5 sm:h-64.5 rounded-2xl overflow-hidden shadow-inner z-20 bg-[#2C3325]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={PHOTOS[currentIndex]}
                alt={`David & Thalia - Foto ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>

            {/* Prev / Next subtle controls */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Siguiente foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1.5 mt-5">
          {PHOTOS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a foto ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Romantic Story Quote under the Lace Frame (00:52 - 00:55) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xs mx-auto mt-8 px-2"
        >
          <p className="font-serif text-sm sm:text-base text-white/95 leading-relaxed">
            No fue casualidad, fue el propósito de Dios encontrando su tiempo en nuestras vidas.
            Hoy, con el corazón lleno de gratitud, estamos listos para escribir nuestro...
          </p>
          <p className="font-script text-4xl sm:text-5xl text-white mt-4">para siempre.</p>
        </motion.div>
      </div>

      {/* 2. FULL-BLEED ROMANTIC PHOTO WITH SCRIPT QUOTE (01:02 of reference video) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="relative w-full max-w-lg mx-auto aspect-[4/4.8] overflow-hidden shadow-md"
      >
        <img
          src="/FOTOS/DSC04869.jpg.jpeg"
          alt="David & Thalia"
          className="w-full h-full object-cover object-[50%_15%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,51,37,0.55) 0%, rgba(44,51,37,0.1) 40%, rgba(44,51,37,0.35) 100%)",
          }}
        />
        <div className="absolute top-10 left-0 right-0 text-center px-6">
          <p className="font-script text-3xl sm:text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] leading-snug">
            donde estás tú, está
            <br />
            mi hogar.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
