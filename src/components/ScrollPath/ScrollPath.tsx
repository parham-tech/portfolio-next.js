"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useThemeContext } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type ScrollPathProps = {
  monitorRef: React.RefObject<HTMLDivElement>;
  skillsRef: React.RefObject<HTMLHeadingElement>;
  debug?: false;
};

type Point = { x: number; y: number };

// 🎨 رنگ مسیر بر اساس تم فعال
function getThemeGradient(theme: string) {
  switch (theme) {
    case "bg-day-gradient":
      return { start: "#2D3BCF", end: "#ffffff", glow: "#5EFFFF" };
    case "bg-green-gradient":
      return { start: "#103634", end: "#47ff98", glow: "#47ff98" };
    case "bg-purple-gradient":
      return { start: "#4A00E0", end: "#d8b0ff", glow: "#b45aff" };
    case "bg-red-gradient":
      return { start: "#B52626", end: "#20242e", glow: "#ff6464" };
    case "bg-dark-gradient":
      return { start: "#20242e", end: "#9ea4b8", glow: "#9db4ff" };
    default:
      return { start: "#396dd6", end: "#ffffff", glow: "#5c8aff" };
  }
}

function buildSmoothPath(points: Point[], tension = 1) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export default function ScrollPath({ monitorRef, skillsRef, debug = false }: ScrollPathProps) {
  const { activeSite } = useThemeContext();
  const { start, end, glow } = getThemeGradient(activeSite);

  const [docH, setDocH] = useState<number>(0);
  const [points, setPoints] = useState<Point[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<SVGCircleElement>(null);
  const particleRefs = useRef<SVGCircleElement[]>([]);

  // 🧮 محاسبه نقاط مسیر
  useLayoutEffect(() => {
    if (!monitorRef.current) return;
    const compute = () => {
      const m = monitorRef.current!.getBoundingClientRect();
      const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) || window.innerHeight;
      setDocH(h);
      const containerWidth = Math.min(window.innerWidth, 1600);
      const offsetX = (window.innerWidth - containerWidth) / 2;
      const isMobile = window.innerWidth < 768;
      const isSmallMobile = window.innerWidth < 640;

      let startPoint: Point;
      if (!isMobile) {
        startPoint = { x: m.left + window.scrollX + m.width * 0.5 - 80, y: m.top + window.scrollY + m.height * 0.7 + 80 };
      } else if (isSmallMobile) {
        startPoint = { x: m.left + window.scrollX + m.width * 0.22, y: m.top + window.scrollY + m.height * 0.95 };
      } else {
        startPoint = { x: m.left + window.scrollX + m.width * 0.22, y: m.top + window.scrollY + m.height * 0.95 };
      }

      let mids: Point[];
      let end: Point;
      if (!isMobile) {
        mids = [
          { x: offsetX + containerWidth * 0.6, y: startPoint.y + m.height * 0.18 },
          { x: offsetX + containerWidth * 0.85, y: startPoint.y + m.height * 0.38 },
          { x: offsetX + containerWidth * 0.19, y: startPoint.y + m.height * 0.46 },
          { x: offsetX + containerWidth * 0.31, y: startPoint.y + m.height * 0.67 },
        ];
        end = { x: offsetX + containerWidth * 0.5, y: startPoint.y + m.height * 0.83 };
      } else if (isSmallMobile) {
        mids = [
          { x: offsetX + containerWidth * 0.2, y: startPoint.y + m.height * 0.35 },
          { x: offsetX + containerWidth * 0.8, y: startPoint.y + m.height * 0.52 },
        ];
        end = { x: offsetX + containerWidth * 0.5, y: startPoint.y + m.height * 0.85 };
      } else {
        mids = [
          { x: offsetX + containerWidth * 0.2, y: startPoint.y + m.height * 0.35 },
          { x: offsetX + containerWidth * 0.8, y: startPoint.y + m.height * 0.55 },
          { x: offsetX + containerWidth * 0.68, y: startPoint.y + m.height * 0.78 },
        ];
        end = { x: offsetX + containerWidth * 0.5, y: startPoint.y + m.height * 0.92 };
      }

      setPoints([startPoint, ...mids, end]);
    };

    compute();
    window.addEventListener("resize", compute);
    const ro = new ResizeObserver(compute);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", compute);
      ro.disconnect();
    };
  }, [monitorRef, skillsRef]);

  const pathD = useMemo(() => buildSmoothPath(points, 1), [points]);

  // ⚙️ انیمیشن GSAP
  useEffect(() => {
    if (!pathRef.current || !ballRef.current || !pathD) return;
    const len = pathRef.current.getTotalLength();
    gsap.set(trailRef.current, { strokeDasharray: len, strokeDashoffset: len });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "85% bottom",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(trailRef.current, { strokeDashoffset: len * (1 - (self.progress || 0)) });
        },
      },
    });

    tl.to(ballRef.current, {
      // @ts-ignore
      motionPath: { path: pathRef.current, align: pathRef.current, alignOrigin: [0.5, 0.5] },
    });

    // 🌌 ذرات
    particleRefs.current.forEach((p, i) => {
      gsap.to(p, {
        // @ts-ignore
        motionPath: { path: pathRef.current, align: pathRef.current },
        duration: 6 + i * 0.5,
        repeat: -1,
        ease: "none",
        delay: i * 0.3,
        opacity: gsap.utils.random(0.3, 0.9),
      });
    });

    // ✨ نمایش My Skills
    const skillsTitle = skillsRef.current;
    const listContainer = document.querySelector("[data-skills-list]");
    const skillCards = document.querySelectorAll(".skill-card");

    if (skillsTitle && listContainer && skillCards.length > 0) {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "90% bottom",
        end: "bottom bottom",
        onEnter: () => {
          gsap.to(skillsTitle, { opacity: 1, y: 0, duration: 0.8 });
          gsap.to(listContainer, { opacity: 1, y: 0, duration: 1, delay: 0.2 });
          gsap.to(skillCards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.4 });
        },
        onLeaveBack: () => {
          gsap.to([skillsTitle, listContainer, skillCards], { opacity: 0, y: 40, duration: 0.5, stagger: 0.05 });
        },
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [pathD, skillsRef, start, end, glow]);

  if (!docH) return null;

  return (
    <svg className="absolute left-0 top-0 w-full pointer-events-none z-[1000]" style={{ height: docH }}>
      <defs>
        <linearGradient id="pathGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={start} />
          <stop offset="100%" stopColor={end} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
{/* 🟡 نقاط دیباگ (فقط نمایش، بدون Drag) */}
{debug &&
  points.map((p, i) => (
    <circle
      key={i}
      cx={p.x}
      cy={p.y}
      r={10}
      fill={i === 0 ? "limegreen" : i === points.length - 1 ? "red" : "orange"}
      stroke="white"
      strokeWidth={2}
    />
  ))
}

      <path ref={pathRef} d={pathD} fill="none" stroke="transparent" />
      <path ref={trailRef} d={pathD} stroke="url(#pathGradient)" strokeWidth="4" fill="none" filter="url(#glow)" />
      <circle ref={ballRef} r={8} fill={glow} />

      {[...Array(15)].map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            if (el) particleRefs.current[i] = el;
          }}
          r={gsap.utils.random(2, 5)}
          fill={glow}
          opacity={0.5}
        />
      ))}
    </svg>
    
  );
  
}
