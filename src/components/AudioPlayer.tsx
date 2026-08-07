"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function AudioPlayer({ autoPlayTrigger = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Efecto para auto-play cuando el sobre se abre
  useEffect(() => {
    if (autoPlayTrigger && !hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      // Attempt autoplay (might be blocked on mobile without interaction)
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(
            JSON.stringify({ event: "command", func: "playVideo", args: "" }),
            "*"
          );
        }
      }, 500);
    }
  }, [autoPlayTrigger, hasStarted]);

  const togglePlay = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    setHasStarted(true);

    if (iframeRef.current) {
      if (nextIsPlaying) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: "" }),
          "*"
        );
      } else {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
          "*"
        );
      }
    }
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        width="1"
        height="1"
        src="https://www.youtube.com/embed/FK78oAwoljk?enablejsapi=1&autoplay=0&loop=1&playlist=FK78oAwoljk"
        title="Wedding Music"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute opacity-0 pointer-events-none -z-10"
      />

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={togglePlay}
        className={`fixed bottom-22.5 md:bottom-25 right-4 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg border border-wine/20 transition-all duration-300 ${
          isPlaying ? "bg-wine text-white" : "bg-white text-wine"
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
              <Pause className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Music className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Efecto de ondas cuando suena la música */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-wine animate-ping opacity-30" />
            <span className="absolute -inset-1 rounded-full border border-wine animate-ping opacity-20" style={{ animationDelay: '0.2s' }} />
          </>
        )}
      </motion.button>
    </>
  );
}
