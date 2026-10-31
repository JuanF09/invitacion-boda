"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";

export interface AudioPlayerHandle {
  playFromUserGesture: () => void;
}

interface AudioPlayerProps {
  showControls?: boolean;
}

const YOUTUBE_VIDEO_ID = "QXfEg03FX4M";

const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(function AudioPlayer(
  { showControls = false },
  ref
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasStartedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendCommand = useCallback(
    (func: "playVideo" | "pauseVideo" | "unMute" | "setVolume", args: unknown = "") => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func, args }),
          "*"
        );
      }
    },
    []
  );

  const triggerPlay = useCallback(() => {
    hasStartedRef.current = true;
    setIsPlaying(true);
    sendCommand("unMute");
    sendCommand("setVolume", [100]);
    sendCommand("playVideo");
  }, [sendCommand]);

  useImperativeHandle(ref, () => ({
    playFromUserGesture: () => {
      // Llamado de forma 100% síncrona dentro del clic del usuario al tocar el sobre
      triggerPlay();
      // Reintentos de respaldo por si la conexión móvil aún estaba terminando de inicializar el reproductor
      setTimeout(() => triggerPlay(), 250);
      setTimeout(() => triggerPlay(), 750);
      setTimeout(() => triggerPlay(), 1500);
    },
  }));

  useEffect(() => {
    if (showControls && !hasStartedRef.current) {
      const t = setTimeout(() => triggerPlay(), 100);
      return () => clearTimeout(t);
    }
  }, [showControls, triggerPlay]);

  const togglePlay = () => {
    const nextIsPlaying = !isPlaying;
    hasStartedRef.current = true;
    setIsPlaying(nextIsPlaying);
    if (nextIsPlaying) {
      sendCommand("unMute");
      sendCommand("setVolume", [100]);
      sendCommand("playVideo");
    } else {
      sendCommand("pauseVideo");
    }
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=0&playsinline=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&rel=0`}
        title="Música de Boda - David & Thalia"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="fixed opacity-0 pointer-events-none -z-50 w-px h-px"
      />

      {showControls && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          className={`fixed top-4 left-4 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 backdrop-blur-md cursor-pointer ${
            isPlaying
              ? "bg-[#FAF9F5]/90 text-[#3B4920] border-[#3B4920]/40"
              : "bg-[#526330] text-white border-white/30"
          }`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Pause className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Music className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>

          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-[#526330] animate-ping opacity-30" />
          )}
        </motion.button>
      )}
    </>
  );
});

export default AudioPlayer;
