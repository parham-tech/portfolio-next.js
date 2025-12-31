// src/features/ScrollingGrass/ScrollingGrassBand.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// 🔧 تنظیمات
const SCROLL_RANGE = 600;
const MAX_SHIFT_PERCENT = 30;

export function ScrollingGrassBand() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [displayProgress, setDisplayProgress] = useState(0);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.top >= vh) {
        targetProgressRef.current = 0;
        return;
      }

      if (rect.bottom <= 0) {
        targetProgressRef.current = 1;
        return;
      }

      const start = vh;
      const end = vh - SCROLL_RANGE;

      const clampedTop = Math.min(Math.max(rect.top, end), start);
      const raw = (start - clampedTop) / (start - end);

      targetProgressRef.current = Math.min(Math.max(raw, 0), 1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      const target = targetProgressRef.current;

      setDisplayProgress((current) => {
        const diff = target - current;
        if (Math.abs(diff) < 0.001) return target;
        return current + diff * 0.12;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const translateX = -displayProgress * MAX_SHIFT_PERCENT;

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* ✅ مثل Hero: ارتفاع کنترل‌شده تا با کاهش عرض کوچیک نشه */}
      <div
        className="
          relative w-full overflow-hidden
          h-[170px]
          max-[1200px]:h-[150px]
          max-[1024px]:h-[150px]
          max-[768px]:h-[130px]
          max-[600px]:h-[120px]
          max-[480px]:h-[100px]
        "
      >
        <div
          className="absolute inset-0 flex h-full z-[50]"
          style={{
            width: "150%",
            transform: `translate3d(${translateX}%, 0, 0)`,
          }}
        >
          {/* LEFT */}
          <div className="relative h-full w-[50%] overflow-hidden">
            <Image
              src="/grass/grass-left.png"
              alt="grass-left"
              fill
              priority
              className="select-none object-cover object-bottom"
              draggable={false}
            />
          </div>

          {/* CENTER */}
          <div className="relative h-full w-[50%] overflow-hidden">
            <Image
              src="/grass/grass-center.png"
              alt="grass-center"
              fill
              priority
              className="select-none object-cover object-bottom"
              draggable={false}
            />
          </div>

          {/* RIGHT */}
          <div className="relative h-full w-[50%] overflow-hidden">
            <Image
              src="/grass/grass-right.png"
              alt="grass-right"
              fill
              priority
              className="select-none object-cover object-bottom"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
