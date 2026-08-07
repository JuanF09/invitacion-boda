"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import confetti from "canvas-confetti";

export default function RSVPForm({ guest }: { guest?: any }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [attendance, setAttendance] = useState<string>("yes");
  const [userMessage, setUserMessage] = useState<string>("");
  const [originalObservation, setOriginalObservation] = useState<string>("");

  useEffect(() => {
    if (guest) {
      // Si ya había respondido, mostrar la vista de éxito
      if (guest.status === "attending" || guest.status === "declined") {
        setStatus("success");
        setAttendance(guest.status === "attending" ? "yes" : "no");
      }

      if (guest.observation) {
        // Si la base de datos ya tiene un mensaje agregado antes, separamos
        if (guest.observation.includes(" | Mensaje: ")) {
          const parts = guest.observation.split(" | Mensaje: ");
          setOriginalObservation(parts[0]);
          setUserMessage(parts[1] || "");
        } else {
          setOriginalObservation(guest.observation);
        }
      }
    }
  }, [guest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest || !guest.id) return;
    
    setStatus("submitting");
    
    // Concatenamos el cupo original con el mensaje nuevo si existe
    const finalObservation = userMessage.trim() 
      ? `${originalObservation} | Mensaje: ${userMessage}`
      : originalObservation;
    
    const { error } = await supabase
      .from("guests")
      .update({
        status: attendance === "yes" ? "attending" : "declined",
        observation: finalObservation
      })
      .eq("id", guest.id);

    if (error) {
      console.error("Error updating RSVP:", error);
      setStatus("idle");
      alert("Hubo un error al confirmar. Por favor intenta de nuevo.");
      return;
    }

    if (attendance === "yes") {
      const end = Date.now() + 3 * 1000;
      const colors = ['#8A8C78', '#D4AF37', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
    
    setStatus("success");
  };

  const handleDeleteResponse = async () => {
    if (!guest || !guest.id) return;
    if (!confirm("¿Estás seguro de que deseas eliminar tu respuesta?")) return;

    setStatus("submitting");
    
    const { error } = await supabase
      .from("guests")
      .update({
        status: "pending",
        observation: originalObservation
      })
      .eq("id", guest.id);

    if (error) {
      console.error("Error deleting RSVP:", error);
      setStatus("success");
      alert("Hubo un error al eliminar tu respuesta.");
      return;
    }
    
    setStatus("idle");
    setAttendance("yes");
    setUserMessage("");
  };

  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-wine mb-4">Confirma tu Asistencia</h2>
          <div className="h-px w-20 mx-auto bg-gold mb-6" />
          <p className="text-foreground/70 font-sans">
            Esperamos que puedas acompañarnos en nuestro día especial.
            Por favor confirma antes del 20 de agosto.
          </p>
          {guest && (
            <div className="mt-8">
              <p className="text-wine font-serif italic text-2xl mb-2">
                {guest.name}
              </p>
              {originalObservation && (
                <div className="inline-block bg-wine/5 border border-wine/20 rounded-full px-6 py-2 text-sm font-sans tracking-wider text-wine font-semibold mt-2">
                  Invitación válida para: {originalObservation.replace('Cupos: ', '')}
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {status === "success" ? (
            <div className="bg-wine text-white p-8 md:p-12 rounded-3xl text-center shadow-lg relative overflow-hidden">
              <h3 className="text-3xl font-serif mb-4">¡Gracias por responder!</h3>
              <p className="opacity-90 font-sans tracking-wide mb-8">
                {attendance === "yes" ? "Estamos felices de que nos acompañes." : "Sentimos que no puedas venir. Gracias por avisarnos."}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-6 py-3 bg-white text-wine rounded-xl font-sans font-semibold tracking-wider hover:bg-white/90 transition-colors"
                >
                  Modificar Respuesta
                </button>
                <button 
                  onClick={handleDeleteResponse}
                  className="px-6 py-3 border border-white/30 text-white rounded-xl font-sans font-semibold tracking-wider hover:bg-white/10 transition-colors"
                >
                  Eliminar Respuesta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-background p-8 md:p-12 rounded-3xl shadow-sm border border-wine/10 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-wine">¿Asistirás?</label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <label className="flex-1 flex items-center justify-center p-4 border-2 border-wine rounded-xl cursor-pointer hover:bg-wine hover:text-white transition-colors has-checked:bg-wine has-checked:text-white group">
                    <input 
                      type="radio" 
                      name="attendance" 
                      value="yes" 
                      required 
                      className="hidden" 
                      checked={attendance === "yes"}
                      onChange={(e) => setAttendance(e.target.value)}
                    />
                    <span className="font-sans font-medium tracking-wide">Sí, asistiré</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center p-4 border-2 border-red-900/30 text-red-900 rounded-xl cursor-pointer hover:bg-red-900 hover:text-white transition-colors has-checked:bg-red-900 has-checked:text-white">
                    <input 
                      type="radio" 
                      name="attendance" 
                      value="no" 
                      className="hidden" 
                      checked={attendance === "no"}
                      onChange={(e) => setAttendance(e.target.value)}
                    />
                    <span className="font-sans font-medium tracking-wide">No podré</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm font-semibold uppercase tracking-wider text-wine">Mensaje (Opcional)</label>
                <textarea 
                  name="userMessage" 
                  rows={3}
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-wine/10 bg-white focus:outline-none focus:border-gold transition-colors resize-none font-sans"
                  placeholder="Ej: Tengo alergia al maní..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting" || !guest}
                className="mt-6 w-full bg-wine text-white p-4 rounded-xl font-sans font-semibold tracking-[0.2em] hover:bg-wine/90 transition-colors flex justify-center items-center h-14 disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "ENVIAR RESPUESTA"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
