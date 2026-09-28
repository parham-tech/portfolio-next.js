// 🎨 رنگ‌ها و افکت‌های نئونی (قابل‌تغییر)
export const NEON = {
  bg: "#0b1020",         // پس‌زمینه تیره
  grid: "#111827",
  cyan: "#19f6ff",
  magenta: "#ff2bd6",
  yellow: "#ffe34f",
  red: "#ff2965",
  green: "#53ffa3",
  purple: "#7c3aed",
};

// سایه‌ی نئون برای box-shadow
export const neonGlow = (hex: string, spread = 16) =>
  `0 0 ${spread}px ${hex}, 0 0 ${spread * 2}px ${hex}AA, inset 0 0 12px ${hex}66`;
