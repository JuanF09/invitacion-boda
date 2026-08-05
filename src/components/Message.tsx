"use client";

import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";

export default function Message() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Intro Message */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16 md:mb-24"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6 md:mb-8">
            <Heart className="w-10 h-10 text-gold fill-gold/20" />
          </motion.div>
          
          <motion.p variants={fadeUp} className="text-lg sm:text-xl md:text-2xl font-serif text-wine mb-6 leading-relaxed italic">
            Nos sentimos muy emocionados por este nuevo capítulo de nuestras vidas.
          </motion.p>
          
          <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl font-sans text-foreground/80 leading-relaxed mb-6">
            Si hoy estás leyendo estas palabras, es porque ocupas un lugar especial en nuestra historia.
          </motion.p>

          <motion.p variants={fadeUp} className="text-sm sm:text-base md:text-lg font-sans text-foreground/70 leading-relaxed font-light">
            La vida nos enseñó que cada persona que Dios pone en nuestro camino deja una huella. Algunos nos vieron crecer, otros caminar en diferentes etapas, algunos estuvieron cerca y otros, sin saberlo, nos regalaron una palabra, una oración, una sonrisa o un abrazo cuando más lo necesitábamos. Y todo eso también nos trajo hasta aquí.
          </motion.p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-background p-6 sm:p-8 md:p-14 rounded-3xl border border-wine/10 shadow-sm relative overflow-hidden mb-16 md:mb-24"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
          
          <motion.h3 variants={fadeUp} className="text-2xl sm:text-3xl md:text-5xl font-serif text-wine mb-8 md:mb-10">Nuestra Historia</motion.h3>
          
          <div className="space-y-6 text-foreground/80 font-sans leading-relaxed text-left md:text-justify font-light text-sm sm:text-base md:text-lg">
            <motion.p variants={fadeUp}>
              Nos conocimos mucho antes de imaginarnos un “para siempre”. Crecimos en el mismo lugar, cada uno viviendo su propia historia, aprendiendo, madurando y descubriendo el propósito que Dios tenía para nuestras vidas. 
            </motion.p>
            <motion.p variants={fadeUp}>
              Cuando llegó el momento indicado, nuestros caminos se encontraron, y entendimos que el amor más bonito no nace de la prisa, sino del propósito y la voluntad de Dios; no busca completar lo que falta, sino compartir lo que Dios ya había restaurado en cada corazón.
            </motion.p>
            <motion.p variants={fadeUp}>
              Hoy elegimos caminar de la mano para escribir una nueva historia. Una historia donde el amor será nuestra decisión diaria, la comunicación nuestro lenguaje, la fe nuestra fortaleza, el hogar nuestro lugar favorito y Cristo el centro de nuestro Hogar.
            </motion.p>
          </div>
        </motion.div>

        {/* Final Message & Verse */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeUp} className="space-y-6 text-base sm:text-lg md:text-xl font-sans text-foreground/80 leading-relaxed font-light mb-16">
            <p className="font-serif italic text-wine text-xl sm:text-2xl mb-8">
              Y hay algo que deseamos con todo el corazón: que quienes amamos estén allí.
            </p>
            <p>
              Queremos verte sonreír con nosotros, emocionarte con nosotros, abrazarnos y ser testigo del instante en que dos vidas se convierten en una sola familia.
            </p>
            <p>
              Gracias por ser parte de nuestras vidas. Gracias por creer en nosotros, por acompañarnos y por estar para nosotros en esta locura de amor.
            </p>
            <p className="font-medium text-wine">
              Nuestro mayor regalo será tenerte cerca mientras comenzamos el capítulo más hermoso que Dios ha escrito para nosotros.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:gap-6 mt-12 md:mt-16 p-6 sm:p-8 bg-wine/5 rounded-2xl border border-wine/10 mx-auto">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-gold/50" />
            <div className="text-center">
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-wine italic mb-4 leading-relaxed">
                “Sobre todo, ámense profundamente, porque el amor cubre muchísimas faltas.”
              </p>
              <p className="font-sans text-xs sm:text-sm tracking-widest uppercase text-foreground/60 mb-8">
                1 Pedro 4:8
              </p>
              <p className="font-serif text-2xl sm:text-3xl text-wine mb-2">Con todo nuestro amor,</p>
              <p className="font-serif text-3xl sm:text-4xl text-gold mb-8">Richi y Naty 🤍</p>
              
              <div className="inline-block px-4 sm:px-6 py-2 bg-white rounded-full border border-wine/20 shadow-sm">
                <p className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-wine font-medium">
                  “Dios, el centro de nuestro hogar”
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
