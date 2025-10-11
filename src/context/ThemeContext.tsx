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

type ThemeContextType = {
  activeSite: string;                // کلاس تم فعلی
  applySite: (siteClass: string) => void;
  isTransitioning: boolean;
  prevSite: string;
  nextSite: string;
  config: ThemeConfig;
  setConfig: (cfg: ThemeConfig) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);

  const [prevSite, setPrevSite] = useState("bg-day-gradient");
  const [nextSite, setNextSite] = useState("bg-day-gradient");

  const [isTransitioning, setIsTransitioning] = useState(false);
  const lockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--site-transition",
      `${config.siteTransitionMs}ms`
    );
  }, [config.siteTransitionMs]);

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

  const applySite = (siteClass: string) => {
    if (lockRef.current) return;
    setNextSite(siteClass);
    startLock(siteClass);
  };

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
      {/* 👇 کانتینر کل سایت */}
      <div className="relative min-h-screen text-white overflow-x-hidden max-w-[1600px] mx-auto ">
        {/* 👇 بک‌گراند فقط در محدوده container */}
        <div className={`absolute inset-0 -z-10 ${prevSite}`} />
        <div
          className={`absolute inset-0 -z-10 ${nextSite} transition-bg-site`}
          style={{ opacity: isTransitioning ? 1 : 0 }}
        />
        
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
