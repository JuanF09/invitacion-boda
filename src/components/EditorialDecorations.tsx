"use client";

import React from "react";

export function WaxSeal({
  text = "D&T",
  size = "md",
  className = "",
}: {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimensions = {
    sm: "w-11 h-11 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-16 h-16 text-base",
  }[size];

  return (
    <div
      className={`relative rounded-full flex items-center justify-center select-none ${dimensions} ${className}`}
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #E7C97B 0%, #C69B43 45%, #9B7120 82%, #7D5812 100%)",
        boxShadow:
          "0 6px 14px rgba(59, 43, 12, 0.35), inset 0 2px 4px rgba(255, 245, 210, 0.65), inset 0 -3px 6px rgba(82, 54, 8, 0.7)",
      }}
    >
      {/* Irregular wax outer rim */}
      <div
        className="absolute inset-1 rounded-full border border-[#F3DFA2]/50"
        style={{
          boxShadow: "inset 0 2px 5px rgba(70, 46, 7, 0.65), 0 1px 2px rgba(255, 243, 201, 0.5)",
        }}
      />
      {/* Inner recessed stamp ring */}
      <div
        className="w-[74%] h-[74%] rounded-full border border-[#7D5812]/50 flex flex-col items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, #C89E46 0%, #A97E29 70%, #8F6719 100%)",
          boxShadow: "inset 0 2px 4px rgba(60, 38, 4, 0.55)",
        }}
      >
        {/* Small botanical sprig + monogram */}
        <svg viewBox="0 0 40 40" className="w-full h-full p-1.5 text-[#583D09]/80">
          <path
            d="M20 7 C18 12, 15 15, 13 19 M20 7 C22 12, 25 15, 27 19"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.45"
          />
          <text
            x="20"
            y="24"
            textAnchor="middle"
            className="font-serif italic font-semibold fill-[#4E3407]"
            style={{ fontSize: text.length > 3 ? "8px" : "11px", letterSpacing: "0.04em" }}
          >
            {text}
          </text>
          <path
            d="M12 29 Q20 33 28 29"
            stroke="currentColor"
            strokeWidth="0.9"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}

