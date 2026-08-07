import { MapPin, MailPlus, Palette, Church, Video, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function Details() {

  return (
    <section className="py-24 bg-background px-4">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* SECCIÓN 1: DETALLES PRINCIPALES */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-wine mb-4">Detalles del Día</h2>
            <div className="h-px w-20 mx-auto bg-gold" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ubicación y Hora */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-wine/10"
            >
              <Church className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-2xl font-serif text-wine mb-2">Ceremonia & Recepción</h3>
              <p className="text-xl font-sans text-foreground/80 mb-4">3:00 PM</p>
              <div className="flex flex-col items-center gap-1 text-foreground/70">
                <span className="font-semibold">Raíces Villa Rosario</span>
              </div>
              <a href="https://maps.app.goo.gl/qRSEvL2LpMXixcTd8" target="_blank" rel="noopener noreferrer" className="mt-8 px-6 py-3 border border-wine text-wine rounded-full flex items-center gap-2 hover:bg-wine hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="text-sm tracking-wider uppercase">Ver Mapa</span>
              </a>
            </motion.div>

            {/* Código de Vestimenta */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-wine/10"
            >
              <Palette className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-2xl font-serif text-wine mb-2">Código de Vestimenta</h3>
              <p className="text-sm font-sans text-foreground/80 mb-4 mt-2 leading-relaxed">
                Nos encantaría que nos acompañes usando colores sobrios y elegantes.
              </p>
              <div className="mt-auto flex flex-col items-center gap-2 w-full">
                <span className="font-semibold text-wine text-sm uppercase tracking-wider border-b border-gold/50 pb-1 mb-2">Colores Reservados</span>
                <span className="text-sm text-foreground/70 mb-3">Rojo, Vino Tinto y Borgoña</span>
                <div className="flex justify-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-600 shadow-inner border border-black/10" title="Rojo" />
                  <div className="w-8 h-8 rounded-full bg-[#722F37] shadow-inner border border-black/10" title="Vino Tinto" />
                  <div className="w-8 h-8 rounded-full bg-[#800020] shadow-inner border border-black/10" title="Borgoña" />
                </div>
              </div>
            </motion.div>

            {/* Regalos */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-wine/10"
            >
              <MailPlus className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-2xl font-serif text-wine mb-2">Regalos</h3>
              <p className="text-sm font-sans text-foreground/80 mb-4 mt-2 leading-relaxed">
                El mejor regalo que nos puedes dar es tu presencia. Sin embargo, si deseas tener un detalle con nosotros:
              </p>
              <div className="mt-auto px-6 py-4 bg-wine/5 rounded-2xl w-full flex items-center justify-center">
                <span className="font-serif text-wine text-xl">Lluvia de Sobres</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECCIÓN 2: MÚSICA Y STREAMING */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Transmisión Virtual */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-wine/5 p-8 md:p-12 rounded-3xl shadow-sm border border-wine/10 text-center flex flex-col items-center justify-center h-full"
          >
            <Video className="w-12 h-12 text-wine mb-4" />
            <h3 className="text-2xl font-serif text-wine mb-4">Transmisión en Vivo</h3>
            <p className="text-base font-sans text-foreground/80 mb-8 leading-relaxed">
              Sabemos que algunos no podrán acompañarnos físicamente. ¡Pero no queremos que se pierdan ningún detalle!
            </p>
            <p className="text-sm text-wine font-semibold font-sans tracking-wide uppercase px-6 py-3 bg-wine/10 rounded-full">
              El enlace se compartirá el día de la boda
            </p>
          </motion.div>

          {/* Playlist Colaborativa */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-wine/10 text-center flex flex-col items-center justify-center h-full"
          >
            <Music className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-2xl font-serif text-wine mb-4">Ayúdanos con la Música</h3>
            <p className="text-base font-sans text-foreground/80 mb-8 leading-relaxed">
              ¿Qué canción no puede faltar en nuestra fiesta? Agrégala a nuestra playlist de Spotify.
            </p>
            <a href="https://open.spotify.com/playlist/47tQU1EbJvhyeXX9Ejdktu?si=4yNxuTw6QneSEoxSR-dp-g&utm_source=copy-link&pt=20ca1495713acc8ecb69abb0f5bbad86&pi=V56goEkfQ0msH" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-8 py-4 border-2 border-green-600 text-green-700 rounded-full flex items-center justify-center gap-2 hover:bg-green-50 transition-colors font-semibold">
              <Music className="w-5 h-5" />
              <span className="text-sm tracking-wider uppercase">Abrir en Spotify</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
