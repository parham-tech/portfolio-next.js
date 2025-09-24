"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("bg-day-gradient");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <body className={`${theme} min-h-screen transition-colors duration-500`}>
        {children}
      </body>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
