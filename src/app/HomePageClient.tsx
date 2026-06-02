"use client";

import { useRef } from "react";
import { Hero } from "@/features/Hero";
import { LandingSkills } from "@/features/LandingSkills";
import { ScrollPath } from "@/components/ScrollPath";
import { LandingProjects } from "@/features/LandingProjects";
import { useStoryMode } from "@/context/StoryModeContext";
import { StoryModeScene } from "@/features/StoryModeScene/StoryModeScene";

export default function HomePageClient() {
  const monitorRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLHeadingElement>(null);
  const { isStoryMode } = useStoryMode();

  return (
    <>
      {isStoryMode ? (
                  <StoryModeScene />

      ) : (
        <>
          {/* 🎯 حالت معمولی مانیتور + ScrollPath */}
          <Hero monitorRef={monitorRef} />
          <ScrollPath monitorRef={monitorRef} skillsRef={skillsRef} />

          {/* 🧩 Skills معمولی */}
          <LandingSkills skillsRef={skillsRef} />
        </>
      )}

      {/* 📂 بخش پروژه‌ها در هر دو حالت یکیه */}
      <LandingProjects />
    </>
  );
}
