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
    <section className="pb-16 pt-4 bg-[#F7F5F0] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto text-center border-y border-[#3B4920]/20 py-8"
      >
        <p className="font-serif text-xs sm:text-sm text-[#3B4920]/80 tracking-[0.18em] uppercase mb-5">
          Celebraremos el capítulo más hermoso en:
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs mx-auto">
          {timeBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl sm:text-5xl font-serif text-[#2C3325] tracking-wider leading-none">
                {block.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-serif text-[#2C3325]/70">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
