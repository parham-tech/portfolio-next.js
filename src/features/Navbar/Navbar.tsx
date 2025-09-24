"use client";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useThemeContext();

  const themes = [
    { name: "Day", className: "bg-day-gradient" },
    { name: "Green", className: "bg-green-gradient" },
    { name: "Purple", className: "bg-purple-gradient" },
    { name: "Pink", className: "bg-pink-gradient" },
    { name: "Dark", className: "bg-dark-gradient" },
  ];

  return (
    <nav className="flex justify-between items-center py-4 px-8 text-white relative">
      {/* Theme Button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
      className={`px-4 py-2 rounded-xl text-white transition ${theme}`}
        >
          Theme
        </button>

        {open && (
          <div className="absolute mt-2 bg-white text-black rounded-lg shadow-lg p-3 w-56 z-50">
            <ul className="space-y-3">
              {themes.map((t) => (
                <li
                  key={t.name}
                  onClick={() => {
                    setTheme(t.className);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  {/* Radio */}
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === t.className}
                    readOnly
                  />

                  {/* Box with theme color */}
                  <div
                    className={`flex-1 h-10 rounded text-sm flex items-center justify-center font-medium text-white border ${
                      theme === t.className
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-300"
                    } ${t.className}`}
                  >
                    {t.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Menu سمت راست */}
      <ul className="flex gap-8 font-medium">
        <li><a href="#home" className="hover:text-gray-200">Home</a></li>
        <li><a href="#projects" className="hover:text-gray-200">Projects</a></li>
        <li><a href="#skills" className="hover:text-gray-200">Skills</a></li>
        <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
      </ul>
    </nav>
  );
}
