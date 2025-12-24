// src/features/LandingSkillsStory/LandingSkillsStory.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type React from "react";
import Image from "next/image";

import { FloatingParticles } from "@/features/FloatingParticles/FloatingParticles";

// ابعاد منطقی صحنه‌ی Skills (بر اساس بک‌گراندت)
const BG_WIDTH = 1523;
const BG_HEIGHT = 1041;

// 👇 نوع لایه‌ها
type LayerId =
  | "bg"
  | "portal"
  | "column-1"
  | "column-2"
  | "moon"
  | "particles-gold"
  | "stone-html"
  | "stone-css"
  | "stone-js";

type LayerKind = "image" | "particles";

type LayerConfig = {
  id: LayerId;
  kind: LayerKind;
  src?: string; // برای particles لازم نیست
  /**
   * ⚠️ top / left / width / height همگی در سیستم مختصات BG هستند
   * یعنی انگار روی تصویر 1523x1041 کار می‌کنی.
   */
  top: number; // px روی BG
  left: number; // px روی BG
  width: number; // px روی BG
  height: number; // px روی BG
  zIndex: number;
  draggable?: boolean;
  label?: string;
};

// ───────────────── مقدار اولیه لایه‌ها در مختصات BG ─────────────────
const INITIAL_LAYERS: LayerConfig[] = [
  {
    id: "bg",
    kind: "image",
    src: "/landingSkills-placeholder.png",
    top: BG_HEIGHT / 2, // وسط BG
    left: BG_WIDTH / 2,
    width: BG_WIDTH,
    height: BG_HEIGHT,
    zIndex: 0,
    draggable: true,
  },
  // {
  //   id: "portal",
  //   kind: "image",
  //   src: "/portal.png",
  //   top: (52.2 / 100) * BG_HEIGHT,
  //   left: (47. / 100) * BG_WIDTH,
  //   width: 577,
  //   height: 632,
  //   zIndex: 2,
  //   draggable: true,
  // },
  {
    id: "moon",
    kind: "image",
    src: "/moon.png",
    top: (29 / 100) * BG_HEIGHT,
    left: (5.2 / 100) * BG_WIDTH,
    width: 427,
    height: 404,
    zIndex: 2,
    draggable: false,
  },
  // {
  //   id: "column-1",
  //   kind: "image",
  //   src: "/column-1.png",
  //   top: (51.5 / 100) * BG_HEIGHT,
  //   left: (81 / 100) * BG_WIDTH,
  //   width: 380,
  //   height: 440,
  //   zIndex: 2,
  //   draggable: true,
  // },
  // {
  //   id: "column-2",
  //   kind: "image",
  //   src: "/column-2.png",
  //   top: (54 / 100) * BG_HEIGHT,
  //   left: (17.4 / 100) * BG_WIDTH,
  //   width: 380,
  //   height: 440,
  //   zIndex: 2,
  //   draggable: true,
  // },

  // 🌟 ناحیه‌ی ذرات طلایی، مثل Hero
  // {
  //   id: "particles-gold",
  //   kind: "particles",
  //   top: (63 / 100) * BG_HEIGHT,
  //   left: (50 / 100) * BG_WIDTH,
  //   width: 600,
  //   height: 400,
  //   zIndex: 3, // روی portal ولی زیر سنگ‌ها
  //   draggable: true,
  // },

  // {
  //   id: "stone-html",
  //   kind: "image",
  //   src: "/skills/stone-empty.png",
  //   top: (70 / 100) * BG_HEIGHT,
  //   left: (30 / 100) * BG_WIDTH,
  //   width: 260,
  //   height: 300,
  //   zIndex: 4,
  //   draggable: true,
  //   label: "HTML",
  // },
  // {
  //   id: "stone-css",
  //   kind: "image",
  //   src: "/skills/stone-empty.png",
  //   top: (72 / 100) * BG_HEIGHT,
  //   left: (50 / 100) * BG_WIDTH,
  //   width: 260,
  //   height: 300,
  //   zIndex: 4,
  //   draggable: true,
  //   label: "CSS",
  // },
  // {
  //   id: "stone-js",
  //   kind: "image",
  //   src: "/skills/stone-empty.png",
  //   top: (70 / 100) * BG_HEIGHT,
  //   left: (70 / 100) * BG_WIDTH,
  //   width: 260,
  //   height: 300,
  //   zIndex: 4,
  //   draggable: true,
  //   label: "JavaScript",
  // },
];

