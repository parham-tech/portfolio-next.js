"use client";
import { motion } from "framer-motion";

const colors = [
  { hex: "#090A0D" },
  { hex: "#3A3E43" },
  { hex: "#868B97" },
  { hex: "#E17709" },
  { hex: "#B8612F" },
  { hex: "#EBA14D" },
];

export default function ColorFlowPalette() {
  return (
  <div className="relative w-full h-full flex flex-col items-center justify-center text-white overflow-hidden rounded-xl">
  {/* 🎥 ویدیو */}
  <motion.video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full  z-0"
  >
    <source src="/videos/colorflow-bg.mp4" type="video/mp4" />
  </motion.video>

  {/* 🎨 والد مستطیل‌ها با عرض کامل */}
  <div className="relative z-10 flex flex-col gap-4 items-center w-full">
    {colors.map((color) => (
      <motion.div
        key={color.hex}
        className="w-[25%] md:w-[30%] h-8 md:h-12 rounded-lg flex items-center justify-center font-mono cursor-pointer select-none"
        style={{ backgroundColor: color.hex }}
          whileHover={{
              scale: 1.06,
              boxShadow: `0 0 25px ${color.hex}80`,
              filter: "brightness(1.2)",
              borderColor: "#fff",
            }}
            whileTap={{ scale: 0.95, opacity: 0.8 }}
            onClick={() => navigator.clipboard.writeText(color.hex)}
          >
        {color.hex}
      </motion.div>
    ))}
  </div>
</div>

  );
}
