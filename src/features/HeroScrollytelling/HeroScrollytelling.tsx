"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { FloatingParticles } from "@/features/FloatingParticles/FloatingParticles";

// ابعاد واقعی تصویر/ویدئوی بک‌گراند
const BG_WIDTH = 1523;
const BG_HEIGHT = 1041;

// نوع لایه‌ها
type LayerId =
  | "bg"
  | "castle"
  | "front-mountain"
  | "person"
  | "cloud-1"
  | "cloud-2"
  | "cloud-3"
  | "particles-gold"
  | "particles-blue"
  | "butterfly-gif"
  | "bird-gif"
  | "spider-gif";

type LayerKind = "image" | "video" | "particles";

type LayerConfig = {
  id: LayerId;
  kind: LayerKind;
  src: string;
  /**
   * ⚠️ نکته مهم:
   * top / left / width / height همه بر اساس سیستم مختصات خودِ BG هستند
   * یعنی انگار روی تصویر 1523x1011 پیکسل دارید کار می‌کنید.
   */
  top: number;    // px در محور Y روی BG
  left: number;   // px در محور X روی BG
  width: number;  // px در BG
  height: number; // px در BG
  zIndex: number;
  draggable?: boolean;
  animationClass?: string;
};

// ───── مقدار اولیه لایه‌ها در سیستم مختصات BG (همون مقادیری که داشتی) ─────
const INITIAL_LAYERS: LayerConfig[] = [
  {
    id: "bg",
    kind: "video",
    src: "/videos/bg-loop.mp4",
    top: BG_HEIGHT / 2,      // وسط BG
    left: BG_WIDTH / 2,
    width: BG_WIDTH,
    height: BG_HEIGHT,
    zIndex: 0,
    draggable: true,
  },
  {
    id: "castle",
    kind: "image",
    src: "/castle.png",
    top: (29.6 / 100) * BG_HEIGHT,
    left: (64.4 / 100) * BG_WIDTH,
    width: 482,
    height: 509,
    zIndex: 3,
    draggable: true,
  },
    {
    id: "person",
    kind: "image",
    src: "/person.png",
    top: (68 / 100) * BG_HEIGHT,
    left: (51.3 / 100) * BG_WIDTH,
    width: 1308,
    height: 782,
    zIndex: 4,
    draggable: true,
  },
  {
    id: "front-mountain",
    kind: "image",
    src: "/mountain-front.png",
    top: (25.1 / 100) * BG_HEIGHT,
    left: (15 / 100) * BG_WIDTH,
    width: 1110,
    height: 531,
    zIndex: 4,
    draggable: true,
  },
  {
    id: "cloud-1",
    kind: "image",
    src: "/cloud1.png",
    top: (30.3 / 100) * BG_HEIGHT,
    left: (39.2 / 100) * BG_WIDTH,
    width: 400,
    height: 220,
    zIndex: 2,
    draggable: true,
    animationClass: "cloud-1",
  },
  {
    id: "cloud-2",
    kind: "image",
    src: "/cloud2.png",
    top: (18.4 / 100) * BG_HEIGHT,
    left: (73.5 / 100) * BG_WIDTH,
    width: 551,
    height: 327,
    zIndex: 2,
    draggable: true,
    animationClass: "cloud-2",
  },
  {
    id: "cloud-3",
    kind: "image",
    src: "/cloud3.png",
    top: (19.9 / 100) * BG_HEIGHT,
    left: (23.3 / 100) * BG_WIDTH,
    width: 4888,
    height: 287,
    zIndex: 2,
    draggable: true,
    animationClass: "cloud-3",
  },
  // 🔥 ناحیه‌ی ذرات طلایی
  {
    id: "particles-gold",
    kind: "particles",
    src: "",
    top: (70.8 / 100) * BG_HEIGHT,
    left: (79 / 100) * BG_WIDTH,
    width: 588,
    height: 370,
    zIndex: 5,
    draggable: true,
  },
  // 🔥 ناحیه‌ی ذرات آبی/فانتزی
  {
    id: "particles-blue",
    kind: "particles",
    src: "",
    top: (74.8 / 100) * BG_HEIGHT,
    left: (24 / 100) * BG_WIDTH,
    width: 678,
    height: 427,
    zIndex: 6,
    draggable: true,
  },
  // 🦋 پروانه‌ی GIF
  {
    id: "butterfly-gif",
    kind: "image",
    src: "/gif/butterfly.gif",
    top: (82.2 / 100) * BG_HEIGHT,
    left: (88.8 / 100) * BG_WIDTH,
    width: 281,
    height: 257,
    zIndex: 35,
    draggable: true,
  },
  // {
  //   id: "bird-gif",
  //   kind: "image",
  //   src: "/gif/bird.gif",
  //   top: (40 / 100) * BG_HEIGHT,
  //   left: (60 / 100) * BG_WIDTH,
  //   width: 120,
  //   height: 120,
  //   zIndex: 35,
  //   draggable: true,
  // },
  {
    id: "spider-gif",
    kind: "image",
    src: "/gif/spider.gif",
    top: (87.5 / 100) * BG_HEIGHT,
    left: (29.3 / 100) * BG_WIDTH,
    width: 120,
    height: 120,
    zIndex: 35,
    draggable: true,
  },
];

