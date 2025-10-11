"use client";
import Image from "next/image";
import { useState } from "react";
import WeatherModal from "@/features/Weather/WeatherModal";
import { useThemeContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";

type HeroProps = {
  monitorRef: React.RefObject<HTMLDivElement>;
};

export default function Hero({ monitorRef }: HeroProps) {
  const [openWeather, setOpenWeather] = useState(false);
  const { prevSite, nextSite, isTransitioning } = useThemeContext();

  // Animations
  const fadeInText = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const fadeInImage = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3, duration: 1, ease: "easeInOut" },
    }),
  };

  return (
    <section
      id="home"
      className=" relative flex flex-col pt-[78px] md:pt-[128px] max-h-[800px] md:flex-row 
             items-center justify-center px-6 md:px-12 pb-12 md:pb-20 text-white"
    >
      {/* Hero Background Layers */}
      <div className={`absolute inset-0 -z-10 ${prevSite}`} />
      <div
        className={`absolute inset-0 -z-10 ${nextSite} transition-bg-hero`}
        style={{ opacity: isTransitioning ? 1 : 0 }}
      />

      {/* Left Text */}
      <motion.div
        className="pt-[env(safe-area-inset-top)] w-2/3 md:w-1/2 space-y-6 text-center md:text-left"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          custom={0}
          variants={fadeInText}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug  "  
          // {mt-20 sm:mt-40 md:mt-0}
        >
          Hi, I’m <span className="text-yellow-400">Parham</span>
        </motion.h1>

        <motion.h2
          custom={1}
          variants={fadeInText}
          className="text-xl sm:text-2xl md:text-3xl font-semibold"
        >
          Front-end Developer
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeInText}
          className="text-base sm:text-lg text-gray-100"
        >
          Welcome to my portfolio website. <br className="hidden sm:block" />
          Glad to have you here. Explore my work and projects.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeInText}
          className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start"
        >
          <button className="px-6 py-2 sm:py-3 bg-blue-700 hover:bg-blue-900 rounded-lg shadow transition w-auto sm:w-auto text-sm md:text-base">
            View My Work
          </button>
          <button className="px-6 py-2 sm:py-3 bg-white text-blue-700 hover:bg-gray-200 rounded-lg shadow transition w-auto sm:w-auto text-sm md:text-base">
            Get in Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Right Images */}
      <motion.div
        ref={monitorRef} // 🔑 اتصال ref برای ScrollPath
        className="relative md:w-1/2 flex justify-center mt-10 md:mt-0"
        initial="hidden"
        animate="visible"
      >
        {/* Monitor Image */}
        <motion.div custom={0} variants={fadeInImage}>
          <Image
            src="/hero-monitor.png"
            alt="Hero"
            width={300}
            height={300}
            className="z-10 w-48 sm:w-56 md:w-72 h-auto"
          />
        </motion.div>

        {/* Cloud Image as Accessible Button */}
        <motion.button
          custom={1}
          variants={fadeInImage}
          type="button"
          aria-label="نمایش وضعیت هوا"
          disabled={isTransitioning}
          onClick={() => setOpenWeather(true)}
          className="absolute -top-12 sm:-top-20 left-1/2 -translate-x-1/2 animate-diagonal cursor-pointer w-28 sm:w-40 md:w-52 h-auto bg-transparent border-none p-0 outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        >
          <Image
            src="/cloud.png"
            alt=""
            width={200}
            height={200}
            draggable={false}
            className="w-full h-auto"
            priority={true}
          />
        </motion.button>

        {openWeather && <WeatherModal onClose={() => setOpenWeather(false)} />}
      </motion.div>
    </section>
  );
}
