'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useThemeContext } from '@/context/ThemeContext';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type ScrollPathProps = {
  monitorRef: React.RefObject<HTMLDivElement>;
  skillsRef: React.RefObject<HTMLHeadingElement>;
  debug?: boolean;
};

type Point = {
  x: number;
  y: number;
};

function getThemeGradient(theme: string) {
  switch (theme) {
    case 'bg-day-gradient':
      return {
        start: '#2D3BCF',
        end: '#ffffff',
        glow: '#5EFFFF',
      };

    case 'bg-green-gradient':
      return {
        start: '#103634',
        end: '#47ff98',
        glow: '#47ff98',
      };

    case 'bg-purple-gradient':
      return {
        start: '#4A00E0',
        end: '#d8b0ff',
        glow: '#b45aff',
      };

    case 'bg-red-gradient':
      return {
        start: '#B52626',
        end: '#20242e',
        glow: '#ff6464',
      };

    case 'bg-dark-gradient':
      return {
        start: '#20242e',
        end: '#9ea4b8',
        glow: '#9db4ff',
      };

    default:
      return {
        start: '#396dd6',
        end: '#ffffff',
        glow: '#5c8aff',
      };
  }
}

function buildSmoothPath(points: Point[], tension = 1) {
  if (points.length < 2) return '';

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

export default function ScrollPath({
  monitorRef,
  skillsRef,
  debug = false,
}: ScrollPathProps) {
  const { activeSite } = useThemeContext();

  const { start, end, glow } = getThemeGradient(activeSite);

  const [docH, setDocH] = useState(0);

  const [points, setPoints] = useState<Point[]>([]);

  const pathRef = useRef<SVGPathElement>(null);

  const trailRef = useRef<SVGPathElement>(null);

  const ballRef = useRef<SVGCircleElement>(null);

  const particleRefs = useRef<SVGCircleElement[]>([]);

  useLayoutEffect(() => {
    let frameId: number;

    let attempts = 0;

    const compute = () => {
      if (!monitorRef.current || !skillsRef.current) {
        attempts++;

        if (attempts < 60) {
          frameId = requestAnimationFrame(compute);
        }

        return;
      }

      const container = document.getElementById('site-container');

      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      const containerTop = containerRect.top + window.scrollY;

      const containerWidth = containerRect.width || 1600;

      const monitor = monitorRef.current;

      const skills = skillsRef.current;

      const m = monitor.getBoundingClientRect();

      const skillsRect = skills.getBoundingClientRect();

      const isMobile = window.innerWidth < 768;

      const isSmallMobile = window.innerWidth < 640;

      const monitorLeft =
        m.left + window.scrollX - containerRect.left - window.scrollX;

      const monitorTop = m.top + window.scrollY - containerTop;

     
      let startPoint: Point;

      if (!isMobile) {
        startPoint = {
          x: monitorLeft + m.width * 0.5 - 80,

          y: monitorTop + m.height * 0.7 + 80,
        };
      } else {
        startPoint = {
          x: monitorLeft + m.width * 0.22,

          y: monitorTop + m.height * 0.95,
        };
      }

      const getX = (percent: number) => containerWidth * percent;

      let mids: Point[];
      let endPoint: Point;

      if (!isMobile) {
        mids = [
          {
            x: getX(0.6),
            y: startPoint.y + m.height * 0.18,
          },

          {
            x: getX(0.85),
            y: startPoint.y + m.height * 0.38,
          },

          {
            x: getX(0.15),
            y: startPoint.y + m.height * 0.55,
          },
        ];

        endPoint = {
          x: getX(0.5),

          y: startPoint.y + m.height * 0.85,
        };
      } else if (isSmallMobile) {
        mids = [
          {
            x: getX(0.2),
            y: startPoint.y + m.height * 0.35,
          },

          {
            x: getX(0.86),
            y: startPoint.y + m.height * 0.6,
          },
        ];

        endPoint = {
          x: getX(0.5),

          y: startPoint.y + m.height * 0.85,
        };
      } else {
        mids = [
          {
            x: getX(0.2),
            y: startPoint.y + m.height * 0.35,
          },

          {
            x: getX(0.8),
            y: startPoint.y + m.height * 0.55,
          },

          {
            x: getX(0.68),
            y: startPoint.y + m.height * 0.78,
          },
        ];

        endPoint = {
          x: getX(0.5),

          y: startPoint.y + m.height * 0.92,
        };
      }

      const nextPoints = [startPoint, ...mids, endPoint];

      setPoints(nextPoints);

      const skillsBottom = skillsRect.bottom + window.scrollY - containerTop;

      const pathBottom = endPoint.y + 50;

      const localHeight = Math.max(
        skillsBottom,
        pathBottom,
        window.innerHeight
      );

      setDocH(localHeight);
    };

    compute();

    window.addEventListener('resize', compute);

    const ro = new ResizeObserver(compute);

    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener('resize', compute);

      ro.disconnect();
    };
  }, [monitorRef, skillsRef]);

  const pathD = useMemo(
    () => buildSmoothPath(points, 1),

    [points]
  );

  useEffect(() => {
    if (!pathRef.current || !ballRef.current || !pathD) return;

    const len = pathRef.current.getTotalLength();

    gsap.set(trailRef.current, {
      strokeDasharray: len,
      strokeDashoffset: len,
    });

    gsap.set(ballRef.current, {
      opacity: 0,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'none',
      },

      scrollTrigger: {
        trigger: document.documentElement,

        start: 'top top',

        endTrigger: skillsRef.current,

        end: 'top center',

        scrub: true,

        onUpdate: (self) => {
          gsap.set(trailRef.current, {
            strokeDashoffset: len * (1 - (self.progress || 0)),
          });

          if (self.progress > 0.01) {
            gsap.to(ballRef.current, {
              opacity: 1,
              duration: 0.3,
            });
          }
        },
      },
    });

    tl.to(ballRef.current, {
      motionPath: {
        path: pathRef.current,

        align: pathRef.current,

        alignOrigin: [0.5, 0.5],
      },
    } as any);

    particleRefs.current.forEach((p, i) => {
      gsap.to(p, {
        motionPath: {
          path: pathRef.current,

          align: pathRef.current,
        },

        duration: 6 + i * 0.5,

        repeat: -1,

        ease: 'none',

        delay: i * 0.3,

        opacity: gsap.utils.random(0.3, 0.9),
      } as any);
    });

    const skillsTitle = skillsRef.current;

    const listContainer = document.querySelector('[data-skills-list]');

    const skillCards = document.querySelectorAll('.skill-card');

    if (skillsTitle && listContainer && skillCards.length > 0) {
      ScrollTrigger.create({
        trigger: skillsRef.current,

        start: 'top 80%',

        end: 'bottom 60%',

        onEnter: () => {
          gsap.to(skillsTitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          });

          gsap.to(listContainer, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
          });

          gsap.to(skillCards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.4,
          });
        },

        onLeaveBack: () => {
          gsap.to(
            [skillsTitle, listContainer, skillCards],

            {
              opacity: 0,

              y: 40,

              duration: 0.5,

              stagger: 0.05,
            }
          );
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
    <svg
      className="
        absolute
        left-0
        top-0
        w-full
        pointer-events-none
        z-[1000]
      "
      style={{
        height: docH,
      }}
    >
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

      {/* 🟡 نقاط دیباگ */}

      {debug &&
        points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={10}
            fill={
              i === 0 ? 'limegreen' : i === points.length - 1 ? 'red' : 'orange'
            }
            stroke="white"
            strokeWidth={2}
          />
        ))}

      {/* مسیر اصلی برای GSAP */}

      <path ref={pathRef} d={pathD} fill="none" stroke="transparent" />

      {/* مسیر قابل مشاهده */}

      <path
        ref={trailRef}
        d={pathD}
        stroke="url(#pathGradient)"
        strokeWidth="4"
        fill="none"
        filter="url(#glow)"
      />

      {/* توپ متحرک */}

      <circle ref={ballRef} r={8} fill={glow} />

      {/* ذرات */}

      {[...Array(15)].map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            if (el) {
              particleRefs.current[i] = el;
            }
          }}
          r={gsap.utils.random(2, 5)}
          fill={glow}
          opacity={0.5}
        />
      ))}
    </svg>
  );
}
