"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WaxSeal } from "./EditorialDecorations";

interface EnvelopeProps {
  guestName?: string;
  guestPasses?: number;
  onOpen: () => void;
}

export default function Envelope({ guestName, guestPasses = 1, onOpen }: EnvelopeProps) {
  const [stage, setStage] = useState<"closed" | "opened" | "exiting">("closed");

  const handleOpenFlap = () => {
    if (stage === "closed") {
      setStage("opened");
    }
  };

  const handleEnterInvitation = () => {
    setStage("exiting");
    setTimeout(() => {
      onOpen();
    }, 650);
  };

  const passesLabel = guestPasses === 1 ? "1 persona" : `${guestPasses} personas`;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "exiting" ? 0 : 1, scale: stage === "exiting" ? 1.04 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-10 px-4 overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(180deg, #E8ECE6 0%, #F4F4EE 38%, #DCE2D3 72%, #8F9E77 100%)",
      }}
    >
      {/* Watercolor foliage atmosphere at the bottom */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-45 blur-2xl"
          style={{ background: "radial-gradient(circle, #4A5A2B 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 right-0 w-96 h-96 rounded-full opacity-45 blur-2xl"
          style={{ background: "radial-gradient(circle, #5D703A 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-8 left-1/4 w-72 h-64 rounded-full opacity-35 blur-xl"
          style={{ background: "radial-gradient(circle, #798C56 0%, transparent 70%)" }}
        />
        {/* Subtle botanical silhouettes at bottom */}
        <svg
          viewBox="0 0 400 180"
          className="absolute bottom-0 left-0 w-full h-44 object-cover opacity-25 text-[#3B4920]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 180 L0 110 Q40 80 80 115 T160 95 T240 110 T320 85 T400 105 L400 180 Z"
            fill="currentColor"
          />
          <path
            d="M0 180 L0 130 Q60 100 110 135 T220 115 T330 125 T400 130 L400 180 Z"
            fill="#2C3716"
          />
        </svg>
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center mt-4 sm:mt-8"
      >
        <p className="font-serif text-sm sm:text-base text-[#3B4920]/85 tracking-wide leading-snug max-w-xs mx-auto">
          El día más importante de nuestras
          <br />
          vidas ha llegado
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#2C3325] mt-2 font-medium">
          ¡NOS CASAMOS!
        </h1>
      </motion.div>

      {/* Center Interactive Olive Envelope */}
      <div className="relative z-30 w-full max-w-90 sm:max-w-100 my-auto flex flex-col items-center">
        <div
          className={`relative w-full aspect-16/11 transition-transform duration-700 ${
            stage === "opened" ? "translate-y-12" : ""
          }`}
        >
          {/* Back inside of the envelope */}
          <div
            className="absolute inset-0 rounded-sm shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #435225 0%, #3A481E 100%)",
              boxShadow: "0 20px 40px rgba(35, 44, 18, 0.38)",
            }}
          />

          {/* Open Flap (visible behind emerging cards when opened) */}
          <AnimatePresence>
            {stage !== "closed" && (
              <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{
                  transformOrigin: "bottom center",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  background: "linear-gradient(180deg, #62753B 0%, #4C5D2B 100%)",
                }}
                className="absolute -top-[56%] left-0 w-full h-[57%] z-0 shadow-md"
              />
            )}
          </AnimatePresence>

          {/* Cards emerging from inside the envelope (Stage: opened) */}
          <AnimatePresence>
            {stage !== "closed" && (
              <>
                {/* Left Card: RESERVADO PARA */}
                <motion.div
                  initial={{ y: 40, rotate: 0, opacity: 0 }}
                  animate={{ y: -58, rotate: -7, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
                  onClick={handleEnterInvitation}
                  className="absolute left-4 sm:left-6 top-2 w-[48%] aspect-[3/3.8] bg-[#FAF9F5] p-2 shadow-xl cursor-pointer z-10"
                >
                  <div className="w-full h-full border border-[#3B4920]/60 flex flex-col items-center justify-center px-2 py-3 text-center">
                    <span className="font-serif text-[10px] sm:text-xs tracking-[0.14em] uppercase text-[#2C3325]/80">
                      RESERVADO PARA
                    </span>
                    <p className="font-serif text-xs sm:text-sm font-semibold text-[#2C3325] mt-2 line-clamp-3 leading-tight">
                      {guestName || "Invitado Especial"}
                    </p>
                    <div className="w-8 h-px bg-[#526330]/40 my-2" />
                    <span className="font-serif text-[11px] sm:text-xs text-[#3B4920] font-medium">
                      {passesLabel}
                    </span>
                  </div>
                </motion.div>

                {/* Right Card: Polaroid Photo */}
                <motion.div
                  initial={{ y: 40, rotate: 0, opacity: 0 }}
                  animate={{ y: -52, rotate: 6, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
                  onClick={handleEnterInvitation}
                  className="absolute right-4 sm:right-6 top-2 w-[46%] aspect-[3/3.6] bg-white p-2 pb-5 shadow-xl cursor-pointer z-10"
                >
                  <div className="w-full h-full overflow-hidden bg-[#E8ECE2]">
                    <img
                      src="/FOTOS/DSC04810.jpg.jpeg"
                      alt="David & Thalia"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Envelope Front Side Flaps & Bottom Pocket */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-sm">
            {/* Left triangle fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 52% 52%, 0 100%)",
                background: "linear-gradient(135deg, #5B6E36 0%, #4E5F2D 100%)",
              }}
            />
            {/* Right triangle fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(100% 0, 48% 52%, 100% 100%)",
                background: "linear-gradient(225deg, #586A33 0%, #4A5B2A 100%)",
              }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 100%, 50% 46%, 100% 100%)",
                background: "linear-gradient(0deg, #4B5C2B 0%, #586B34 100%)",
              }}
            />
            {/* Subtle diagonal seam lines */}
            <svg viewBox="0 0 400 275" className="absolute inset-0 w-full h-full">
              <line x1="0" y1="275" x2="200" y2="128" stroke="#36431C" strokeWidth="1" opacity="0.45" />
              <line x1="400" y1="275" x2="200" y2="128" stroke="#36431C" strokeWidth="1" opacity="0.45" />
            </svg>
          </div>

          {/* Closed Top Flap + Wax Seal (Stage: closed) */}
          <AnimatePresence>
            {stage === "closed" && (
              <motion.div
                key="closed-flap"
                initial={{ rotateX: 0 }}
                exit={{ rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
                onClick={handleOpenFlap}
                className="absolute inset-0 z-30 cursor-pointer"
              >
                {/* Top triangular flap */}
                <div
                  className="absolute top-0 left-0 w-full h-[64%]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #5F7338 0%, #4E602D 100%)",
                    filter: "drop-shadow(0 5px 8px rgba(25, 34, 11, 0.35))",
                  }}
                />
                {/* Diagonal flap highlight lines */}
                <svg viewBox="0 0 400 275" className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="0" y1="0" x2="200" y2="176" stroke="#7A8F4E" strokeWidth="1.2" opacity="0.45" />
                  <line x1="400" y1="0" x2="200" y2="176" stroke="#313E18" strokeWidth="1.2" opacity="0.45" />
                </svg>

                {/* "Clic aquí" + Gold Wax Seal */}
                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="font-serif text-xs sm:text-sm text-white/95 tracking-wider mb-2 drop-shadow"
                  >
                    Clic aquí
                  </motion.span>
                  <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                    <WaxSeal text="D&T" size="lg" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Circular "VER MÁS DETALLES" Button (Stage: opened) */}
          <AnimatePresence>
            {stage === "opened" && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.45, type: "spring" }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnterInvitation}
                className="absolute -bottom-6 -right-2 sm:-right-4 z-40 w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-[#FAF9F5] shadow-2xl p-1.5 flex items-center justify-center cursor-pointer"
              >
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-full h-full rounded-full border border-[#3B4920]/65 flex flex-col items-center justify-center text-center px-2"
                >
                  <span className="font-serif text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-[#2C3325] leading-tight font-medium">
                    VER MÁS
                    <br />
                    DETALLES
                  </span>
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Couple Names under the envelope */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`text-center transition-all duration-700 ${
            stage === "opened" ? "mt-20" : "mt-8"
          }`}
        >
          <h2 className="font-serif text-xl sm:text-2xl tracking-[0.22em] text-[#2C3325]/90 uppercase">
            DAVID & THALIA
          </h2>
        </motion.div>
      </div>

      {/* Bottom spacer */}
      <div className="h-4" />
    </motion.div>
  );
}