export function FloralCorner({
  position = "top-right",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const rotation = {
    "top-right": "top-0 right-0 rotate-0",
    "bottom-right": "bottom-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 rotate-180",
    "top-left": "top-0 left-0 -rotate-90",
  }[position];

  return (
    <div className={`pointer-events-none absolute z-10 w-28 h-28 sm:w-32 sm:h-32 ${rotation} ${className}`}>
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Olive & Eucalyptus Leaves */}
        <path
          d="M72 18 C52 14, 34 20, 18 30 C35 28, 52 26, 72 18 Z"
          fill="#6E8249"
          fillOpacity="0.55"
        />
        <path
          d="M65 28 C44 28, 28 38, 12 52 C32 45, 48 38, 65 28 Z"
          fill="#526330"
          fillOpacity="0.65"
        />
        <path
          d="M122 68 C126 88, 120 106, 110 122 C112 105, 114 88, 122 68 Z"
          fill="#6E8249"
          fillOpacity="0.55"
        />
        <path
          d="M112 75 C112 96, 102 112, 88 128 C95 108, 102 92, 112 75 Z"
          fill="#526330"
          fillOpacity="0.65"
        />
        <path
          d="M84 48 C68 58, 56 72, 46 88 C62 76, 74 64, 84 48 Z"
          fill="#8A9A68"
          fillOpacity="0.45"
        />
        {/* Delicate Stems */}
        <path
          d="M125 15 Q85 25 35 42 M125 15 Q115 55 98 105"
          stroke="#4A5A2B"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Small Leaf Pairs */}
        <ellipse cx="52" cy="22" rx="10" ry="4.5" transform="rotate(-18 52 22)" fill="#5E7138" fillOpacity="0.6" />
        <ellipse cx="34" cy="28" rx="8" ry="3.8" transform="rotate(-25 34 28)" fill="#788B52" fillOpacity="0.5" />
        <ellipse cx="118" cy="88" rx="4.5" ry="10" transform="rotate(18 118 88)" fill="#5E7138" fillOpacity="0.6" />
        <ellipse cx="112" cy="106" rx="3.8" ry="8" transform="rotate(25 112 106)" fill="#788B52" fillOpacity="0.5" />

        {/* White Rose 1 (Main Corner Bloom) */}
        <g transform="translate(82, 16)">
          <circle cx="22" cy="22" r="20" fill="#FFFFFF" stroke="#E5E0D5" strokeWidth="1" />
          <circle cx="20" cy="20" r="15" fill="#FAF8F5" stroke="#DED8CA" strokeWidth="0.9" />
          <path
            d="M12 18 C16 10, 28 10, 30 19 C31 27, 20 32, 14 25 C10 20, 16 14, 22 15 C26 16, 26 22, 21 23"
            stroke="#D5CBB8"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="21" cy="19" r="3.5" fill="#EFE7D6" />
        </g>

        {/* White Rose 2 (Left Secondary Bloom) */}
        <g transform="translate(52, 10)">
          <circle cx="15" cy="15" r="13" fill="#FFFFFF" stroke="#E5E0D5" strokeWidth="0.9" />
          <path
            d="M9 14 C12 8, 20 8, 21 15 C22 20, 14 23, 10 18 C8 14, 13 11, 16 13"
            stroke="#D5CBB8"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="15" cy="15" r="2.5" fill="#EFE7D6" />
        </g>

        {/* White Rose 3 (Bottom Right Secondary Bloom) */}
        <g transform="translate(96, 48)">
          <circle cx="15" cy="15" r="13" fill="#FFFFFF" stroke="#E5E0D5" strokeWidth="0.9" />
          <path
            d="M9 14 C12 8, 20 8, 21 15 C22 20, 14 23, 10 18 C8 14, 13 11, 16 13"
            stroke="#D5CBB8"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="15" cy="15" r="2.5" fill="#EFE7D6" />
        </g>

        {/* White Buds / Baby's Breath */}
        <circle cx="44" cy="36" r="4" fill="#FFFFFF" stroke="#DCD5C7" strokeWidth="0.8" />
        <circle cx="32" cy="42" r="2.8" fill="#FFFFFF" stroke="#DCD5C7" strokeWidth="0.8" />
        <circle cx="75" cy="44" r="5" fill="#FFFFFF" stroke="#DCD5C7" strokeWidth="0.8" />
        <circle cx="102" cy="84" r="4" fill="#FFFFFF" stroke="#DCD5C7" strokeWidth="0.8" />
        <circle cx="96" cy="96" r="2.8" fill="#FFFFFF" stroke="#DCD5C7" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function DressCodeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-36 h-44 mx-auto text-[#3B4920] ${className}`}
    >
      {/* Bride (Left - Long Dress) */}
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Head & Hair */}
        <circle cx="62" cy="34" r="9" />
        <path d="M54 31 C51 36, 52 44, 56 47" />
        <path d="M70 31 C73 36, 72 44, 68 47" />
        {/* Neck & Shoulders */}
        <path d="M59 43 L59 48 M65 43 L65 48" />
        <path d="M47 54 C52 49, 72 49, 77 54" />
        {/* Bodice */}
        <path d="M51 54 L54 84 L70 84 L73 54" />
        <path d="M51 58 Q62 65 73 58" />
        {/* Waist */}
        <path d="M54 84 L70 84" strokeWidth="1.6" />
        {/* Flowing Long Skirt */}
        <path d="M54 84 C44 118, 34 156, 28 190 L92 190 C86 156, 78 118, 70 84" />
        {/* Skirt Drapes */}
        <path d="M58 84 C53 122, 47 158, 43 190" opacity="0.6" />
        <path d="M62 84 C62 122, 62 158, 61 190" opacity="0.6" />
        <path d="M66 84 C71 122, 76 158, 79 190" opacity="0.6" />
        {/* Arms */}
        <path d="M49 54 C44 68, 44 82, 48 94" />
        <path d="M75 54 C80 68, 84 78, 92 84" />
      </g>

      {/* Groom (Right - Formal Suit) */}
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="118" cy="28" r="9.5" />
        {/* Neck & Collar */}
        <path d="M114 38 L114 44 M122 38 L122 44" />
        {/* Suit Shoulders & Jacket */}
        <path d="M96 50 C104 44, 132 44, 140 50" />
        <path d="M96 50 L92 102 L101 102 L103 112 L133 112 L135 102 L144 102 L140 50" />
        {/* Lapels & Tie */}
        <path d="M111 44 L118 76 L125 44" />
        <path d="M107 46 L118 78 L129 46" opacity="0.7" />
        <path d="M118 46 L116 66 L118 72 L120 66 Z" fill="currentColor" fillOpacity="0.2" />
        {/* Jacket Center Line & Pocket Square */}
        <path d="M118 76 L118 112" />
        <path d="M126 62 L133 62 L131 58 Z" />
        {/* Trousers */}
        <path d="M104 112 L106 184 L116 184 L118 130 L120 184 L130 184 L132 112" />
        {/* Shoes */}
        <path d="M106 184 L102 190 L115 190 L116 184" />
        <path d="M120 184 L121 190 L134 190 L130 184" />
      </g>
    </svg>
  );
}

export function EditorialCard({
  children,
  hasTopSeal = false,
  sealText = "D&T",
  topRightFlower = true,
  bottomLeftFlower = true,
  bottomRightFlower = false,
  topLeftFlower = false,
  className = "",
}: {
  children: React.ReactNode;
  hasTopSeal?: boolean;
  sealText?: string;
  topRightFlower?: boolean;
  bottomLeftFlower?: boolean;
  bottomRightFlower?: boolean;
  topLeftFlower?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-[#FAF9F5] shadow-[0_12px_35px_rgba(44,51,37,0.1)] p-3 sm:p-4 max-w-md mx-auto w-full ${className}`}
    >
      {hasTopSeal && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30">
          <WaxSeal text={sealText} size="md" />
        </div>
      )}

      {topRightFlower && <FloralCorner position="top-right" />}
      {bottomLeftFlower && <FloralCorner position="bottom-left" />}
      {bottomRightFlower && <FloralCorner position="bottom-right" />}
      {topLeftFlower && <FloralCorner position="top-left" />}

      {/* Fine inner architectural frame */}
      <div className="relative z-20 border border-[#3B4920]/45 px-6 py-10 sm:px-8 sm:py-12 text-center">
        {children}
      </div>
    </div>
  );
}

