"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  // Target Date: Sunday, November 15, 2026 16:00 (4:00 PM Colombia Time)
  const targetDate = new Date("2026-11-15T16:00:00-05:00").getTime();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    const initialTimeout = setTimeout(updateTimer, 0);
    const interval = setInterval(updateTimer, 1000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [targetDate]);

  if (!timeLeft) return null;

  const timeBlocks = [
    { label: "Días", value: String(timeLeft.days).padStart(2, "0") },
    { label: "Horas", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "Min", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "Seg", value: String(timeLeft.seconds).padStart(2, "0") },
  ];

  return (
    <section className="pb-20 pt-6 bg-[#F7F5F0] px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto text-center border-y-2 border-[#3B4920]/25 py-10 bg-[#FAF9F5]/60 shadow-xs"
      >
        <div className="flex items-center justify-center gap-2 mb-3 text-[#C59B47]">
          <span className="w-8 h-px bg-[#C59B47]" />
          <span className="text-xs">✦</span>
          <span className="w-8 h-px bg-[#C59B47]" />
        </div>

        <p className="font-serif text-sm sm:text-base text-[#38481E] tracking-[0.22em] uppercase mb-8 font-semibold">
          Celebraremos este gran día en:
        </p>

        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-sm mx-auto px-2">
          {timeBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#18220E] font-bold tracking-tight leading-none drop-shadow-xs">
                {block.value}
              </span>
              <span className="mt-3 text-xs sm:text-sm font-serif text-[#465727] font-semibold uppercase tracking-wider">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
