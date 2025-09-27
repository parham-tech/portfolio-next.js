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
  /** تم فعلی برای هایلایت باکس‌ها (همان nextSite) */
  activeSite: string;
  /** آیا هیرو روشن است؟ */
  heroEnabled: boolean;
  /** کلاس هیروی فعلی (وقتی روشن است) */
  heroTheme: string;

  /** تغییر تم سایت (اتمی؛ درصورت روشن بودن Hero ماigrat می‌کند) */
  applySite: (siteClass: string, heroClass?: string) => void;
  /** روشن/خاموش کردن Hero برای تم فعلی */
  toggleHero: (heroClass: string) => void;

  /** قفل ترنزیشن */
  isTransitioning: boolean;

  /** لایه‌های Hero (کراس‌فید) */
  prevHero: string;
  nextHero: string;

  /** کانفیگ پویا (برای داشبورد) */
  config: ThemeConfig;
  setConfig: (cfg: ThemeConfig) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  /** کانفیگ (قابل تغییر از ادمین) */
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);

  /** Site layers */
  const [prevSite, setPrevSite] = useState("bg-day-gradient");
  const [nextSite, setNextSite] = useState("bg-day-gradient");

  /** Hero state + layers */
  const [heroEnabled, setHeroEnabled] = useState(false);
  const [heroTheme, setHeroTheme] = useState(""); // کلاس variant
  const [prevHero, setPrevHero] = useState(nextSite);
  const [nextHero, setNextHero] = useState(nextSite);

  /** Transition lock */
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** CSS variables برای زمان ترنزیشن‌ها */
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

  /** کلید: مقصد ترنزیشن را ورودی می‌گیریم تا closure قدیمی باعث برگشت نشود */
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

  /** تغییر تم سایت؛ اگر Hero روشن بود به variant جدید مهاجرت می‌کند */
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

  /** روشن/خاموش کردن Hero برای تم فعلی */
  const toggleHero = (heroClass: string) => {
    if (lockRef.current) return;

    if (heroEnabled && heroTheme === heroClass) {
      // خاموش → inherit از سایت
      const targetHero = nextSite;
      setHeroEnabled(false);
      setHeroTheme("");
      setNextHero(targetHero);
      startLock(nextSite, targetHero);
    } else {
      // روشن → heroClass (یا inherit اگر خالی)
      const targetHero = heroClass && heroClass.length > 0 ? heroClass : nextSite;
      setHeroEnabled(true);
      setHeroTheme(heroClass ?? "");
      setNextHero(targetHero);
      startLock(nextSite, targetHero);
    }
  };

  /** پاک‌سازی تایمر */
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
