"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ScrollProgressContext = createContext(0);

export function ScrollProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const maxScroll = window.innerHeight * 1.2; // تنظیم پذیر
      const p = Math.min(Math.max(y / maxScroll, 0), 1);
      setProgress(p);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollProgressContext.Provider value={progress}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

export const useScrollProgress = () => useContext(ScrollProgressContext);
