"use client";

import { useMemo } from "react";

type Particle = {
  x: number;        // درصد داخل باکس خودش
  y: number;
  size: number;     // px
  duration: number; // ثانیه
  delay: number;    // ثانیه
  opacity: number;
  color: string;
};

type FloatingParticlesProps = {
  width: number;     // الان فقط برای تعیین تعداد / scale می‌تونه استفاده بشه
  height: number;
  count?: number;
  colors?: string[]; // مثلا ["#ffd66b", "#fffbcc"]
};

export function FloatingParticles({
  width,
  height,
  count = 40,
  colors = ["#ffd66b", "#fffbcc"],
}: FloatingParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map(() => {
      const color =
        colors[Math.floor(Math.random() * colors.length)] ?? colors[0];

      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 6,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 10,
        opacity: 0.7 + Math.random() * 0.3,
        color,
      };
    });
  }, [count, colors, width, height]); // اگر خواستی width/height هم تو seed دخیل باشن

  return (
    <div
      className="
        pointer-events-none 
        absolute 
        inset-0 
        overflow-hidden
      "
      // ❌ دیگه width/height پیکسلی نمی‌ذاریم که از parent بزنه بیرون
      // style={{ width: "100%", height: "100%" }} هم حتی لازم نیست چون inset-0 خودش این کار رو می‌کنه
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle-glow"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}
