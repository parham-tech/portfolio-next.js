"use client";
import React, { useMemo, useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";

type CardProps = {
  src: string;
  title: string;
  transform: string;
  cardW: number;
  cardH: number;
  onClick: () => void;
};

const Card = React.memo(
  ({ src, title, transform, cardW, cardH, onClick }: CardProps) => (
    <div
      className="absolute transition-transform duration-300 hover:scale-105 cursor-pointer"
      style={{
        width: cardW,
        height: cardH,
        transform,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onClick={onClick}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        draggable={false}
        sizes="(max-width: 640px) 120px, (max-width: 768px) 180px, 240px"
      />
        <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2 text-sm font-medium">
          {title}
        </div>
      </div>
    </div>
  )
);
Card.displayName = "Card";

interface ThreeDCarouselProps {
  projects: { id: string; title: string; image: string }[];
  radius?: number;
  cardW?: number;
  cardH?: number;
  onProjectClick: (id: string) => void;
}

export default function ThreeDCarousel({
  projects,
  radius = 240,
  cardW = 180,
  cardH = 240,
  onProjectClick,
}: ThreeDCarouselProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const initialRotationRef = useRef(0);
  const animationRef = useRef<number>();
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) rotationRef.current += 0.05;
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleDragStart = useCallback((clientX: number) => {
    isDraggingRef.current = true;
    dragStartRef.current = clientX;
    initialRotationRef.current = rotationRef.current;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = clientX - dragStartRef.current;
    rotationRef.current = initialRotationRef.current + delta * 0.5;
  }, []);

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 768;
  const dynamicCardW = isMobile ? 120 : 180;
  const dynamicCardH = isMobile ? 170 : 240;
  const dynamicRadius = isMobile ? 170 : radius;
  const containerH = isMobile ? 340 : isTablet ? 400 : 500;

  const cards = useMemo(
    () =>
      projects.map((p, i) => {
        const angle = (i * 360) / projects.length;
        return {
          ...p,
          transform: `rotateY(${angle}deg) translateZ(${dynamicRadius}px)`,
        };
      }),
    [projects, dynamicRadius]
  );

  const handleCardClick = (id: string) => {
    console.log("Card clicked:", id);
    onProjectClick(id);
  };

  return (
    <div
      className="grid place-items-center w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ height: containerH }}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="relative w-full h-full max-w-6xl"
        style={{ perspective: 1800 }}
      >
        <div
          ref={wheelRef}
          className="absolute inset-0 grid place-items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              src={card.image}
              title={card.title}
              transform={card.transform}
              cardW={dynamicCardW}
              cardH={dynamicCardH}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
