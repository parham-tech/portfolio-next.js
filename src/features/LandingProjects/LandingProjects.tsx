"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { projectsData } from "./projectsData";
import { ThreeDCarousel } from "@/features/LandingProjects";


// 🎮 Lazy load بازی‌ها
const SnakeGame = dynamic(() => import("@/features/SnakeGame/SnakeGame"), { ssr: false });
const NeonReflex = dynamic(() => import("@/features/NeonReflex/NeonReflex"), { ssr: false });
const ColorFlowPalette = dynamic(
  () => import("@/features/ColorFlowPalette/ColorFlowPalette"),
  { ssr: false }
);

export default function LandingProjects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  // 🚫 قفل اسکرول وقتی modal باز است
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeProject]);

  return (
    <section className="pt-24  text-center relative z-10">
      <h2 className="text-4xl font-bold  text-white">My Projects</h2>

      {/* 🎠 Carousel پروژه‌ها */}
      <ThreeDCarousel
        projects={projectsData}
        onProjectClick={(id) => setActiveProject(id)}
      />

      {/* 🪟 Modal پروژه‌ها */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
 className="bg-white/10 h-[70%] md:h-[90%] md:mt-[3%] backdrop-blur-md border border-white/10 p-10 rounded-xl w-[90%] md:w-[800px] max-h-[calc(100vh-2.5rem)] flex justify-center" 
                animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ❌ دکمه بستن */}
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setActiveProject(null)}
              >
                ✕
              </button>

              {/* 🐍 Snake Game */}
              {activeProject === "snake" && <SnakeGame />}

{/* 🎨 Color Flow Palette */}
{activeProject === "colorflow" && <ColorFlowPalette />}

              {/* ⚡ Neon Reflex */}
              {activeProject === "neon" && (
                <NeonReflex
                  key={restartKey} // 🔑 باعث ری‌استارت بازی می‌شود
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
