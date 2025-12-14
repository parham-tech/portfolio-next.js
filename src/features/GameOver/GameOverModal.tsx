"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GameOverModalProps = {
  score: number;
  onClose: () => void;
  onRestart: () => void;
};

export default function GameOverModal({ score, onClose, onRestart }: GameOverModalProps) {
  const [showLoop, setShowLoop] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[10000] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
              className="max-w-[400px] rounded-lg shadow-2xl h-[70%] mt-[2rem]"
              onEnded={() => setShowLoop(true)}
            />
          ) : (
            <video
              key="loop"
              src="/videos/gameover-loop.mp4"
              autoPlay
              loop
              playsInline
              controls={false}
              className="max-w-[400px] rounded-lg shadow-2xl opacity-90 h-[55%] xs:h-[60%] md:h-[70%]  mt-[2rem] "
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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onRestart}
            className="w-40 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg shadow-lg transition-all"
          >
            🔁 Try Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className="w-40 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg shadow-lg transition-all"
          >
            ✖ Close
          </motion.button>
        </motion.div>

        {/* امتیاز */}
        <p className="mt-6 text-white text-lg">Your Score: {score}</p>
      </motion.div>
    </AnimatePresence>
  );
}
