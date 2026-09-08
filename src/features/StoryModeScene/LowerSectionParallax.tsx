// src/features/StoryModeScene/LowerSectionParallax.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollingGrassBand } from "@/features/ScrollingGrass/ScrollingGrassBand";
import { LandingSkillsStory } from "@/features/LandingSkillsStory/LandingSkillsStory";

const SCROLL_RANGE = 400;
const SNAP_THRESHOLD = 0.5;

type LayoutMode = "mobile" | "tablet" | "desktop";

/**
 * ✅ کنترل دستیِ دقیق با breakpointهای خودت
 * نکته: عدد منفی = بالاتر ، عدد مثبت = پایین‌تر
 */
function getManualGrassOffsetPx(vw: number) {
  // بزرگ‌تر از 1200
  if (vw > 1200) return -32;

  // max-[1200px]
  if (vw <= 1200 && vw > 1024) return -32;

  // max-[1024px]
  if (vw <= 1024 && vw > 768) return -34;

  // max-[768px]
  if (vw <= 768 && vw > 600) return -104;

  // max-[600px]
  if (vw <= 600 && vw > 480) return -88;

  // max-[480px]
  return -88;
}

export function LowerSectionParallax() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ برای اندازه‌گیری ارتفاع واقعی grass
  const grassWrapRef = useRef<HTMLDivElement | null>(null);
  const [grassH, setGrassH] = useState(0);

  // ✅ viewport width برای کنترل دستی
  const [vw, setVw] = useState(0);

  const [layout, setLayout] = useState<LayoutMode>("desktop");

  // مقدار نرم‌شده‌ی progress برای UI
  const [displayProgress, setDisplayProgress] = useState(0);
  // مقدار هدف که از اسکرول میاد
  const targetProgressRef = useRef(0);

  // تشخیص layout + ثبت vw
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVw(w);

      if (w >= 1024) setLayout("desktop");
      else if (w >= 768) setLayout("tablet");
      else setLayout("mobile");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const enableParallax = layout === "desktop" || layout === "tablet";

  const MAX_VERTICAL_LIFT =
    layout === "desktop" ? 320 : layout === "tablet" ? 60 : 0;

  // ✅ اندازه‌گیری ارتفاع grass (در هر resize)
  useEffect(() => {
    const el = grassWrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setGrassH(el.getBoundingClientRect().height);
    });

    ro.observe(el);
    setGrassH(el.getBoundingClientRect().height);

    return () => ro.disconnect();
  }, []);

  /**
   * ✅ overlapها:
   * - موبایل: Skills اصلاً بالا نیاد (skillsOverlap=0)
   * - tablet/desktop: baseOverlap از grassH + کنترل دستی با vw
   */
  const { grassOverlapPx, skillsOverlapPx } = useMemo(() => {
    const manualGrass = getManualGrassOffsetPx(vw);

    // 1) ✅ فقط بالا بردن Grass نسبت به Hero
    const factor =
      layout === "desktop" ? 0.55 : layout === "tablet" ? 0.45 : 0;

    const grassOverlap = -Math.round(grassH * factor) + manualGrass;

    // 2) ✅ فقط چسباندن Skills به Grass (تماس ثابت/نسبتی)
    // هرچی این عدد بزرگ‌تر (مثلاً 0.35)، Skills بیشتر میاد روی Grass و فاصله از بین میره
    const contactFactor =
      layout === "desktop" ? 0.32 : layout === "tablet" ? 0.38 : 0.38;

    const skillsOverlap = -Math.round(grassH * contactFactor);

    return {
      grassOverlapPx: grassOverlap,
      skillsOverlapPx: skillsOverlap,
    };
  }, [grassH, layout, vw]);


  // اسکرول → هماهنگی ۱۰۰٪ آنی و بدون تأخیر با اسکرول بومی مرورگر (بدون حرکت اضافه پس از ایست اسکرول)
  useEffect(() => {
    // موبایل: پارالاکس خاموش
    if (!enableParallax) {
      targetProgressRef.current = 0;
      setDisplayProgress(0);
      return;
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      let raw = 0;

      if (rect.top >= vh) raw = 0;
      else if (rect.top <= vh - SCROLL_RANGE) raw = 1;
      else {
        const clampedTop = Math.min(Math.max(rect.top, vh - SCROLL_RANGE), vh);
        raw = (vh - clampedTop) / SCROLL_RANGE; // 0 → 1
      }

      targetProgressRef.current = raw;
      setDisplayProgress(raw); // بروزرسانی آنی پوزیشن بدون گلاید و لغزش اضافی
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enableParallax]);

  const translateY = -(displayProgress * MAX_VERTICAL_LIFT);

  return (
    <section
      ref={containerRef}
      className="relative z-[20] w-full overflow-visible"
    >
      <div style={{ transform: `translate3d(0, ${translateY}px, 0)`, marginBottom: `${translateY}px` }}>
        {/* Grass */}
        <div ref={grassWrapRef} style={{ marginTop: grassOverlapPx }}>
          <ScrollingGrassBand progress={displayProgress} />
        </div>

        {/* Skills */}
        <div style={{ marginTop: skillsOverlapPx }}>
          <LandingSkillsStory />
        </div>
      </div>
    </section>
  );
}
