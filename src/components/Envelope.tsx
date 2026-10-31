"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WaxSeal } from "./EditorialDecorations";
import { Sparkles } from "lucide-react";

interface EnvelopeProps {
  guestName?: string;
  guestPasses?: number;
  onStartAudio?: () => void;
  onOpen: () => void;
}

export default function Envelope({
  guestName,
  guestPasses = 1,
  onStartAudio,
  onOpen,
}: EnvelopeProps) {
  const [stage, setStage] = useState<"closed" | "opened" | "exiting">("closed");

  const handleOpenFlap = () => {
    if (stage === "closed") {
      onStartAudio?.();
      setStage("opened");
    }
  };

  const handleEnterInvitation = () => {
    onStartAudio?.();
    setStage("exiting");
    setTimeout(() => {
      onOpen();
    }, 650);
  };

  const passesLabel = guestPasses === 1 ? "1 pase personal" : `${guestPasses} pases reservados`;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "exiting" ? 0 : 1, scale: stage === "exiting" ? 1.04 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-6 sm:py-8 px-4 overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg, #F8F6F1 0%, #EFECE3 45%, #E5E1D5 100%)",
      }}
    >
      {/* Realistic 3D Envelope Drop Shadow Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="realistic-envelope-shadow" x="-15%" y="-15%" width="130%" height="145%">
          <feDropShadow dx="0" dy="26" stdDeviation="28" floodColor="#151E0A" floodOpacity="0.4" />
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#151E0A" floodOpacity="0.22" />
        </filter>
      </svg>

      {/* CLEAN EDITORIAL BOTANICAL FRAME & SOFT AMBIENT LIGHT (100% Free Center Zone for Text Legibility) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Soft atmospheric corner glows */}
        <div
          className="absolute -top-36 -left-36 w-110 h-110 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #7D925A 0%, transparent 70%)" }}
        />
        <div
          className="absolute -top-36 -right-36 w-110 h-110 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #97A977 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-160 h-80 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #839762 0%, transparent 75%)" }}
        />

        {/* Luminous Ivory Center Halo Behind Typography to Guarantee 100% Crisp Reading */}
        <div
          className="absolute inset-x-4 top-2 bottom-2 mx-auto max-w-xl rounded-full opacity-80 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #FDFCF9 0%, #F7F5EE 58%, transparent 100%)",
          }}
        />

        {/* Delicate Outer Architectural Frame with Gold Leaf Filigree Corners */}
        <div className="absolute inset-3 sm:inset-5 border border-[#4A5D27]/20 rounded-xs pointer-events-none">
          <div className="absolute inset-1.5 border border-[#C59B47]/30 rounded-xs" />
        </div>

        {/* TOP-LEFT DELICATE CORNER BOTANICAL GARLAND (Strictly hugging the outer edge, never crossing text) */}
        <svg
          viewBox="0 0 220 220"
          className="absolute top-0 left-0 w-28 sm:w-40 md:w-48 h-auto opacity-85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Corner hugging stem */}
          <path
            d="M0 155 C12 95, 45 42, 145 4"
            stroke="#4A5D27"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M0 110 C22 72, 65 32, 110 0"
            stroke="#C59B47"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* Olive leaves along the top-left perimeter */}
          <g fill="#4E602C" opacity="0.78">
            <path d="M16 112 C4 95, 22 76, 36 90 C38 104, 24 114, 16 112 Z" />
            <path d="M36 74 C24 55, 46 38, 60 54 C62 68, 46 76, 36 74 Z" />
            <path d="M68 42 C58 24, 82 10, 96 26 C96 40, 78 46, 68 42 Z" />
            <path d="M108 20 C102 6, 124 -2, 134 12 C132 24, 116 26, 108 20 Z" />
          </g>
          {/* Soft sage secondary leaves */}
          <g fill="#7A8E5D" opacity="0.6">
            <ellipse cx="22" cy="134" rx="14" ry="7" transform="rotate(-65 22 134)" />
            <ellipse cx="52" cy="60" rx="15" ry="7.5" transform="rotate(-42 52 60)" />
            <ellipse cx="92" cy="30" rx="14" ry="7" transform="rotate(-22 92 30)" />
          </g>
          {/* Golden berries & corner jasmine bloom */}
          <circle cx="44" cy="84" r="3.5" fill="#C59B47" />
          <circle cx="82" cy="46" r="3.5" fill="#C59B47" />
          <g transform="translate(32, 32)">
            <circle cx="12" cy="12" r="9" fill="#FFFFFF" stroke="#DED6C6" strokeWidth="0.9" />
            <circle cx="12" cy="12" r="3.2" fill="#E7C97B" />
          </g>
        </svg>

        {/* TOP-RIGHT DELICATE CORNER BOTANICAL GARLAND */}
        <svg
          viewBox="0 0 220 220"
          className="absolute top-0 right-0 w-28 sm:w-40 md:w-48 h-auto opacity-85 scale-x-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 155 C12 95, 45 42, 145 4"
            stroke="#4A5D27"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M0 110 C22 72, 65 32, 110 0"
            stroke="#C59B47"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.55"
          />
          <g fill="#4E602C" opacity="0.78">
            <path d="M16 112 C4 95, 22 76, 36 90 C38 104, 24 114, 16 112 Z" />
            <path d="M36 74 C24 55, 46 38, 60 54 C62 68, 46 76, 36 74 Z" />
            <path d="M68 42 C58 24, 82 10, 96 26 C96 40, 78 46, 68 42 Z" />
            <path d="M108 20 C102 6, 124 -2, 134 12 C132 24, 116 26, 108 20 Z" />
          </g>
          <g fill="#7A8E5D" opacity="0.6">
            <ellipse cx="22" cy="134" rx="14" ry="7" transform="rotate(-65 22 134)" />
            <ellipse cx="52" cy="60" rx="15" ry="7.5" transform="rotate(-42 52 60)" />
            <ellipse cx="92" cy="30" rx="14" ry="7" transform="rotate(-22 92 30)" />
          </g>
          <circle cx="44" cy="84" r="3.5" fill="#C59B47" />
          <circle cx="82" cy="46" r="3.5" fill="#C59B47" />
          <g transform="translate(32, 32)">
            <circle cx="12" cy="12" r="9" fill="#FFFFFF" stroke="#DED6C6" strokeWidth="0.9" />
            <circle cx="12" cy="12" r="3.2" fill="#E7C97B" />
          </g>
        </svg>

        {/* BOTTOM-LEFT DELICATE CORNER BOTANICAL GARLAND */}
        <svg
          viewBox="0 0 220 220"
          className="absolute bottom-0 left-0 w-28 sm:w-40 md:w-48 h-auto opacity-85 scale-y-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 155 C12 95, 45 42, 145 4"
            stroke="#4A5D27"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          <g fill="#4E602C" opacity="0.78">
            <path d="M16 112 C4 95, 22 76, 36 90 C38 104, 24 114, 16 112 Z" />
            <path d="M36 74 C24 55, 46 38, 60 54 C62 68, 46 76, 36 74 Z" />
            <path d="M68 42 C58 24, 82 10, 96 26 C96 40, 78 46, 68 42 Z" />
          </g>
          <g fill="#7A8E5D" opacity="0.6">
            <ellipse cx="22" cy="134" rx="14" ry="7" transform="rotate(-65 22 134)" />
            <ellipse cx="52" cy="60" rx="15" ry="7.5" transform="rotate(-42 52 60)" />
          </g>
          <circle cx="44" cy="84" r="3.5" fill="#C59B47" />
          <circle cx="82" cy="46" r="3.5" fill="#C59B47" />
        </svg>

        {/* BOTTOM-RIGHT DELICATE CORNER BOTANICAL GARLAND */}
        <svg
          viewBox="0 0 220 220"
          className="absolute bottom-0 right-0 w-28 sm:w-40 md:w-48 h-auto opacity-85 scale-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 155 C12 95, 45 42, 145 4"
            stroke="#4A5D27"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          <g fill="#4E602C" opacity="0.78">
            <path d="M16 112 C4 95, 22 76, 36 90 C38 104, 24 114, 16 112 Z" />
            <path d="M36 74 C24 55, 46 38, 60 54 C62 68, 46 76, 36 74 Z" />
            <path d="M68 42 C58 24, 82 10, 96 26 C96 40, 78 46, 68 42 Z" />
          </g>
          <g fill="#7A8E5D" opacity="0.6">
            <ellipse cx="22" cy="134" rx="14" ry="7" transform="rotate(-65 22 134)" />
            <ellipse cx="52" cy="60" rx="15" ry="7.5" transform="rotate(-42 52 60)" />
          </g>
          <circle cx="44" cy="84" r="3.5" fill="#C59B47" />
          <circle cx="82" cy="46" r="3.5" fill="#C59B47" />
        </svg>
      </div>

      {/* TOP HEADER - Crystal Clear & Unobstructed */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: "easeOut" }}
        className="relative z-20 text-center mt-4 sm:mt-6 px-6 max-w-xl mx-auto"
      >
        <p className="font-serif text-xs sm:text-sm md:text-base text-[#3A4A1E] tracking-[0.22em] uppercase font-bold leading-relaxed">
          El día más importante de nuestras vidas ha llegado
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-[0.22em] text-[#141C0A] mt-2 font-extrabold uppercase">
          ¡NOS CASAMOS!
        </h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="w-12 sm:w-20 h-px bg-[#4A5D27]/45" />
          <span className="w-2 h-2 rounded-full bg-[#C59B47]" />
          <span className="w-12 sm:w-20 h-px bg-[#4A5D27]/45" />
        </div>
      </motion.div>

      {/* CENTER INTERACTIVE SMOOTH MATTE LUXURY ENVELOPE (Zero Squares / Grid Pattern) */}
      <div className="relative z-30 w-full max-w-100 sm:max-w-120 md:max-w-130 my-auto flex flex-col items-center">
        <div
          className={`relative w-full transition-transform duration-700 ease-out ${
            stage === "opened" ? "translate-y-16 sm:translate-y-20 scale-[1.02]" : "hover:scale-[1.015]"
          }`}
          style={{ aspectRatio: "4 / 2.75", filter: "url(#realistic-envelope-shadow)" }}
        >
          {/* 1. SMOOTH INTERIOR LINING OF THE ENVELOPE (Deep inner pocket visible at the top V opening) */}
          <div
            className="absolute inset-0 rounded-md overflow-hidden z-0"
            style={{
              background: "linear-gradient(180deg, #2A3513 0%, #1C240B 100%)",
              boxShadow: "inset 0 10px 26px rgba(0, 0, 0, 0.65)",
            }}
          >
            {/* Subtle gold interior trim along the top inner lip */}
            <div className="absolute top-2 inset-x-3 h-px bg-[#C59B47]/35" />
          </div>

          {/* 2. OPEN FLAP (Folded upwards when opened - Smooth Matte Finish) */}
          <AnimatePresence>
            {stage !== "closed" && (
              <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{
                  transformOrigin: "bottom center",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  background: "linear-gradient(180deg, #5A6E36 0%, #48582B 68%, #323E1C 100%)",
                }}
                className="absolute -top-[55%] left-0 w-full h-[56%] z-0"
              />
            )}
          </AnimatePresence>

          {/* 3. CARDS EMERGING FROM INSIDE THE POCKET (Between z-0 interior and z-20 front pocket flaps) */}
          <AnimatePresence>
            {stage !== "closed" && (
              <>
                {/* Left Pass Card: RESERVADO PARA */}
                <motion.div
                  initial={{ y: 40, rotate: 0, opacity: 0 }}
                  animate={{ y: -88, rotate: -7, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.75, ease: "easeOut" }}
                  onClick={handleEnterInvitation}
                  style={{ aspectRatio: "3 / 4.1" }}
                  className="absolute left-3 sm:left-5 top-3 w-[51%] bg-[#FAF8F5] p-2.5 sm:p-3.5 shadow-[0_-8px_28px_rgba(12,18,5,0.38)] cursor-pointer z-10 rounded-xs border border-[#3B4920]/40"
                >
                  <div className="w-full h-full border-2 border-[#3B4920]/70 flex flex-col items-center justify-start pt-3 sm:pt-4 px-2.5 pb-8 text-center bg-[#FAF8F5]">
                    <span className="font-serif text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#3B4920] font-bold">
                      RESERVADO PARA
                    </span>
                    <div className="w-8 h-0.5 bg-[#C59B47] my-1.5 sm:my-2" />

                    <p className="font-serif text-sm sm:text-base md:text-lg font-extrabold text-[#141C0A] leading-snug line-clamp-2 my-1">
                      {guestName || "Invitado Especial"}
                    </p>

                    <div className="w-full pt-1.5 mt-1 border-t border-[#3B4920]/30">
                      <span className="font-serif text-[11px] sm:text-xs text-[#4E612B] font-bold tracking-wide">
                        {passesLabel}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Polaroid Photo Card */}
                <motion.div
                  initial={{ y: 40, rotate: 0, opacity: 0 }}
                  animate={{ y: -80, rotate: 6, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.75, ease: "easeOut" }}
                  onClick={handleEnterInvitation}
                  style={{ aspectRatio: "3 / 3.8" }}
                  className="absolute right-3 sm:right-5 top-3 w-[49%] bg-white p-2 sm:p-2.5 pb-6 sm:pb-7 shadow-[0_-8px_28px_rgba(12,18,5,0.38)] cursor-pointer z-10 rounded-xs border border-black/10"
                >
                  <div className="w-full h-full overflow-hidden bg-[#E8ECE2] rounded-xs shadow-inner">
                    <img
                      src="/FOTOS/DSC02866.JPG.jpeg"
                      alt="David & Thalia"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* 4. ENVELOPE FRONT POCKET FLAPS (Left, Right & Bottom triangles only — Open V at top so cards emerge from inside!) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-md">
            {/* Left smooth triangular fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 52% 54%, 0 100%)",
                background: "linear-gradient(135deg, #61763B 0%, #526430 55%, #435325 100%)",
                filter: "drop-shadow(4px 2px 6px rgba(10, 15, 4, 0.42))",
              }}
            />

            {/* Right smooth triangular fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(100% 0, 48% 54%, 100% 100%)",
                background: "linear-gradient(225deg, #5C7037 0%, #4E602D 55%, #3E4E22 100%)",
                filter: "drop-shadow(-4px 2px 6px rgba(10, 15, 4, 0.42))",
              }}
            />

            {/* Bottom smooth triangular pocket fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 100%, 50% 46%, 100% 100%)",
                background: "linear-gradient(0deg, #445525 0%, #536630 50%, #63783C 100%)",
                filter: "drop-shadow(0 -5px 8px rgba(10, 15, 4, 0.45))",
              }}
            />

            {/* Crisp V-Pocket & Bottom Fold Bevel Lines */}
            <svg viewBox="0 0 400 275" className="absolute inset-0 w-full h-full">
              {/* Left & right V-mouth edges where the cards slide out */}
              <line x1="0" y1="0" x2="200" y2="144" stroke="#89A455" strokeWidth="1.3" opacity="0.55" />
              <line x1="400" y1="0" x2="200" y2="144" stroke="#7E984D" strokeWidth="1.3" opacity="0.45" />
              {/* Bottom triangle edges */}
              <line x1="0" y1="275" x2="200" y2="126" stroke="#8CA858" strokeWidth="1.3" opacity="0.55" />
              <line x1="400" y1="275" x2="200" y2="126" stroke="#283412" strokeWidth="1.5" opacity="0.5" />
            </svg>
          </div>

          {/* 5. CLOSED TOP FLAP + REALISTIC GOLD WAX SEAL (Stage: closed) */}
          <AnimatePresence>
            {stage === "closed" && (
              <motion.div
                key="closed-flap"
                initial={{ rotateX: 0 }}
                exit={{ rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
                onClick={handleOpenFlap}
                className="absolute inset-0 z-30 cursor-pointer"
              >
                {/* Smooth Matte Triangular Top Flap */}
                <div
                  className="absolute top-0 left-0 w-full h-[64%]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #6A8042 0%, #586B35 58%, #475829 100%)",
                    boxShadow: "0 14px 26px rgba(12, 18, 5, 0.5)",
                  }}
                />

                {/* Smooth Flap Bevel Edge */}
                <svg viewBox="0 0 400 275" className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="0" y1="0" x2="200" y2="176" stroke="#9AB764" strokeWidth="1.5" opacity="0.6" />
                  <line x1="400" y1="0" x2="200" y2="176" stroke="#243010" strokeWidth="1.8" opacity="0.5" />
                </svg>

                {/* Soft Flap Contact Shadow */}
                <div
                  className="absolute top-[62%] left-1/2 -translate-x-1/2 w-[68%] h-6 opacity-45 pointer-events-none blur-sm"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(10,15,4,0.85) 0%, transparent 75%)",
                  }}
                />

                {/* "Toca aquí para abrir" Badge + Gold Wax Seal */}
                <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="flex items-center gap-2 mb-3 bg-[#1E280E]/85 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#E7C97B]/55 shadow-lg whitespace-nowrap"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E7C97B] animate-ping" />
                    <span className="font-serif text-xs sm:text-sm text-white font-semibold tracking-wider">
                      Toca aquí para abrir
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E7C97B]" />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>
                    <WaxSeal text="D&T" size="lg" className="shadow-[0_12px_28px_rgba(0,0,0,0.48)]" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 6. CIRCULAR "VER INVITACIÓN COMPLETA" BUTTON (Stage: opened) */}
          <AnimatePresence>
            {stage === "opened" && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleEnterInvitation}
                className="absolute -bottom-8 -right-2 sm:-right-6 z-40 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FAF8F5] shadow-[0_16px_36px_rgba(20,28,9,0.45)] p-1.5 flex items-center justify-center cursor-pointer border-2 border-[#C59B47]"
              >
                <motion.span
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="w-full h-full rounded-full border border-[#4A5D27] flex flex-col items-center justify-center text-center px-2 bg-linear-to-b from-[#FAF8F5] to-[#EFECE3]"
                >
                  <span className="font-serif text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#141C0A] font-extrabold leading-tight">
                    VER INVITACIÓN
                    <br />
                    COMPLETA
                  </span>
                  <span className="text-xs text-[#C59B47] mt-1 font-sans">✦</span>
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* COUPLE NAMES & SINGLE-LINE DATE UNDER THE ENVELOPE (100% Unobstructed) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.85 }}
          className={`text-center transition-all duration-700 px-4 ${
            stage === "opened" ? "mt-24 sm:mt-28" : "mt-10 sm:mt-12"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.24em] text-[#141C0A] uppercase font-extrabold">
            DAVID & THALIA
          </h2>
          <div className="inline-flex items-center justify-center gap-3 mt-2.5 px-5 py-1 rounded-full bg-[#FAF8F5]/80 border border-[#C59B47]/40 shadow-2xs">
            <span className="font-serif text-sm sm:text-base md:text-lg text-[#3B4920] font-extrabold tracking-[0.2em] whitespace-nowrap">
              15 - NOV - 2026
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom spacer */}
      <div className="h-2 sm:h-4" />
    </motion.div>
  );
}
