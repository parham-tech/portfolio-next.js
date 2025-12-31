"use client";
import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { DEFAULT_THEME_CONFIG, ThemeConfig } from "@/config/themeConfig";

// 🎨 نوع داده‌ی Context
type ThemeContextType = {
  activeSite: string;
  applySite: (siteClass: string) => void;
  isTransitioning: boolean;
  prevSite: string;
  nextSite: string;
  config: ThemeConfig;
  setConfig: (cfg: ThemeConfig) => void;
};

// 🧱 ایجاد Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 🌈 ThemeProvider
function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [prevSite, setPrevSite] = useState("bg-day-gradient");
  const [nextSite, setNextSite] = useState("bg-day-gradient");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // زمان ترنزیشن CSS
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--site-transition",
      `${config.siteTransitionMs}ms`
    );
  }, [config.siteTransitionMs]);

  // قفل هنگام تغییر تم برای جلوگیری از کلیک سریع
  const startLock = (targetSite: string) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIsTransitioning(true);

    const lockMs = config.siteTransitionMs;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPrevSite(targetSite);
      setIsTransitioning(false);
      lockRef.current = false;
      timerRef.current = null;
    }, lockMs);
  };

  // تغییر تم
  const applySite = (siteClass: string) => {
    if (lockRef.current) return;
    setNextSite(siteClass);
    startLock(siteClass);
  };

  // پاکسازی
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        activeSite: nextSite,
        applySite,
        isTransitioning,
        prevSite,
        nextSite,
        config,
        setConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// 🧩 Hook دسترسی به Context
function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}

export { ThemeProvider, useThemeContext };
