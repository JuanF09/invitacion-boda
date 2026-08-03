"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RSVPForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulando envío por ahora (luego se conectará con Supabase)
    setTimeout(() => {
      setStatus("success");
    }, 1500);
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
          <h2 className="text-4xl md:text-5xl font-serif text-olive mb-4">Confirma tu Asistencia</h2>
          <div className="h-px w-20 mx-auto bg-gold mb-6" />
          <p className="text-foreground/70 font-sans">
            Esperamos que puedas acompañarnos en nuestro día especial.
            Por favor confirma antes del 1 de Noviembre.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {status === "success" ? (
            <div className="bg-olive text-white p-12 rounded-3xl text-center">
              <h3 className="text-3xl font-serif mb-4">¡Gracias por confirmar!</h3>
              <p className="opacity-90">Hemos registrado tu respuesta exitosamente.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-background p-8 md:p-12 rounded-3xl shadow-sm border border-olive/10 flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-olive">¿Asistirás?</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex-1 flex items-center justify-center p-4 border border-olive rounded-xl cursor-pointer hover:bg-olive hover:text-white transition-colors has-checked:bg-olive has-checked:text-white">
                    <input type="radio" name="attendance" value="yes" required className="hidden" />
                    <span className="font-sans">Sí, asistiré</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center p-4 border border-red-900/30 text-red-900 rounded-xl cursor-pointer hover:bg-red-900 hover:text-white transition-colors has-checked:bg-red-900 has-checked:text-white">
                    <input type="radio" name="attendance" value="no" className="hidden" />
                    <span className="font-sans">No podré</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-olive">Restricciones Alimenticias</label>
                <textarea 
                  name="allergies" 
                  rows={3}
                  className="w-full p-4 rounded-xl border border-olive/20 bg-white focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Alergias, vegetarianismo, etc. (Opcional)"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="mt-4 w-full bg-olive text-white p-4 rounded-xl font-semibold tracking-wider hover:bg-olive/90 transition-colors flex justify-center items-center h-14"
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
