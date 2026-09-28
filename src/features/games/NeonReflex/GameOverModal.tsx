"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GameOverModalProps = {
  score: number;
  onClose: () => void;
  onRestart: () => void;
};

export default function GameOverModal({ score, onClose, onRestart }: GameOverModalProps) {
  const [showLoop, setShowLoop] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[10000] backdrop-blur-sm overflow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gameover-title"
      >
        {/* 🎬 ویدیو Game Over */}
        <motion.div
          key="video-section"
          className="flex flex-col items-center justify-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {!showLoop ? (
            <video
              key="intro"
              src="/videos/gameover.mp4"
              autoPlay
              playsInline
              controls={false}
              className="max-w-[400px] rounded-lg shadow-2xl md:h-[90%] xs:h-[80%] h-[70%]  mt-[2rem]"
              onEnded={() => setShowLoop(true)}
            />
          ) : (
            <video
              key="loop"
              src="/videos/gameover-loop.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              className="max-w-[400px] rounded-lg shadow-2xl opacity-90 md:h-[90%] xs:h-[80%] h-[70%]  mt-[2rem] "
            />
          )}
        </motion.div>

        {/* 🕹 دکمه‌ها */}
        <motion.div
          className="-mt-[5%] flex gap-4 mb-[5%]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={onRestart}
  className="
    w-32 xs:w-40 px-6 py-2
    text-sm xs:text-base
    rounded-lg
    border border-cyan-400
    bg-[#061923]
    text-cyan-300
    font-bold tracking-wide
    shadow-[0_0_8px_rgba(0,234,255,0.5),inset_0_0_12px_rgba(0,234,255,0.08)]
    transition-all duration-200
    hover:bg-cyan-400/10
    hover:text-cyan-200
    hover:shadow-[0_0_15px_rgba(0,234,255,0.8),0_0_35px_rgba(0,234,255,0.35),inset_0_0_20px_rgba(0,234,255,0.12)]
  "
>
  ↻ TRY AGAIN
</motion.button>

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={onClose}
  className="
   w-32 xs:w-40 px-6 py-2
   text-sm xs:text-base
    rounded-lg
    border border-pink-500
    bg-[#210817]
    text-pink-400
    font-bold tracking-wide
    shadow-[0_0_8px_rgba(255,44,168,0.5),inset_0_0_12px_rgba(255,44,168,0.08)]
    transition-all duration-200
    hover:bg-pink-500/10
    hover:text-pink-300
    hover:shadow-[0_0_15px_rgba(255,44,168,0.8),0_0_35px_rgba(255,44,168,0.35),inset_0_0_20px_rgba(255,44,168,0.12)]
  "
>
  × CLOSE
</motion.button>
        </motion.div>

        {/* امتیاز */}
        <p id="gameover-title" className="mt-6 text-white text-lg">Game Over! Your Score: {score}</p>
      </motion.div>
    </AnimatePresence>
  );
}
