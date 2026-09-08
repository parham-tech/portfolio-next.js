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

  const selectedProject = projectsData.find((p) => p.id === activeProject);

  // 🚫 قفل اسکرول وقتی modal باز است
  useEffect(() => {
    console.log("Active Project Changed:", activeProject);
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeProject]);

  return (
    <section className="pt-24  text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold  text-white">My Projects</h2>

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
              className={`bg-white/10 h-[75%] md:h-[90%] md:mt-[3%] backdrop-blur-md border border-white/10 p-4 md:p-8 rounded-xl w-[95%] ${
                selectedProject?.liveUrl ? "md:w-[1000px]" : "md:w-[800px]"
              } max-h-[calc(100vh-2.5rem)] flex justify-center`}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ❌ دکمه بستن */}
              <button
                className="absolute top-4 right-4 text-white text-2xl z-50"
                onClick={() => setActiveProject(null)}
                aria-label="Close modal"
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

              {/* 🌐 Live Website Preview (IFrame / Mock Browser) */}
              {selectedProject?.liveUrl && (
                <div className="w-full h-full flex flex-col gap-4 text-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                        {selectedProject.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 mt-1">
                        {selectedProject.description}
                      </p>
                    </div>
                    {/* Tech tags */}
                    {selectedProject.tech && (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] bg-white/10 px-2 py-1 rounded-md border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Browser Mockup */}
                  <div className="flex-1 min-h-0 bg-black/40 rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl relative">
                    {/* Browser Header */}
                    <div className="bg-white/5 px-4 py-2 flex items-center gap-3 border-b border-white/5 shrink-0">
                      {/* MacOS window dots */}
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 block"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 block"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500/80 block"></span>
                      </div>
                      {/* URL Bar */}
                      <div className="flex-1 bg-black/30 text-gray-400 text-xs py-1 px-3 rounded-md flex items-center justify-center gap-1.5 font-mono select-none">
                        <svg
                          className="w-3.5 h-3.5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        <span>{selectedProject.liveUrl}</span>
                      </div>
                    </div>

                    {/* IFrame Area */}
                    <div className="flex-1 relative min-h-0 bg-white">
                      <iframe
                        src={selectedProject.liveUrl}
                        title={selectedProject.title}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                      />
                      {/* Helpful tooltip overlay */}
                      <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-300 pointer-events-none select-none">
                        💡 This is a live preview. Press the button below to switch completely.💡
                      </div>
                    </div>
                  </div>

                  {/* Glowing Link Button */}
                  <div className="flex justify-center items-center shrink-0 pt-2">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition duration-300 flex items-center gap-2"
                    >
                      <span>  Go to the main website </span>
                      <svg
                        className="w-4 h-4 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
