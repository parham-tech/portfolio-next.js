"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { Menu, X } from "lucide-react";
import ThemeSwitcherCarousel from "@/components/ThemeSwitcherCarousel";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
const { activeSite, prevSite, isTransitioning, applySite, config } = useThemeContext();

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
    <nav className="navbar-overlay fixed top-0 left-0 w-full max-w-[1600px] z-50">
<div className={`absolute inset-0 -z-10 ${prevSite}`} />
<div
  className={`absolute inset-0 -z-10 ${activeSite} transition-bg-site`}
  style={{ opacity: isTransitioning ? 1 : 0 }}
/>

<div className="flex justify-between items-center py-4 px-6 md:px-12 text-white max-w-7xl mx-auto">
  {/* 🔹 Theme Selector */}
  <div className="relative" ref={themeRef}>
    {/* دکمه تم با گرادینت و ترنزیشن هماهنگ */}
    <div className="relative">
      <div className={`absolute inset-0 rounded-xl ${prevSite}`} />
      <div
        className={`absolute inset-0 rounded-xl ${activeSite} transition-bg-site`}
        style={{ opacity: isTransitioning ? 1 : 0 }}
      />
      <button
        onClick={() => setThemeOpen((o) => !o)}
        disabled={isTransitioning}
        className={`relative px-4 py-2 rounded-xl text-white font-medium z-10 backdrop-blur-sm 
          transition-all duration-500 border border-white/20 shadow-lg
          ${isTransitioning ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
      >
        Theme
      </button>
    </div>

    {themeOpen && (
      <div className="absolute -left-12 mt-2 rounded-lg shadow-lg p-3 z-50 min-w-[170px] dark:bg-gray-900 backdrop-blur-md">
        <ThemeSwitcherCarousel
          activeSite={activeSite}
          applySite={applySite}
          isTransitioning={isTransitioning}
          config={config}
        />
      </div>
    )}
  </div>


        {/* 🔹 Desktop Links */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li><Link href="/" className={linkClasses("/")}>Home</Link></li>
          <li><Link href="/projects" className={linkClasses("/projects")}>Projects</Link></li>
          <li><Link href="/skills" className={linkClasses("/skills")}>Skills</Link></li>
          <li><Link href="/contact" className={linkClasses("/contact")}>Contact</Link></li>
        </ul>

        {/* 🔹 Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 🔹 Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-6 bg-white/90 dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg w-40 p-4 md:hidden backdrop-blur-md">
            <ul className="flex flex-col gap-4 font-medium">
              <li>
                <Link href="/" className={mobileLinkClasses("/")} onClick={() => setMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link href="/projects" className={mobileLinkClasses("/projects")} onClick={() => setMenuOpen(false)}>Projects</Link>
              </li>
              <li>
                <Link href="/skills" className={mobileLinkClasses("/skills")} onClick={() => setMenuOpen(false)}>Skills</Link>
              </li>
              <li>
                <Link href="/contact" className={mobileLinkClasses("/contact")} onClick={() => setMenuOpen(false)}>Contact</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
