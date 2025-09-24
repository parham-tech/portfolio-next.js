"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
  className="flex flex-col md:flex-row items-center justify-between px-12 py-20 text-white"
    >
      {/* Left Text */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Hi, I’m <span className="text-yellow-400">Parham</span>
        </h1>
        <h2 className="text-2xl font-semibold">Front-end Developer</h2>
        <p className="text-lg text-gray-100">
          Welcome to my portfolio website. <br />
          Glad to have you here. Explore my work and projects.
        </p>
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-blue-700 hover:bg-blue-900 rounded-lg shadow transition">
            View My Work
          </button>
          <button className="px-6 py-3 bg-white text-blue-700 hover:bg-gray-200 rounded-lg shadow transition">
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
    className="z-10"
  />

  <Image
    src="/cloud.png"
    alt="cloud"
    width={200}
    height={200}
    className="absolute -top-20 left-1/3 -translate-x-1/2 animate-diagonal"
  />
</div>

    </section>
  );
}
