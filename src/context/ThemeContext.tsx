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
  /** Current theme for highlight boxes (same as nextSite) */
  activeSite: string;
  /** Is Hero enabled? */
  heroEnabled: boolean;
  /** Current Hero class (when enabled) */
  heroTheme: string;

  /** Change site theme (atomic; if Hero is enabled it migrates) */
  applySite: (siteClass: string, heroClass?: string) => void;
  /** Toggle Hero on/off for the current theme */
  toggleHero: (heroClass: string) => void;

  /** Transition lock */
  isTransitioning: boolean;

  /** Hero layers (crossfade) */
  prevHero: string;
  nextHero: string;

  /** Dynamic config (for dashboard) */
  config: ThemeConfig;
  setConfig: (cfg: ThemeConfig) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  /** Config (editable from admin) */
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);

  /** Site layers */
  const [prevSite, setPrevSite] = useState("bg-day-gradient");
  const [nextSite, setNextSite] = useState("bg-day-gradient");

  /** Hero state + layers */
  const [heroEnabled, setHeroEnabled] = useState(false);
  const [heroTheme, setHeroTheme] = useState(""); // variant class
  const [prevHero, setPrevHero] = useState(nextSite);
  const [nextHero, setNextHero] = useState(nextSite);

  /** Transition lock */
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** CSS variables for transition durations */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--site-transition",
      `${config.siteTransitionMs}ms`
    );
    document.documentElement.style.setProperty(
      "--hero-transition",
      `${config.heroTransitionMs}ms`
    );
  }, [config.siteTransitionMs, config.heroTransitionMs]);

  /** Key: target transition is passed to avoid old closure rollback */
  const startLock = (targetSite: string, targetHero: string) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIsTransitioning(true);

    const lockMs = Math.max(config.siteTransitionMs, config.heroTransitionMs);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPrevSite(targetSite);
      setPrevHero(targetHero);

      setIsTransitioning(false);
      lockRef.current = false;
      timerRef.current = null;
    }, lockMs);
  };

  /** Change site theme; if Hero is enabled it migrates to the new variant */
  const applySite = (siteClass: string, heroClass?: string) => {
    if (lockRef.current) return;

    const targetSite = siteClass;
    const targetHero = heroEnabled
      ? (heroClass && heroClass.length > 0 ? heroClass : siteClass)
      : siteClass;

    setNextSite(targetSite);
    setNextHero(targetHero);

    if (heroEnabled) setHeroTheme(heroClass ?? "");

    startLock(targetSite, targetHero);
  };

  /** Toggle Hero on/off for the current theme */
  const toggleHero = (heroClass: string) => {
    if (lockRef.current) return;

    if (heroEnabled && heroTheme === heroClass) {
      // Off → inherit from site
      const targetHero = nextSite;
      setHeroEnabled(false);
      setHeroTheme("");
      setNextHero(targetHero);
      startLock(nextSite, targetHero);
    } else {
      // On → heroClass (or inherit if empty)
      const targetHero = heroClass && heroClass.length > 0 ? heroClass : nextSite;
      setHeroEnabled(true);
      setHeroTheme(heroClass ?? "");
      setNextHero(targetHero);
      startLock(nextSite, targetHero);
    }
  };

  /** Cleanup timer */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        activeSite: nextSite,
        heroEnabled,
        heroTheme,
        applySite,
        toggleHero,
        isTransitioning,
        prevHero,
        nextHero,
        config,
        setConfig,
      }}
    >
      <div className="relative min-h-screen text-white overflow-x-hidden">
        {/* Site layers */}
        <div className={`fixed inset-0 -z-10 ${prevSite}`} />
        <div
          className={`fixed inset-0 -z-10 ${nextSite} transition-bg-site`}
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