// 🔭 پیکربندی شهاب‌سنگ‌ها (مسیرهای قوسی روی صحنه)
type MeteorConfig = {
  id: string;
  p0: { x: number; y: number }; // نقطه شروع (درصد)
  p1: { x: number; y: number }; // نقطه کنترل (قوس)
  p2: { x: number; y: number }; // نقطه پایان
  size: number;
  timeOffset?: number; // برای تاخیر شروع این شهاب
  duration?: number; // سهم این شهاب از shootingProgress (۰–۱)
};

// ۱۲ تا شهاب‌سنگ قبلی: از بالا-راست به سمت میانه‌ی صحنه
const METEORS: MeteorConfig[] = [
  {
    id: "m1",
    p0: { x: 110, y: -10 },
    p1: { x: 90, y: 10 },
    p2: { x: 60, y: 30 },
    size: 10,
    timeOffset: 0.0,
    duration: 0.6,
  },
  {
    id: "m2",
    p0: { x: 105, y: -5 },
    p1: { x: 85, y: 15 },
    p2: { x: 55, y: 35 },
    size: 9,
    timeOffset: 0.05,
    duration: 0.6,
  },
  {
    id: "m3",
    p0: { x: 115, y: 0 },
    p1: { x: 90, y: 20 },
    p2: { x: 65, y: 40 },
    size: 8,
    timeOffset: 0.1,
    duration: 0.6,
  },
  {
    id: "m4",
    p0: { x: 108, y: 5 },
    p1: { x: 88, y: 25 },
    p2: { x: 60, y: 45 },
    size: 8,
    timeOffset: 0.15,
    duration: 0.6,
  },
  {
    id: "m5",
    p0: { x: 112, y: -15 },
    p1: { x: 88, y: 0 },
    p2: { x: 58, y: 28 },
    size: 7,
    timeOffset: 0.2,
    duration: 0.6,
  },
  {
    id: "m6",
    p0: { x: 118, y: -8 },
    p1: { x: 92, y: 8 },
    p2: { x: 62, y: 32 },
    size: 7,
    timeOffset: 0.25,
    duration: 0.6,
  },
  {
    id: "m7",
    p0: { x: 120, y: 2 },
    p1: { x: 94, y: 18 },
    p2: { x: 64, y: 38 },
    size: 9,
    timeOffset: 0.3,
    duration: 0.6,
  },
  {
    id: "m8",
    p0: { x: 110, y: 10 },
    p1: { x: 88, y: 26 },
    p2: { x: 58, y: 46 },
    size: 8,
    timeOffset: 0.35,
    duration: 0.6,
  },
  {
    id: "m9",
    p0: { x: 116, y: 12 },
    p1: { x: 92, y: 28 },
    p2: { x: 62, y: 48 },
    size: 7,
    timeOffset: 0.4,
    duration: 0.6,
  },
  {
    id: "m10",
    p0: { x: 108, y: -12 },
    p1: { x: 86, y: 6 },
    p2: { x: 56, y: 30 },
    size: 9,
    timeOffset: 0.45,
    duration: 0.6,
  },
  {
    id: "m11",
    p0: { x: 122, y: -6 },
    p1: { x: 96, y: 10 },
    p2: { x: 66, y: 34 },
    size: 8,
    timeOffset: 0.5,
    duration: 0.6,
  },
  {
    id: "m12",
    p0: { x: 114, y: -2 },
    p1: { x: 90, y: 16 },
    p2: { x: 60, y: 36 },
    size: 10,
    timeOffset: 0.55,
    duration: 0.6,
  },

  // 🆕 ۱۲ شهاب‌سنگ جدید: از بالای وسط → به سمت چپ
  {
    id: "m13",
    p0: { x: 50, y: -18 },
    p1: { x: 42, y: 0 },
    p2: { x: 28, y: 30 },
    size: 9,
    timeOffset: 0.15,
    duration: 0.6,
  },
  {
    id: "m14",
    p0: { x: 52, y: -14 },
    p1: { x: 43, y: 4 },
    p2: { x: 30, y: 34 },
    size: 8,
    timeOffset: 0.2,
    duration: 0.6,
  },
  {
    id: "m15",
    p0: { x: 48, y: -10 },
    p1: { x: 40, y: 6 },
    p2: { x: 26, y: 32 },
    size: 10,
    timeOffset: 0.25,
    duration: 0.6,
  },
  {
    id: "m16",
    p0: { x: 50, y: -8 },
    p1: { x: 41, y: 10 },
    p2: { x: 24, y: 36 },
    size: 7,
    timeOffset: 0.3,
    duration: 0.6,
  },
  {
    id: "m17",
    p0: { x: 52, y: -4 },
    p1: { x: 43, y: 12 },
    p2: { x: 28, y: 40 },
    size: 9,
    timeOffset: 0.35,
    duration: 0.6,
  },
  {
    id: "m18",
    p0: { x: 49, y: -2 },
    p1: { x: 40, y: 16 },
    p2: { x: 25, y: 44 },
    size: 8,
    timeOffset: 0.4,
    duration: 0.6,
  },
  {
    id: "m19",
    p0: { x: 51, y: 0 },
    p1: { x: 42, y: 20 },
    p2: { x: 27, y: 48 },
    size: 7,
    timeOffset: 0.45,
    duration: 0.6,
  },
  {
    id: "m20",
    p0: { x: 47, y: -6 },
    p1: { x: 38, y: 8 },
    p2: { x: 22, y: 34 },
    size: 9,
    timeOffset: 0.5,
    duration: 0.6,
  },
  {
    id: "m21",
    p0: { x: 53, y: -12 },
    p1: { x: 44, y: 2 },
    p2: { x: 30, y: 32 },
    size: 8,
    timeOffset: 0.55,
    duration: 0.6,
  },
  {
    id: "m22",
    p0: { x: 49, y: 2 },
    p1: { x: 40, y: 20 },
    p2: { x: 24, y: 46 },
    size: 10,
    timeOffset: 0.6,
    duration: 0.6,
  },
  {
    id: "m23",
    p0: { x: 51, y: 4 },
    p1: { x: 42, y: 22 },
    p2: { x: 26, y: 50 },
    size: 8,
    timeOffset: 0.65,
    duration: 0.6,
  },
  {
    id: "m24",
    p0: { x: 47, y: -16 },
    p1: { x: 38, y: 0 },
    p2: { x: 22, y: 28 },
    size: 9,
    timeOffset: 0.7,
    duration: 0.6,
  },
];

