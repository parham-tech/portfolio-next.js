"use client";

import { useRef } from "react";
import { Hero } from "@/features/Hero";
import { LandingSkills } from "@/features/LandingSkills";
import { ScrollPath } from "@/components/ScrollPath";
import { LandingProjects } from "@/features/LandingProjects";

export default function HomePageClient() {
  const monitorRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
        <h1 className="sr-only">Parham Shirinkam – Frontend Developer Portfolio</h1>
      <p className="sr-only">
        Parham Shirinkam frontend developer specializing in React and Next.js. Explore projects, skills, and experience.
      </p>
      <Hero monitorRef={monitorRef} />
      <ScrollPath monitorRef={monitorRef} skillsRef={skillsRef} />
      <LandingSkills skillsRef={skillsRef} />

      {/* 📂 بخش پروژه‌ها در هر دو حالت یکیه */}
      <LandingProjects />
    </>
  );
}
