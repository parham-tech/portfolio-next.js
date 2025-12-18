// src/features/ScrollingGrass/ScrollingGrassBand.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";


// 🔧 تنظیمات
const SCROLL_RANGE = 600;        // چقدر اسکرول کنه تا حرکت کامل شه
const MAX_SHIFT_PERCENT = 30;    // حداکثر اسلاید افقی (٪)

export function ScrollingGrassBand() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // مقداری که واقعا روی UI استفاده می‌کنیم (نرم‌شده)
  const [displayProgress, setDisplayProgress] = useState(0);

  // مقدار هدف که با اسکرول آپدیت می‌شه
  const targetProgressRef = useRef(0);

  // محاسبه progress هدف بر اساس اسکرول
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // اگر کل نوار زیر ویوپورت باشه → هنوز نرسیدیم
      if (rect.top >= vh) {
        targetProgressRef.current = 0;
        return;
      }

      // اگر کل نوار از بالا رد شده → در حالت نهایی
      if (rect.bottom <= 0) {
        targetProgressRef.current = 1;
        return;
      }

      const start = vh;              // top == vh → progress = 0
      const end = vh - SCROLL_RANGE; // top == end → progress = 1

      const clampedTop = Math.min(Math.max(rect.top, end), start);
      const raw = (start - clampedTop) / (start - end); // ۰ → ۱

      targetProgressRef.current = Math.min(Math.max(raw, 0), 1);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // نرم کردن حرکت با requestAnimationFrame
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      const target = targetProgressRef.current;

      setDisplayProgress((current) => {
        const diff = target - current;
        if (Math.abs(diff) < 0.001) {
          return target; // خیلی نزدیکه، قفلش کن
        }
        // این ضریب نرم بودن را تعیین می‌کند (۰.۰۸–۰.۱۵ خوبه)
        return current + diff * 0.12;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // حرکت افقی نهایی
  const translateX = -displayProgress * MAX_SHIFT_PERCENT;

  return (
    <section
      ref={containerRef}
      className="
        relative 
        w-full 
        overflow-hidden
        aspect-[1920/220]   /* نسبت تصویر نوار علف */
      "
    >
      <div
        className="absolute inset-0 flex h-full z-[50]"
        style={{
          width: "150%", // 3 × 50% = 150%
          transform: `translate3d(${translateX}%, 0, 0)`,
        }}
      >
        {/* LEFT */}
        <div className="relative h-full w-[50%]">
          <Image
            src="/grass/grass-left.png"
            alt="grass-left"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* CENTER */}
        <div className="relative h-full w-[50%]">
          <Image
            src="/grass/grass-center.png"
            alt="grass-center"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* RIGHT */}
        <div className="relative h-full w-[50%]">
          <Image
            src="/grass/grass-right.png"
            alt="grass-right"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