export function LandingSkillsStory({ sceneProgress = 0 }: { sceneProgress?: number }) {
  const [layers, setLayers] = useState<LayerConfig[]>(INITIAL_LAYERS);
  const [debug, setDebug] = useState(true); 
  // const debug = true;

  const [activeId, setActiveId] = useState<LayerId | null>(null);

  // رفرنس کانتینر BG
  const bgRef = useRef<HTMLDivElement | null>(null);

  // برای داشتن آخرین state داخل mousemove
  const layersRef = useRef(layers);
  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  // 🔹 برای تشخیص اسکرول و شهاب‌سنگ‌ها
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shootingProgress, setShootingProgress] = useState(0); // ۰ → ۱

  // ───────────────── شهاب‌سنگ‌ها: progress بر اساس اسکرول ─────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // کاملاً زیر ویوپورت → هنوز نرسیدیم
      if (rect.top >= vh) {
        setShootingProgress(0);
        return;
      }

      // وقتی top سکشن به 0 برسد (لبه بالای صفحه) → progress = 1
      if (rect.top <= 0) {
        setShootingProgress(1);
        return;
      }

      // از لحظه‌ای که top سکشن از پایین ویوپورت وارد می‌شود (rect.top از vh تا 0)
      const raw = 1 - rect.top / vh; // top: vh → 0  ⇒  0 → 1
      const clamped = Math.min(Math.max(raw, 0), 1);
      setShootingProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // ───────────────── log تنظیمات لایه‌ها (به درصد BG) ─────────────────
  const logLayers = useCallback(() => {
    const data = layersRef.current.map((l) => ({
      id: l.id,
      top: Number(((l.top / BG_HEIGHT) * 100).toFixed(2)),
      left: Number(((l.left / BG_WIDTH) * 100).toFixed(2)),
      width: Math.round(l.width),
      height: Math.round(l.height),
      zIndex: l.zIndex,
    }));
    console.log(
      "%c[SkillsStory Debug] Layer configs (percent of BG):",
      "color:#38bdf8;font-weight:bold;"
    );
    console.log(JSON.stringify(data, null, 2));
  }, []);

  // ───────────────── Drag ─────────────────
  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, id: LayerId) => {
      if (!debug) return;

      const layer = layersRef.current.find((l) => l.id === id);
      if (!layer || !layer.draggable) return;

      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const scaleX = rect.width / BG_WIDTH;
      const scaleY = rect.height / BG_HEIGHT;

      setActiveId(id);

      const startX = e.clientX;
      const startY = e.clientY;
      const startTop = layer.top; // در مختصات BG
      const startLeft = layer.left; // در مختصات BG

      const onMove = (moveEvent: MouseEvent) => {
        const dxScreen = moveEvent.clientX - startX;
        const dyScreen = moveEvent.clientY - startY;

        const dxBg = dxScreen / scaleX;
        const dyBg = dyScreen / scaleY;

        const newTop = startTop + dyBg;
        const newLeft = startLeft + dxBg;

        setLayers((prev) =>
          prev.map((l) =>
            l.id === id ? { ...l, top: newTop, left: newLeft } : l
          )
        );
      };

      const onUp = () => {
        setActiveId(null);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        logLayers();
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [debug, logLayers]
  );

  // ───────────────── Resize ─────────────────
  const handleResizeStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, id: LayerId) => {
      if (!debug) return;
      e.stopPropagation();

      const layer = layersRef.current.find((l) => l.id === id);
      if (!layer || !layer.draggable) return;
      if (!bgRef.current) return;

      const rect = bgRef.current.getBoundingClientRect();
      const scaleX = rect.width / BG_WIDTH;
      const scaleY = rect.height / BG_HEIGHT;

      setActiveId(id);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = layer.width;
      const startHeight = layer.height;

      const onMove = (moveEvent: MouseEvent) => {
        const dxScreen = moveEvent.clientX - startX;
        const dyScreen = moveEvent.clientY - startY;

        const dxBg = dxScreen / scaleX;
        const dyBg = dyScreen / scaleY;

        setLayers((prev) =>
          prev.map((l) =>
            l.id === id
              ? {
                  ...l,
                  width: Math.max(80, startWidth + dxBg),
                  height: Math.max(80, startHeight + dyBg),
                }
              : l
          )
        );
      };

      const onUp = () => {
        setActiveId(null);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        logLayers();
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [debug, logLayers]
  );

  return (
   <section
  ref={sectionRef}
  className="relative w-full flex justify-center"
>
  {/* ✅ Viewport (مثل Hero): ارتفاع کنترل‌شده + crop کننده */}
  <div
   className="
    relative w-full overflow-hidden
    h-[1041px]
    max-[1024px]:h-[730px]
    max-[768px]:h-[600px]
        max-[600px]:h-[650px]
                max-[480px]:h-[550px]


  "
>
    {/* ✅ Stage (cover): مثل Hero */}
    <div
      ref={bgRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        aspectRatio: `${BG_WIDTH} / ${BG_HEIGHT}`,
        minWidth: "100%",
        minHeight: "100%",
      }}
    >
      {/* 🔘 دکمه‌ی دیباگ روی خود صحنه */}
      <button
        onClick={() => setDebug((d) => !d)}
        className="absolute right-4 top-4 z-50 rounded-md px-3 py-1 text-xs font-semibold text-sky-100 backdrop-blur hover:bg-black/80"
      >
        Debug: {debug ? "ON" : "OFF"}
      </button>

      {/* ⭐ شهاب‌سنگ‌ها */}
      {shootingProgress > 0 && (
        <div className="pointer-events-none absolute inset-0 z-[8]">
          {METEORS.map((m) => {
            const offset = m.timeOffset ?? 0;
            const dur = m.duration ?? 1;

            let t = (shootingProgress - offset) / dur;
            if (t <= 0 || t >= 1) return null;

            const oneMinusT = 1 - t;
            const x =
              oneMinusT * oneMinusT * m.p0.x +
              2 * oneMinusT * t * m.p1.x +
              t * t * m.p2.x;

            const y =
              oneMinusT * oneMinusT * m.p0.y +
              2 * oneMinusT * t * m.p1.y +
              t * t * m.p2.y;

            const scale = 0.7 + t * 0.8;
            const opacity = t < 0.2 ? t * 5 : 1 - Math.max(0, t - 0.6) * 2;

            return (
              <div
                key={m.id}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  width: m.size,
                  height: m.size,
                  borderRadius: "9999px",
                  background: "radial-gradient(circle, #ffe9a9, transparent)",
                  boxShadow:
                    "0 0 14px rgba(255, 233, 169, 0.95), 0 0 30px rgba(255, 233, 169, 0.75)",
                  opacity: Math.max(0, Math.min(opacity, 1)),
                }}
              />
            );
          })}
        </div>
      )}

      {/* ✅ این بخش layers.map همون قبلی خودت می‌مونه */}
      {layers.map((layer) => {
        const isActive = activeId === layer.id;

        const topPercent = (layer.top / BG_HEIGHT) * 100;
        const leftPercent = (layer.left / BG_WIDTH) * 100;
        const widthPercent = (layer.width / BG_WIDTH) * 100;
        const heightPercent = (layer.height / BG_HEIGHT) * 100;

        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              top: `${topPercent}%`,
              left: `${leftPercent}%`,
              transform: "translate(-50%, -50%)",
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
              zIndex: layer.zIndex,
              cursor: debug && layer.draggable ? "move" : "default",
              outline:
                debug && layer.draggable
                  ? isActive
                    ? "2px solid #38bdf8"
                    : "1px dashed #38bdf8"
                  : "none",
              pointerEvents: debug ? "auto" : "none",
            }}
            onMouseDown={
              debug && layer.draggable
                ? (e) => {
                    e.preventDefault();
                    handleDragStart(e, layer.id);
                  }
                : undefined
            }
          >
            <div className="relative h-full w-full">
              {layer.kind === "particles" ? (
                <FloatingParticles
                  width={layer.width}
                  height={layer.height}
                  count={45}
                  colors={["#ffd66b", "#ffd66b"]}
                />
              ) : (
                <Image
                  src={layer.src!}
                  alt={layer.id}
                  fill
                  className="select-none object-contain pointer-events-none"
                />
              )}
            </div>

            {debug && layer.draggable && (
              <>
                <div className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-sky-100">
                  {layer.id} — top:{" "}
                  {((layer.top / BG_HEIGHT) * 100).toFixed(1)}% | left:{" "}
                  {((layer.left / BG_WIDTH) * 100).toFixed(1)}% | w:
                  {Math.round(layer.width)} | h:
                  {Math.round(layer.height)}
                </div>

                <div
                  onMouseDown={(e) => handleResizeStart(e, layer.id)}
                  className="absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 cursor-se-resize rounded bg-sky-300 shadow-md"
                  style={{ pointerEvents: "auto" }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  </div>
</section>

  );
}
