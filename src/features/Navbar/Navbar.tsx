"use client";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { Lock, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    activeSite,
    heroEnabled,
    heroTheme,
    applySite,
    toggleHero,
    isTransitioning,
    config,
  } = useThemeContext();

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 text-white relative">
      {/* Left: Theme Button */}
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          disabled={isTransitioning}
          className={`px-4 py-2 rounded-xl text-white transition ${activeSite} ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-expanded={open}
        >
          Theme
        </button>

        {open && (
          <div className="absolute mt-2 text-black rounded-lg shadow-lg p-3 w-40 z-50 -left-3 bg-white">
            <ul className="space-y-3">
              {config.themes.map((t) => {
                const isCurrent = activeSite === t.siteClass;
                const radioOn = isCurrent && heroEnabled && heroTheme === (t.heroClass ?? "");

                return (
                  <li key={t.name} className="flex items-center gap-3">
                    <button
                      onClick={() => applySite(t.siteClass, t.heroClass)}
                      disabled={isTransitioning}
                      className={`flex w-20 h-10 rounded text-sm items-center justify-center font-medium text-white border-2 border-gray-600 transition ${
                        isCurrent ? "ring-2 ring-blue-500" : "ring-1 ring-gray-600"
                      } ${t.siteClass} ${
                        isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      {t.name}
                    </button>

                    {isCurrent ? (
                      <button
                        onClick={() => toggleHero(t.heroClass ?? "")}
                        disabled={isTransitioning}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-in-out ${
                          radioOn ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"
                        } ${isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        aria-pressed={radioOn}
                      >
                        {radioOn && (
                          <span className="w-2.5 h-2.5 bg-white rounded-full transition-all duration-300 ease-in-out" />
                        )}
                      </button>
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center text-gray-400">
                        <Lock size={18} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Right: Desktop Menu */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li><a href="#home" className="hover:text-gray-200">Home</a></li>
        <li><a href="#projects" className="hover:text-gray-200">Projects</a></li>
        <li><a href="#skills" className="hover:text-gray-200">Skills</a></li>
        <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
      </ul>

      {/* Right: Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white text-black rounded-lg shadow-lg w-40 p-4 md:hidden z-50">
          <ul className="flex flex-col gap-4 font-medium">
            <li><a href="#home" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#projects" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#skills" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Skills</a></li>
            <li><a href="#contact" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
