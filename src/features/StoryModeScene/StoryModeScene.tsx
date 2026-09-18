'use client';

import { useState, useEffect } from 'react';
import { HeroScrollytelling } from "@/features/HeroScrollytelling/HeroScrollytelling";
import { LowerSectionParallax } from "@/features/StoryModeScene/LowerSectionParallax";

export function StoryModeScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let active = true;

    // Minimum delay to prevent flickering and show smooth animation
    const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 1500));

    const checkAssets = () => {
      if (!active) return;

      // 1. Check all images
      const images = Array.from(document.querySelectorAll("img"));
      const imagesLoaded = images.every((img) => img.complete);

      // 2. Check all videos
      const videos = Array.from(document.querySelectorAll("video"));
      const videosLoaded = videos.every((vid) => vid.readyState >= 3); // HAVE_FUTURE_DATA

      if (imagesLoaded && videosLoaded) {
        // All currently mounted images and videos are loaded
        minDelayPromise.then(() => {
          if (active) {
            setIsFadingOut(true);
            setTimeout(() => {
              if (active) setIsLoading(false);
            }, 600); // duration of fade-out transition
          }
        });
      } else {
        // If not loaded, re-check on load events
        let remaining = images.length + videos.length;
        if (remaining === 0) {
          minDelayPromise.then(() => {
            if (active) {
              setIsFadingOut(true);
              setTimeout(() => {
                if (active) setIsLoading(false);
              }, 600);
            }
          });
          return;
        }

        const decrement = () => {
          remaining--;
          if (remaining <= 0) {
            minDelayPromise.then(() => {
              if (active) {
                setIsFadingOut(true);
                setTimeout(() => {
                  if (active) setIsLoading(false);
                }, 600);
              }
            });
          }
        };

        images.forEach((img) => {
          if (img.complete) {
            decrement();
          } else {
            img.addEventListener("load", decrement);
            img.addEventListener("error", decrement);
          }
        });

        videos.forEach((vid) => {
          if (vid.readyState >= 3) {
            decrement();
          } else {
            vid.addEventListener("canplaythrough", decrement);
            vid.addEventListener("error", decrement);
          }
        });
      }
    };

    // Run check initially and also on window load as backup
    if (document.readyState === "complete") {
      checkAssets();
    } else {
      const handleWindowLoad = () => {
        checkAssets();
      };
      window.addEventListener("load", handleWindowLoad);
      
      // Fallback check after component mounted to catch dynamic changes
      const interval = setInterval(checkAssets, 200);

      // Maximum safety timeout (5 seconds) to ensure page is shown even if an asset fails/hangs
      const safetyTimeout = setTimeout(() => {
        if (active) {
          setIsFadingOut(true);
          setTimeout(() => {
            if (active) setIsLoading(false);
          }, 600);
        }
      }, 5000);

      return () => {
        active = false;
        window.removeEventListener("load", handleWindowLoad);
        clearInterval(interval);
        clearTimeout(safetyTimeout);
      };
    }

    // Maximum safety timeout (5 seconds) to ensure page is shown even if an asset fails/hangs
    const safetyTimeout = setTimeout(() => {
      if (active) {
        setIsFadingOut(true);
        setTimeout(() => {
          if (active) setIsLoading(false);
        }, 600);
      }
    }, 5000);

    const interval = setInterval(checkAssets, 200);

    return () => {
      active = false;
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 bg-black flex flex-col items-center justify-center text-white font-sans gap-4 z-[9999] transition-opacity duration-500 ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          dir="rtl"
        >
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold animate-pulse text-yellow-400">در حال بارگذاری داستان تعاملی...</p>
          <p className="text-sm text-gray-400">لطفاً شکیبا باشید، جلوه‌های بصری در حال آماده‌سازی هستند.</p>
        </div>
      )}

      <section className="relative w-full">
        <div className="relative z-[10] w-full">
          <HeroScrollytelling />
        </div>

        <LowerSectionParallax />
      </section>
    </>
  );
}
