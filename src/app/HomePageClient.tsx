"use client";

import { useRef } from "react";
import { Hero } from "@/features/Hero";
import { LandingSkills } from "@/features/LandingSkills";
import { ScrollPath } from "@/components/ScrollPath";

export default function HomePageClient() {
  const monitorRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <Hero monitorRef={monitorRef} />
      <ScrollPath monitorRef={monitorRef} skillsRef={skillsRef}  />
      <LandingSkills skillsRef={skillsRef} />
    </>
  );
}
