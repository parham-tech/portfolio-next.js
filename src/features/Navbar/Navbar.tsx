"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { Menu, X } from "lucide-react";
import ThemeSwitcherCarousel from "@/components/ThemeSwitcherCarousel";
import { useStoryMode } from "@/context/StoryModeContext";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { activeSite, prevSite, isTransitioning, applySite, config } = useThemeContext();
  const { isStoryMode } = useStoryMode();
  const [navColor, setNavColor] = useState<string>("#ffffff");
  // 🔹 بستن theme dropdown با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setThemeOpen(false);
      }
    }
    if (themeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [themeOpen]);

  // 🔹 افکت تیره‌تر شدن Navbar با اسکرول
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 در حالت Story: رنگ متن ناوبار بر اساس یک‌سوم بالایی HeroScrollytelling
  useEffect(() => {
    const compute = () => {
      if (!isStoryMode) {
        setNavColor("#ffffff");
        return;
      }
      const hero = document.getElementById("story-hero");
      if (!hero) return;
      const top = hero.offsetTop;
      const h = hero.offsetHeight || 1;
      const threshold = top + h / 3;
      const y = window.scrollY;
      setNavColor(y < threshold ? "#000000" : "#ffffff");
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [isStoryMode]);

  // 🔹 استایل لینک‌ها
  const linkClasses = (path: string) =>
    pathname === path
      ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
      : "hover:text-gray-200 transition";

  const mobileLinkClasses = (path: string) =>
    pathname === path
      ? "text-yellow-400 font-bold"
      : "hover:text-gray-600 transition";

  return (
    <nav className="navbar-overlay fixed top-0 w-full max-w-[1600px] z-50 backdrop-blur-lg" style={{ color: navColor, transition: "color 200ms ease" }}>
      <div className="flex justify-between items-center py-4 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative flex items-center gap-3">
          {!isStoryMode && (
            <div className="relative flex items-center gap-3" ref={themeRef}>
              <div className="relative">
                <div className={`absolute inset-0 rounded-xl ${prevSite}`} />
                <div
                  className={`absolute inset-0 rounded-xl ${activeSite} transition-bg-site`}
                  style={{ opacity: isTransitioning ? 1 : 0 }}
                />
                <button
                  onClick={() => setThemeOpen((o) => !o)}
                  disabled={isTransitioning}
                  className={`relative px-[.7rem] py-[.3rem] theme-button:px-4 theme-button:py-2 rounded-xl text-white font-medium z-10 backdrop-blur-sm transition-all duration-500 border border-white/20 shadow-lg ${
                    isTransitioning ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                  }`}
                >
                  Theme
                </button>
                {themeOpen && (
                  <div className="absolute theme-button:-left-12 -left-[2.2rem] md:-left-[2.9rem] mt-2 rounded-lg shadow-lg theme-button:p-3 p-2 z-50 min-w-0 theme-button:min-w-[170px] dark:bg-gray-900 backdrop-blur-md">
                    <ThemeSwitcherCarousel
                      activeSite={activeSite}
                      applySite={applySite}
                      isTransitioning={isTransitioning}
                      config={config}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <Link
            href="/story"
            className="px-3 py-2 rounded-xl text-sm font-medium border transition bg-white/10 border-white/30 hover:bg-white/20"
          >
            Story
          </Link>
        </div>
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <Link href="/" className={linkClasses("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className={linkClasses("/projects")}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/skills" className={linkClasses("/skills")}>
              Skills
            </Link>
          </li>
          <li>
            <Link href="/contact" className={linkClasses("/contact")}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle mobile menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white/90 dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg w-40 p-4 md:hidden backdrop-blur-md">
          <ul className="flex flex-col gap-4 font-medium">
            <li>
              <Link href="/" className={mobileLinkClasses("/")} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className={mobileLinkClasses("/projects")} onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link href="/skills" className={mobileLinkClasses("/skills")} onClick={() => setMenuOpen(false)}>
                Skills
              </Link>
            </li>
            <li>
              <Link href="/contact" className={mobileLinkClasses("/contact")} onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
