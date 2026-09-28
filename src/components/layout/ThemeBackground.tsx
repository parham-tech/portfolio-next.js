"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { useStoryMode } from "@/context/StoryModeContext";

export function ThemeBackground() {
  const { prevSite, nextSite, isTransitioning } = useThemeContext();
  const { isStoryMode } = useStoryMode();

  // ⛔ وقتی Story فعاله، بک‌گراند گرادینتی رو کلاً غیر فعال کن
  if (isStoryMode) {
    return null;
  }

  return (
    <>
      <div className={`fixed inset-0 -z-20 ${prevSite}`} />
      <div
        className={`fixed inset-0 -z-10 ${nextSite} transition-bg-site`}
        style={{ opacity: isTransitioning ? 1 : 0 }}
      />
    </>
  );
}
