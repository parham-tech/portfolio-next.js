"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Theme = {
  name: string;
  siteClass: string;
};

type ThemeSwitcherCarouselProps = {
  activeSite: string;
  applySite: (siteClass: string) => void;
  isTransitioning: boolean;
  config: {
    themes: Theme[];
  };
};

export default function ThemeSwitcherCarousel({
  activeSite,
  applySite,
  isTransitioning,
  config,
}: ThemeSwitcherCarouselProps) {
  const themes = config.themes;
  const [selected, setSelected] = useState(
    themes.findIndex((t) => t.siteClass === activeSite) || 0
  );

  function handlePrev() {
    setSelected((prev) => (prev - 1 + themes.length) % themes.length);
  }
  function handleNext() {
    setSelected((prev) => (prev + 1) % themes.length);
  }
  function handleSelect(idx: number) {
    setSelected(idx);
    applySite(themes[idx].siteClass);
  }

  return (
    <div className="flex flex-col items-center gap-1 min-w-[130px]">
      <div className="flex items-center gap-1">
        <button
          aria-label="قبلی"
          className="p-1 rounded-full bg-white/60 hover:bg-white/80 shadow disabled:opacity-40"
          onClick={handlePrev}
          disabled={isTransitioning}
          tabIndex={0}
        >
          <ChevronLeft className="text-gray-700" />
        </button>
        <div className="w-20 h-10 flex items-center justify-center relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.button
              key={selected}
              className={`
                absolute inset-0 rounded-xl flex items-center justify-center font-medium text-base px-3 py-2
                border-2 transition-colors focus:outline-none
                ${themes[selected].siteClass}
                ${activeSite === themes[selected].siteClass ? "border-blue-500 shadow-md" : "border-gray-300"}
                ${isTransitioning ? "opacity-50 pointer-events-none" : ""}
              `}
              style={{
                color: "white",
                textShadow: "0 1px 4px #0005",
              }}
              onClick={() => handleSelect(selected)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.18 } }}
              exit={{ opacity: 0, x: -30 }}
              aria-label={`انتخاب تم ${themes[selected].name}`}
              tabIndex={0}
            >
              {themes[selected].name}
            </motion.button>
          </AnimatePresence>
        </div>
        <button
          aria-label="بعدی"
          className="p-1 rounded-full bg-white/60 hover:bg-white/80 shadow disabled:opacity-40"
          onClick={handleNext}
          disabled={isTransitioning}
          tabIndex={0}
        >
          <ChevronRight className="text-gray-700" />
        </button>
      </div>
      <div className="flex gap-1 mt-1">
        {themes.map((t, idx) => (
          <button
            key={t.name}
            onClick={() => handleSelect(idx)}
            className={`w-2.5 h-2.5 rounded-full border transition-all
              ${idx === selected ? "bg-blue-400 border-blue-600" : "bg-gray-300 border-gray-400"}
            `}
            aria-label={`انتخاب ${t.name}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
}
