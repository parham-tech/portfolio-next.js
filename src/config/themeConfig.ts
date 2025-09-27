export type ThemeItem = {
  name: string;
  siteClass: string;
  heroClass: string; // می‌تونه "" باشه (مثلاً Dark)
};

export type ThemeConfig = {
  /** مدت ترنزیشن لایه‌ی سایت (ms) */
  siteTransitionMs: number;
  /** مدت ترنزیشن لایه‌ی Hero (ms) */
  heroTransitionMs: number;
  /** لیست تم‌ها برای Navbar */
  themes: ThemeItem[];
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  siteTransitionMs: 1500,
  heroTransitionMs: 1500,
  themes: [
    { name: "Day",    siteClass: "bg-day-gradient",    heroClass: "bg-hero-day" },
    { name: "Green",  siteClass: "bg-green-gradient",  heroClass: "bg-hero-green" },
    { name: "Purple", siteClass: "bg-purple-gradient", heroClass: "bg-hero-purple" },
    { name: "Pink",   siteClass: "bg-pink-gradient",   heroClass: "bg-hero-pink" },
    { name: "Dark",   siteClass: "bg-dark-gradient",   heroClass: "" },
  ],
};
