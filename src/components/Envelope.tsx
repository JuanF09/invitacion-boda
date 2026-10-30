"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WaxSeal } from "./EditorialDecorations";
import { Sparkles } from "lucide-react";

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

  const passesLabel = guestPasses === 1 ? "1 pase personal" : `${guestPasses} pases reservados`;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "exiting" ? 0 : 1, scale: stage === "exiting" ? 1.04 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-6 sm:py-8 px-4 overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg, #F5F3EC 0%, #ECE9DF 40%, #E3E1D4 75%, #D7D5C5 100%)",
      }}
    >
      {/* SVG Paper Texture & Realistic Depth Filter Definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="paper-grain-realistic" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.25   0 0 0 0 0.32   0 0 0 0 0.15  0 0 0 0.12 0" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
        <filter id="realistic-envelope-shadow" x="-15%" y="-15%" width="130%" height="145%">
          <feDropShadow dx="0" dy="28" stdDeviation="30" floodColor="#121A08" floodOpacity="0.45" />
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#121A08" floodOpacity="0.25" />
        </filter>
      </svg>

      {/* LUXURY BOTANICAL WATERCOLOR SCENERY (Lush Olive & Eucalyptus Greenery - NO MOUNTAINS) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Soft atmospheric ambient light watercolor washes */}
        <div
          className="absolute -top-32 -left-32 w-120 h-120 rounded-full opacity-35 blur-3xl"
          style={{ background: "radial-gradient(circle, #7D925A 0%, transparent 70%)" }}
        />
        <div
          className="absolute -top-32 -right-32 w-120 h-120 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #97A977 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-180 h-95 rounded-full opacity-35 blur-3xl"
          style={{ background: "radial-gradient(circle, #839762 0%, #A4B58A 50%, transparent 80%)" }}
        />

        {/* TOP-LEFT BOTANICAL WATERCOLOR OLIVE & EUCALYPTUS BRANCH */}
        <svg
          viewBox="0 0 360 360"
          className="absolute -top-6 -left-6 w-60 sm:w-84 md:w-96 h-auto opacity-85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Arched Stem */}
          <path d="M-20 -20 Q140 40 190 200 T240 330" stroke="#3D4B22" strokeWidth="2.8" strokeLinecap="round" opacity="0.65" />
          <path d="M-10 60 Q80 120 140 240" stroke="#4F602F" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          {/* Deep Olive Leaves */}
          <g fill="#4E602C" opacity="0.8">
            <path d="M70 45 C45 15, 100 5, 125 35 C130 55, 95 60, 70 45 Z" />
            <path d="M135 75 C115 50, 165 30, 190 65 C195 90, 155 95, 135 75 Z" />
            <path d="M165 150 C140 130, 185 100, 220 130 C235 155, 195 170, 165 150 Z" />
            <path d="M195 225 C175 200, 225 180, 250 215 C260 240, 220 250, 195 225 Z" />
            <path d="M45 100 C25 80, 70 60, 90 90 C100 115, 60 120, 45 100 Z" />
            <path d="M100 175 C80 150, 130 135, 150 165 C160 190, 120 195, 100 175 Z" />
          </g>
          {/* Soft Sage Eucalyptus Rounded Leaves */}
          <g fill="#7A8E5D" opacity="0.65">
            <ellipse cx="100" cy="65" rx="24" ry="15" transform="rotate(-30 100 65)" />
            <ellipse cx="165" cy="115" rx="26" ry="17" transform="rotate(-25 165 115)" />
            <ellipse cx="205" cy="185" rx="28" ry="19" transform="rotate(-35 205 185)" />
            <ellipse cx="75" cy="140" rx="22" ry="14" transform="rotate(20 75 140)" />
          </g>
          {/* Golden Olive Berries */}
          <circle cx="115" cy="95" r="5" fill="#C59B47" opacity="0.9" />
          <circle cx="180" cy="165" r="5" fill="#C59B47" opacity="0.9" />
          <circle cx="145" cy="215" r="4.5" fill="#C59B47" opacity="0.9" />
          {/* Delicate White Jasmine Flowers */}
          <g transform="translate(140, 85)" fill="#FFFFFF" stroke="#D7D0C0" strokeWidth="0.8">
            <circle cx="10" cy="10" r="4.5" fill="#FBF9F4" />
            <ellipse cx="10" cy="4" rx="3.5" ry="5.5" />
            <ellipse cx="10" cy="16" rx="3.5" ry="5.5" />
            <ellipse cx="4" cy="10" rx="5.5" ry="3.5" />
            <ellipse cx="16" cy="10" rx="5.5" ry="3.5" />
            <circle cx="10" cy="10" r="2" fill="#E7C97B" />
          </g>
        </svg>

        {/* TOP-RIGHT BOTANICAL WATERCOLOR OLIVE & EUCALYPTUS BRANCH */}
        <svg
          viewBox="0 0 360 360"
          className="absolute -top-6 -right-6 w-60 sm:w-84 md:w-96 h-auto opacity-85 scale-x-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-20 -20 Q140 40 190 200 T240 330" stroke="#3D4B22" strokeWidth="2.8" strokeLinecap="round" opacity="0.65" />
          <path d="M-10 60 Q80 120 140 240" stroke="#4F602F" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          <g fill="#4E602C" opacity="0.8">
            <path d="M70 45 C45 15, 100 5, 125 35 C130 55, 95 60, 70 45 Z" />
            <path d="M135 75 C115 50, 165 30, 190 65 C195 90, 155 95, 135 75 Z" />
            <path d="M165 150 C140 130, 185 100, 220 130 C235 155, 195 170, 165 150 Z" />
            <path d="M195 225 C175 200, 225 180, 250 215 C260 240, 220 250, 195 225 Z" />
          </g>
          <g fill="#7A8E5D" opacity="0.65">
            <ellipse cx="100" cy="65" rx="24" ry="15" transform="rotate(-30 100 65)" />
            <ellipse cx="165" cy="115" rx="26" ry="17" transform="rotate(-25 165 115)" />
            <ellipse cx="205" cy="185" rx="28" ry="19" transform="rotate(-35 205 185)" />
          </g>
          <circle cx="115" cy="95" r="5" fill="#C59B47" opacity="0.9" />
          <circle cx="180" cy="165" r="5" fill="#C59B47" opacity="0.9" />
          <g transform="translate(140, 85)" fill="#FFFFFF" stroke="#D7D0C0" strokeWidth="0.8">
            <circle cx="10" cy="10" r="4.5" fill="#FBF9F4" />
            <ellipse cx="10" cy="4" rx="3.5" ry="5.5" />
            <ellipse cx="10" cy="16" rx="3.5" ry="5.5" />
            <ellipse cx="4" cy="10" rx="5.5" ry="3.5" />
            <ellipse cx="16" cy="10" rx="5.5" ry="3.5" />
            <circle cx="10" cy="10" r="2" fill="#E7C97B" />
          </g>
        </svg>

        {/* BOTTOM-LEFT BOTANICAL WATERCOLOR BRANCH (Climbing up elegantly) */}
        <svg
          viewBox="0 0 360 360"
          className="absolute -bottom-8 -left-8 w-64 sm:w-88 md:w-104 h-auto opacity-80 scale-y-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-20 -20 Q130 50 180 190 T220 310" stroke="#3D4B22" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <g fill="#4E602C" opacity="0.75">
            <path d="M70 45 C45 15, 100 5, 125 35 C130 55, 95 60, 70 45 Z" />
            <path d="M135 75 C115 50, 165 30, 190 65 C195 90, 155 95, 135 75 Z" />
            <path d="M165 150 C140 130, 185 100, 220 130 C235 155, 195 170, 165 150 Z" />
          </g>
          <g fill="#7A8E5D" opacity="0.6">
            <ellipse cx="100" cy="65" rx="22" ry="14" transform="rotate(-30 100 65)" />
            <ellipse cx="165" cy="115" rx="24" ry="16" transform="rotate(-25 165 115)" />
          </g>
          <circle cx="115" cy="95" r="4.5" fill="#C59B47" opacity="0.9" />
          <circle cx="175" cy="155" r="4.5" fill="#C59B47" opacity="0.9" />
        </svg>

        {/* BOTTOM-RIGHT BOTANICAL WATERCOLOR BRANCH (Climbing up elegantly) */}
        <svg
          viewBox="0 0 360 360"
          className="absolute -bottom-8 -right-8 w-64 sm:w-88 md:w-104 h-auto opacity-80 scale-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-20 -20 Q130 50 180 190 T220 310" stroke="#3D4B22" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <g fill="#4E602C" opacity="0.75">
            <path d="M70 45 C45 15, 100 5, 125 35 C130 55, 95 60, 70 45 Z" />
            <path d="M135 75 C115 50, 165 30, 190 65 C195 90, 155 95, 135 75 Z" />
            <path d="M165 150 C140 130, 185 100, 220 130 C235 155, 195 170, 165 150 Z" />
          </g>
          <g fill="#7A8E5D" opacity="0.6">
            <ellipse cx="100" cy="65" rx="22" ry="14" transform="rotate(-30 100 65)" />
            <ellipse cx="165" cy="115" rx="24" ry="16" transform="rotate(-25 165 115)" />
          </g>
          <circle cx="115" cy="95" r="4.5" fill="#C59B47" opacity="0.9" />
          <circle cx="175" cy="155" r="4.5" fill="#C59B47" opacity="0.9" />
        </svg>

        {/* Floating Golden Dust / Ambient Sparks */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: "18%", left: "12%", delay: 0 },
            { top: "25%", left: "85%", delay: 1.2 },
            { top: "68%", left: "15%", delay: 0.7 },
            { top: "72%", left: "80%", delay: 1.8 },
            { top: "45%", left: "8%", delay: 2.1 },
            { top: "52%", left: "92%", delay: 1.5 },
          ].map((spark, idx) => (
            <motion.div
              key={idx}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8], y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: spark.delay }}
              style={{ top: spark.top, left: spark.left }}
              className="absolute w-2 h-2 rounded-full bg-[#E7C97B] shadow-[0_0_8px_#C59B47] blur-[0.5px]"
            />
          ))}
        </div>
      </div>

      {/* TOP HEADER - Magnificently Styled and Highly Legible */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: "easeOut" }}
        className="relative z-20 text-center mt-2 sm:mt-5 px-4"
      >
        <p className="font-serif text-sm sm:text-base md:text-lg text-[#253015] tracking-[0.2em] uppercase font-semibold leading-relaxed">
          El día más importante de nuestras vidas ha llegado
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-[0.25em] text-[#141C0A] mt-2 font-extrabold uppercase drop-shadow-sm">
          ¡NOS CASAMOS!
        </h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="w-12 sm:w-20 h-px bg-[#4A5D27]/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#C59B47] shadow-[0_0_6px_rgba(197,155,71,0.6)]" />
          <span className="w-12 sm:w-20 h-px bg-[#4A5D27]/50" />
        </div>
      </motion.div>

      {/* CENTER INTERACTIVE LUXURY OLIVE ENVELOPE (With Realism & Depth) */}
      <div className="relative z-30 w-full max-w-100 sm:max-w-120 md:max-w-130 my-auto flex flex-col items-center">
        <div
          className={`relative w-full transition-transform duration-700 ease-out ${
            stage === "opened" ? "translate-y-16 sm:translate-y-20 scale-[1.02]" : "hover:scale-[1.015]"
          }`}
          style={{ aspectRatio: "4 / 2.75", filter: "url(#realistic-envelope-shadow)" }}
        >
          {/* 1. BACK INTERIOR LINING OF THE ENVELOPE */}
          <div
            className="absolute inset-0 rounded-md overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #2D3915 0%, #222C0E 100%)",
              boxShadow: "inset 0 6px 20px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Interior Gold Filigree & Linen Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(#E7C97B 0.9px, transparent 0.9px), radial-gradient(#3D4B22 0.9px, #222C0E 0.9px)",
                backgroundSize: "14px 14px",
                backgroundPosition: "0 0, 7px 7px",
              }}
            />
          </div>

          {/* 2. OPEN FLAP (Folded upwards when opened) */}
          <AnimatePresence>
            {stage !== "closed" && (
              <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  transformOrigin: "bottom center",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  background: "linear-gradient(180deg, #576A36 0%, #46552B 70%, #34421E 100%)",
                }}
                className="absolute -top-[56%] left-0 w-full h-[57%] z-0"
              >
                <div className="absolute inset-0 border-t border-[#8DA365]/40 opacity-70" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. CARDS EMERGING FROM INSIDE (Stage: opened) */}
          <AnimatePresence>
            {stage !== "closed" && (
              <>
                {/* Left Pass Card: RESERVADO PARA */}
                <motion.div
                  initial={{ y: 50, rotate: 0, opacity: 0 }}
                  animate={{ y: -72, rotate: -7, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
                  onClick={handleEnterInvitation}
                  style={{ aspectRatio: "3 / 4.2" }}
                  className="absolute left-3 sm:left-5 top-2 w-[52%] bg-[#FAF8F5] p-3 sm:p-3.5 shadow-2xl cursor-pointer z-10 rounded-xs border border-[#3B4920]/40"
                >
                  <div className="w-full h-full border-2 border-[#3B4920]/70 flex flex-col items-center justify-between p-3 text-center bg-[#FAF8F5]">
                    <div className="flex flex-col items-center">
                      <span className="font-serif text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#3B4920] font-bold">
                        RESERVADO PARA
                      </span>
                      <div className="w-8 h-0.5 bg-[#C59B47] my-2" />
                    </div>

                    <p className="font-serif text-sm sm:text-base md:text-lg font-extrabold text-[#141C0A] leading-snug line-clamp-3">
                      {guestName || "Invitado Especial"}
                    </p>

                    <div className="w-full pt-2 border-t border-[#3B4920]/30">
                      <span className="font-serif text-xs sm:text-sm text-[#4E612B] font-bold tracking-wide">
                        {passesLabel}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Polaroid Photo Card */}
                <motion.div
                  initial={{ y: 50, rotate: 0, opacity: 0 }}
                  animate={{ y: -64, rotate: 6, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.75, ease: "easeOut" }}
                  onClick={handleEnterInvitation}
                  style={{ aspectRatio: "3 / 3.9" }}
                  className="absolute right-3 sm:right-5 top-2 w-[50%] bg-white p-2.5 pb-7 sm:pb-8 shadow-2xl cursor-pointer z-10 rounded-xs border border-black/10"
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

          {/* 4. ENVELOPE FRONT BODY (High-Realism 320gsm Textured Mediterranean Olive Cardstock) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-md">
            {/* Left triangular fold with realistic directional shadow and bevel */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 52% 52%, 0 100%)",
                background: "linear-gradient(135deg, #5B6F36 0%, #4D5E2D 60%, #3B4A21 100%)",
                filter: "drop-shadow(3px 0 4px rgba(15, 22, 6, 0.4))",
              }}
            />
            {/* Right triangular fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(100% 0, 48% 52%, 100% 100%)",
                background: "linear-gradient(225deg, #576932 0%, #4B5B2A 60%, #37451D 100%)",
                filter: "drop-shadow(-3px 0 4px rgba(15, 22, 6, 0.4))",
              }}
            />
            {/* Bottom triangular fold with upper paper ridge */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 100%, 50% 46%, 100% 100%)",
                background: "linear-gradient(0deg, #425222 0%, #4F612B 45%, #5D7135 100%)",
                filter: "drop-shadow(0 -3px 5px rgba(15, 22, 6, 0.45))",
              }}
            />

            {/* Tactile Cotton Rag Paper Texture Overlay */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(#FFFFFF 0.8px, transparent 0.8px), radial-gradient(#000000 0.8px, transparent 0.8px)",
                backgroundSize: "6px 6px",
                backgroundPosition: "0 0, 3px 3px",
              }}
            />

            {/* Fold Creases highlight and shadow lines */}
            <svg viewBox="0 0 400 275" className="absolute inset-0 w-full h-full">
              <line x1="0" y1="275" x2="200" y2="128" stroke="#87A353" strokeWidth="1.4" opacity="0.45" />
              <line x1="400" y1="275" x2="200" y2="128" stroke="#1F2A0B" strokeWidth="1.8" opacity="0.55" />
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
                {/* Triangular top flap */}
                <div
                  className="absolute top-0 left-0 w-full h-[65%]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #667D3E 0%, #546731 58%, #415124 100%)",
                    boxShadow: "0 14px 26px rgba(12, 18, 5, 0.55)",
                  }}
                />

                {/* Flap edge highlight / bevel */}
                <svg viewBox="0 0 400 275" className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Left flap ridge highlight */}
                  <line x1="0" y1="0" x2="200" y2="178" stroke="#97B45F" strokeWidth="1.8" opacity="0.65" />
                  {/* Right flap ridge shadow */}
                  <line x1="400" y1="0" x2="200" y2="178" stroke="#1F2A0B" strokeWidth="2.2" opacity="0.55" />
                </svg>

                {/* Flap contact shadow falling on the pocket below */}
                <div
                  className="absolute top-[64%] left-1/2 -translate-x-1/2 w-[72%] h-7 opacity-50 pointer-events-none blur-sm"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(10,15,4,0.9) 0%, transparent 75%)",
                  }}
                />

                {/* "Toca aquí para abrir" Calling Badge + Gold Wax Seal */}
                <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="flex items-center gap-2 mb-3 bg-[#1C260D]/80 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#E7C97B]/50 shadow-xl"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E7C97B] animate-ping" />
                    <span className="font-serif text-xs sm:text-sm text-white font-semibold tracking-wider">
                      Toca aquí para abrir
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E7C97B]" />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>
                    <WaxSeal text="D&T" size="lg" className="shadow-[0_12px_28px_rgba(0,0,0,0.5)]" />
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

        {/* COUPLE NAMES UNDER THE ENVELOPE (Large, High-Contrast & Prestigious) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.85 }}
          className={`text-center transition-all duration-700 ${
            stage === "opened" ? "mt-24 sm:mt-28" : "mt-10 sm:mt-12"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.28em] text-[#141C0A] uppercase font-extrabold drop-shadow-sm">
            DAVID & THALIA
          </h2>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#4A5D27] font-bold tracking-[0.22em] mt-1.5">
            15 · NOVIEMBRE · 2026
          </p>
        </motion.div>
      </div>

      {/* Bottom spacer */}
      <div className="h-2 sm:h-4" />
    </motion.div>
  );
}
