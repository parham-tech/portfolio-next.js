// ⚙️ منطق سرعت/امتیاز/ظرفیت بازی

export type SpeedLevel = {
  round: number;
  intervalMs: number; // فرصت کاربر برای کلیک
};

export function getSpeedForRound(round: number): SpeedLevel {
  // هر راند کمی سریع‌تر
  const base = 3000; // ms
  const step = Math.max(250, base - (round - 1) * 60);
  return { round, intervalMs: step };
}

export function pickNextTarget(last?: number, total = 6): number {
  // یک اندیس جدید که با قبلی فرق کند
  let idx = Math.floor(Math.random() * total);
  if (total > 1 && idx === last) {
    idx = (idx + 1) % total;
  }
  return idx;
}
