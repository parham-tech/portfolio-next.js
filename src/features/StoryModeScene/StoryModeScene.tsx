'use client';

import { HeroScrollytelling } from "@/features/HeroScrollytelling/HeroScrollytelling";
import { LowerSectionParallax } from "@/features/StoryModeScene/LowerSectionParallax";

export function StoryModeScene() {
  return (
    <section className="relative w-full">
      <div className="relative z-[10] w-full">
        <HeroScrollytelling />
      </div>

      <LowerSectionParallax />
    </section>
  );
}
