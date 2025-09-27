"use client";
import Image from "next/image";
import { useState } from "react";
import WeatherModal from "@/features/Weather/WeatherModal";
import { useThemeContext } from "@/context/ThemeContext";

export default function Hero() {
  const [openWeather, setOpenWeather] = useState(false);
  const { prevHero, nextHero, isTransitioning } = useThemeContext();

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-20 text-white"
    >
      {/* Hero layers */}
      <div className={`absolute inset-0 -z-10 ${prevHero}`} />
      <div
        className={`absolute inset-0 -z-10 ${nextHero} transition-bg-hero`}
        style={{ opacity: isTransitioning ? 1 : 0 }}
      />

      {/* Left Text */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
          Hi, I’m <span className="text-yellow-400">Parham</span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Front-end Developer
        </h2>
        <p className="text-base sm:text-lg text-gray-100">
          Welcome to my portfolio website. <br className="hidden sm:block" />
          Glad to have you here. Explore my work and projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
          <button className="px-6 py-3 bg-blue-700 hover:bg-blue-900 rounded-lg shadow transition w-full sm:w-auto">
            View My Work
          </button>
          <button className="px-6 py-3 bg-white text-blue-700 hover:bg-gray-200 rounded-lg shadow transition w-full sm:w-auto">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Right Images */}
      <div className="relative md:w-1/2 flex justify-center mt-10 md:mt-0">
        <Image
          src="/hero-monitor.png"
          alt="Hero"
          width={300}
          height={300}
          className="z-10 w-48 sm:w-64 md:w-72 h-auto"
        />
        <Image
          src="/cloud.png"
          alt="cloud"
          width={200}
          height={200}
          onClick={() => !isTransitioning && setOpenWeather(true)}
          className="absolute -top-12 sm:-top-20 left-1/2 -translate-x-1/2 animate-diagonal cursor-pointer w-28 sm:w-40 md:w-52 h-auto"
        />
        {openWeather && <WeatherModal onClose={() => setOpenWeather(false)} />}
      </div>
    </section>
  );
}