export function HeroScrollytelling() {
  const [layers, setLayers] = useState<LayerConfig[]>(INITIAL_LAYERS);
  const [debug, setDebug] = useState(true);
  const [activeId, setActiveId] = useState<LayerId | null>(null);

  // رفرنس کانتینری که BG و همه‌ی لایه‌ها داخلش هستن
  const bgRef = useRef<HTMLDivElement | null>(null);

  const layersRef = useRef(layers);
  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  // کلاس انیمیشن (ابرها و هر لایه‌ای که animationClass داشته باشه)
  const getAnimationClass = (layer: LayerConfig) => {
    if (debug) return ""; // تو دیباگ، انیمیشن‌ها خاموش باشن
    return layer.animationClass ?? "";
  };

  // لاگ موقعیت و سایز لایه‌ها
  const logLayers = useCallback(() => {
    const data = layersRef.current.map((l) => ({
      id: l.id,
      top: Number(((l.top / BG_HEIGHT) * 100).toFixed(2)),   // به درصد برای خوندن راحت‌تر
      left: Number(((l.left / BG_WIDTH) * 100).toFixed(2)),
      width: Math.round(l.width),
      height: Math.round(l.height),
      zIndex: l.zIndex,
    }));
    console.log(
      "%c[Hero Debug] Layer configs (percent of BG):",
      "color:#00e6b8;font-weight:bold;"
    );
    console.log(JSON.stringify(data, null, 2));
  }, []);

  // ───── Drag ─────
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
      const startTop = layer.top;   // در واحد BG px
      const startLeft = layer.left; // در واحد BG px

      const onMove = (moveEvent: MouseEvent) => {
        const dxScreen = moveEvent.clientX - startX;
        const dyScreen = moveEvent.clientY - startY;

        // تبدیل حرکت صفحه به مختصات BG
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

  // ───── Resize ─────
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
                  width: Math.max(50, startWidth + dxBg),
                  height: Math.max(50, startHeight + dyBg),
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
  <section className="relative w-full flex justify-center overflow-hidden">
    {/* ✅ Viewport: عرض 100%، ارتفاع ثابت، crop کننده */}
  <div
  className="
    relative w-full overflow-hidden
    h-[1041px]
        max-[1200px]:h-[930px]

    max-[1024px]:h-[730px]
    max-[768px]:h-[600px]
        max-[600px]:h-[650px]
                max-[480px]:h-[550px]


  "
>
      {/* ✅ Stage: ارتفاع 100%، عرض auto بر اساس نسبت BG، وسط چین */}
      <div
        ref={bgRef}
        className="absolute top-0 left-1/2 h-full -translate-x-1/2"
        style={{ aspectRatio: `${BG_WIDTH} / ${BG_HEIGHT}` }}
      >
        {/* دکمه دیباگ روی خود Stage */}
        <button
          onClick={() => setDebug((d) => !d)}
          className="absolute left-4 top-4 z-[10000] rounded-md bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur hover:bg-black/60"
        >
          Debug: {debug ? "ON" : "OFF"}
        </button>

        {/* لایه‌ها */}
        {layers.map((layer) => {
          const isActive = activeId === layer.id;
          const animationClass = getAnimationClass(layer);

          // تبدیل مختصات BG px → درصد از عرض/ارتفاع Stage
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
                      ? "2px solid #00e6b8"
                      : "1px dashed #00e6b8"
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
              <div className={`relative h-full w-full ${animationClass ?? ""}`}>
                {layer.kind === "particles" ? (
                  <FloatingParticles
                    width={layer.width}
                    height={layer.height}
                    count={45}
                    colors={
                      layer.id === "particles-gold"
                        ? ["#ffd66b", "#fffbcc"]
                        : ["#7dd3fc", "#a5b4fc"]
                    }
                  />
                ) : layer.kind === "video" ? (
                  <video
                    src={layer.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full select-none object-cover pointer-events-none"
                  />
                ) : (
                  <Image
                    src={layer.src}
                    alt={layer.id}
                    fill
                    className="select-none object-contain pointer-events-none"
                  />
                )}
              </div>

              {/* Debug UI */}
              {debug && layer.draggable && (
                <>
                  <div className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-black/60 px-2 py-0.5 text-[10px] text-white">
                    {layer.id} — top:{" "}
                    {((layer.top / BG_HEIGHT) * 100).toFixed(1)}% | left:{" "}
                    {((layer.left / BG_WIDTH) * 100).toFixed(1)}% | w:
                    {Math.round(layer.width)} | h:
                    {Math.round(layer.height)}
                  </div>

                  <div
                    onMouseDown={(e) => handleResizeStart(e, layer.id)}
                    className="absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 cursor-se-resize rounded bg-yellow-300 shadow-md"
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