"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import confetti from "canvas-confetti";
import { X, CheckCircle2, Heart } from "lucide-react";
import { EditorialCard } from "./EditorialDecorations";
import type { GuestRecord } from "@/lib/defaultGuests";

export function parseGuestObservation(observation: string | null | undefined) {
  if (!observation) {
    return { baseCuposText: "Cupos: 1", maxPasses: 1, confirmedPasses: null as number | null, message: "" };
  }

  const parts = observation.split(" | ");
  const baseCuposText = parts[0] || "Cupos: 1";

  // Extract first number from "Cupos: 3" or "3"
  const match = baseCuposText.match(/(\d+)/);
  const maxPasses = match ? Math.max(1, parseInt(match[1], 10)) : 1;

  let confirmedPasses: number | null = null;
  let message = "";

  for (const part of parts.slice(1)) {
    if (part.startsWith("Confirmados:")) {
      const cMatch = part.match(/(\d+)/);
      if (cMatch) confirmedPasses = parseInt(cMatch[1], 10);
    } else if (part.startsWith("Mensaje:")) {
      message = part.replace("Mensaje:", "").trim();
    }
  }

  return { baseCuposText, maxPasses, confirmedPasses, message };
}

export default function RSVPForm({ guest }: { guest?: GuestRecord }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    guest?.status === "attending" || guest?.status === "declined" ? "success" : "idle"
  );
  const [attendance, setAttendance] = useState<"yes" | "no">(
    guest?.status === "declined" ? "no" : "yes"
  );
  const initialParsed = parseGuestObservation(guest?.observation);
  const [attendeeCount, setAttendeeCount] = useState<number>(
    initialParsed.confirmedPasses ?? initialParsed.maxPasses
  );
  const [attendeeNames, setAttendeeNames] = useState<string>(guest?.name || "");
  const [userMessage, setUserMessage] = useState<string>(initialParsed.message);
  const maxPasses = initialParsed.maxPasses;
  const baseCuposText = initialParsed.baseCuposText;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest || !guest.id) return;

    setStatus("submitting");

    const confirmedNum = attendance === "yes" ? attendeeCount : 0;
    const segments = [baseCuposText, `Confirmados: ${confirmedNum}`];
    if (userMessage.trim()) {
      segments.push(`Mensaje: ${userMessage.trim()}`);
    }
    const finalObservation = segments.join(" | ");

    const { error } = await supabase
      .from("guests")
      .update({
        status: attendance === "yes" ? "attending" : "declined",
        observation: finalObservation,
      })
      .eq("id", guest.id);

    if (error) {
      console.error("Error updating RSVP:", error);
      setStatus("idle");
      alert("Hubo un error al confirmar. Por favor intenta de nuevo.");
      return;
    }

    if (attendance === "yes") {
      const end = Date.now() + 2500;
      const colors = ["#526330", "#C59B47", "#FAF9F5"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }

    setStatus("success");
    setIsModalOpen(false);
  };

  const passOptions = Array.from({ length: maxPasses }, (_, i) => i + 1);

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5F0] px-4 overflow-hidden">
      <div className="max-w-lg mx-auto relative">
        {/* Main Editorial Confirmation Card (01:04 - 01:06 of video) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-6"
        >
          <EditorialCard
            hasTopSeal={true}
            sealText="D&T"
            topRightFlower={true}
            bottomLeftFlower={false}
            topLeftFlower={false}
            bottomRightFlower={false}
            className="pb-16 sm:pb-20"
          >
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#1E2614] uppercase mt-3 leading-snug font-semibold">
              CONFIRMACIÓN
              <br />
              DE ASISTENCIA
            </h2>

            <p className="font-serif text-base sm:text-lg text-[#232C17] mt-5 leading-relaxed max-w-sm mx-auto">
              Tu presencia hará este día aún más especial.
            </p>

            <p className="font-serif text-base sm:text-lg text-[#232C17] mt-3 leading-relaxed max-w-sm mx-auto">
              Agradecemos confirmar tu asistencia antes del{" "}
              <span className="font-bold text-[#3B4920] underline decoration-[#C59B47] underline-offset-4">
                06 de noviembre de 2026
              </span>
              .
            </p>

            <p className="font-script text-4xl sm:text-5xl text-[#526330] mt-4">¡Te esperamos!</p>

            {guest && (
              <div className="mt-5 py-2.5 px-5 bg-[#526330]/10 border border-[#526330]/30 rounded-xs inline-block shadow-xs">
                <p className="font-serif text-sm sm:text-base text-[#1E2614] font-bold">
                  {guest.name}
                </p>
                <p className="font-serif text-xs sm:text-sm text-[#455529] tracking-wider uppercase mt-1 font-semibold">
                  Pase válido para {maxPasses === 1 ? "1 persona" : `${maxPasses} personas`}
                </p>
              </div>
            )}

            {/* Status message if already confirmed */}
            {status === "success" && (
              <div className="mt-6 p-4 bg-[#EAF0E2] border border-[#526330]/40 rounded-xs max-w-sm mx-auto shadow-sm">
                <div className="flex items-center justify-center gap-2 text-[#34421C] font-serif text-base font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#526330]" />
                  <span>
                    {attendance === "yes"
                      ? `¡Asistencia confirmada (${attendeeCount} ${
                          attendeeCount === 1 ? "persona" : "personas"
                        })!`
                      : "Has indicado que no podrás asistir"}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-3.5 bg-linear-to-r from-[#526330] to-[#435226] hover:from-[#3D4B22] hover:to-[#323E1B] text-white font-serif text-sm sm:text-base tracking-[0.2em] uppercase rounded-xs shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer font-semibold border border-[#E7C97B]/40"
              >
                {status === "success" ? "MODIFICAR RESPUESTA" : "CONFIRMAR AQUÍ"}
              </button>
            </div>
          </EditorialCard>
        </motion.div>

        {/* Bottom Polaroid + Olive Oval Medallion "D & T" (01:05 - 01:22 of video) */}
        <div className="relative -mt-14 sm:-mt-16 z-30 flex items-center justify-between max-w-md mx-auto px-4 sm:px-6 pointer-events-none">
          {/* Left Tilted Polaroid */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: 20 }}
            whileInView={{ opacity: 1, rotate: -4, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-44 sm:w-52 bg-white p-2.5 pb-7 shadow-[0_16px_35px_rgba(0,0,0,0.18)] border border-black/5"
          >
            <div className="w-full aspect-square overflow-hidden bg-[#EBF0E4]">
              <img
                src="/FOTOS/DSC02866.JPG.jpeg"
                alt="David & Thalia"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
          </motion.div>

          {/* Right Vertical Olive Green Oval Medallion "D & T" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            viewport={{ once: true }}
            className="w-28 h-44 sm:w-32 sm:h-48 rounded-[999px] bg-[#526330] p-2 shadow-xl flex items-center justify-center mr-1 sm:mr-2"
          >
            <div className="w-full h-full rounded-[999px] border border-[#C59B47]/65 flex flex-col items-center justify-center text-[#FAF9F5] font-serif">
              <span className="text-xl sm:text-2xl tracking-widest">D</span>
              <span className="text-sm sm:text-base italic text-[#E7C97B] my-1">&</span>
              <span className="text-xl sm:text-2xl tracking-widest">T</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RSVP MODAL (Exact match to 01:07 - 01:17 of reference video) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-[#EAE8E1] p-3 sm:p-4 shadow-2xl rounded-xs"
            >
              {/* Top Decorative Circle */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#D8D4C8] border border-[#3B4920]/40 shadow-md flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#526330]" />
              </div>

              {/* Inner Architectural Frame */}
              <div className="border border-[#3B4920]/50 px-5 py-7 sm:px-7 sm:py-8">
                {/* Close button */}
                <div className="flex justify-center mb-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-[#2C3325]/60 hover:text-[#2C3325] transition-colors p-1 cursor-pointer"
                    aria-label="Cerrar formulario"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-serif text-lg sm:text-xl tracking-[0.16em] text-[#1E2614] uppercase mb-6 text-center font-bold">
                  CONFIRMACIÓN DE ASISTENCIA
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4 text-left font-serif">
                  {/* Nombre completo */}
                  <div>
                    <label className="block text-sm text-[#1E2614] font-medium mb-1.5">
                      Nombre completo de los asistentes:
                    </label>
                    <input
                      type="text"
                      value={attendeeNames}
                      onChange={(e) => setAttendeeNames(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#3B4920]/35 rounded-xs text-base text-[#1E2614] focus:outline-none focus:border-[#526330] focus:ring-1 focus:ring-[#526330]"
                    />
                  </div>

                  {/* ¿Podrás asistir al evento? */}
                  <div>
                    <label className="block text-sm text-[#1E2614] font-medium mb-1.5">
                      ¿Podrás asistir al evento?
                    </label>
                    <select
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value as "yes" | "no")}
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#3B4920]/35 rounded-xs text-base text-[#1E2614] focus:outline-none focus:border-[#526330] focus:ring-1 focus:ring-[#526330]"
                    >
                      <option value="yes">Sí asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {/* ¿Cuántas personas asistirán? */}
                  {attendance === "yes" && (
                    <div>
                      <label className="block text-sm text-[#1E2614] font-medium mb-1.5">
                        ¿Cuántas personas asistirán?
                      </label>
                      <select
                        value={attendeeCount}
                        onChange={(e) => setAttendeeCount(parseInt(e.target.value, 10))}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#3B4920]/35 rounded-xs text-base text-[#1E2614] focus:outline-none focus:border-[#526330] focus:ring-1 focus:ring-[#526330]"
                      >
                        {passOptions.map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "persona" : "personas"}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-[#526330] mt-1.5 font-medium italic">
                        * Tu invitación tiene reservados hasta {maxPasses}{" "}
                        {maxPasses === 1 ? "cupo" : "cupos"} (evento exclusivo para adultos).
                      </p>
                    </div>
                  )}

                  {/* Felicitaciones y buenos deseos */}
                  <div>
                    <label className="block text-sm text-[#1E2614] font-medium mb-1.5">
                      Déjanos tus felicitaciones y buenos deseos aquí:
                    </label>
                    <textarea
                      rows={3}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Escribe tu mensaje para David & Thalia..."
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#3B4920]/35 rounded-xs text-base text-[#1E2614] focus:outline-none focus:border-[#526330] focus:ring-1 focus:ring-[#526330] resize-none"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5 bg-linear-to-r from-[#526330] to-[#435226] hover:from-[#3D4B22] hover:to-[#323E1B] text-white font-serif text-sm sm:text-base tracking-[0.2em] uppercase rounded-xs shadow-md transition-colors disabled:opacity-50 cursor-pointer font-bold border border-[#E7C97B]/40"
                    >
                      {status === "submitting" ? "GUARDANDO..." : "CONFIRMAR ASISTENCIA"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
