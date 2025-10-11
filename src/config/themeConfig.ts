export type ThemeItem = {
  name: string;
  siteClass: string; // فقط گرادینت سایت
};

export type ThemeConfig = {
  /** مدت ترنزیشن تم سایت (ms) */
  siteTransitionMs: number;
  /** لیست تم‌ها برای Navbar */
  themes: ThemeItem[];
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  siteTransitionMs: 1500,
  themes: [
    { name: 'Day', siteClass: 'bg-day-gradient' },
    { name: 'Green', siteClass: 'bg-green-gradient' },
    { name: 'Purple', siteClass: 'bg-purple-gradient' },
    { name: 'Red', siteClass: 'bg-red-gradient' },
    { name: 'Dark', siteClass: 'bg-dark-gradient' },
  ],
};
