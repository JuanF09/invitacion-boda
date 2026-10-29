"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

const YOUTUBE_VIDEO_ID = "QXfEg03FX4M";

export default function AudioPlayer({ autoPlayTrigger = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasStartedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendCommand = (func: "playVideo" | "pauseVideo") => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args: "" }),
        "*"
      );
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && !hasStartedRef.current) {
      hasStartedRef.current = true;

      const t0 = setTimeout(() => {
        setIsPlaying(true);
        sendCommand("playVideo");
      }, 150);
      const t1 = setTimeout(() => sendCommand("playVideo"), 800);
      const t2 = setTimeout(() => sendCommand("playVideo"), 1600);

      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    const nextIsPlaying = !isPlaying;
    hasStartedRef.current = true;
    setIsPlaying(nextIsPlaying);
    sendCommand(nextIsPlaying ? "playVideo" : "pauseVideo");
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`}
        title="Música de Boda - David & Thalia"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="fixed opacity-0 pointer-events-none -z-50 w-px h-px"
      />

      {autoPlayTrigger && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          className={`fixed top-4 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 backdrop-blur-md cursor-pointer ${
            isPlaying
              ? "bg-[#FAF9F5]/85 text-[#3B4920] border-[#3B4920]/30"
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
}
