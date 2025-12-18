"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { skills } from "@/features/Skills/SkillsData";
import { useThemeContext } from "@/context/ThemeContext";

type LandingSkillsProps = {
  skillsRef: React.RefObject<HTMLHeadingElement>;
};

export default function LandingSkills({ skillsRef }: LandingSkillsProps) {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { activeSite } = useThemeContext(); // 🎨 تم فعال سایت

  // 🔹 نگاشت تم سایت به تم باکس (گرادینت تا سفید)
  const boxThemes: Record<string, string> = {
    "bg-day-gradient": "box-day-gradient",
    "bg-green-gradient": "box-green-gradient",
    "bg-purple-gradient": "box-purple-gradient",
    "bg-red-gradient": "box-red-gradient",
    "bg-dark-gradient": "box-dark-gradient",
  };

  const activeBoxTheme = boxThemes[activeSite] || "box-day-gradient";

  const allItems = skills.flatMap((group) => group.items);
  const firstRow = allItems.slice(0, 7);
  const secondRow = allItems.slice(7, 14);

  return (
    <section className="relative flex flex-col justify-center pt-16 sm:pt-24 pb-10 sm:pb-16 overflow-hidden">
      {/* 🔹 عنوان My Skills */}
      <h2
        ref={skillsRef}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16 text-gray-900 dark:text-white opacity-0 translate-y-6"
      >
        My Skills
      </h2>

      {/* 🔸 باکس مهارت‌ها */}
      <div
        ref={listContainerRef}
        data-skills-list
        className={`z-10 mx-auto w-[95%] sm:w-[90%] rounded-2xl sm:rounded-3xl border p-4 sm:p-[1.2rem] flex flex-col gap-4 xs:gap-[1.2rem] sm:gap-8
        opacity-0 translate-y-10 shadow-lg backdrop-blur-md transition-all duration-700 ${activeBoxTheme}`}
      >
        {/* 🧭 ردیف اول */}
        <div className="overflow-hidden">
          <motion.ul
            className="flex gap-4 md:gap-8 min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {[...firstRow, ...firstRow].map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <li
                  key={skill.name + idx}
                  className="skill-card flex flex-col items-center justify-center w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[rgb(32,32,32)] dark:bg-gray-800 rounded-lg sm:rounded-xl shadow p-3 sm:p-4 flex-shrink-0 opacity-0 translate-y-10"
                >
                  {Icon && <Icon className={`${skill.color} text-2xl sm:text-3xl md:text-4xl mb-2`} />}
                  <p className="text-sm sm:text-base font-medium line-clamp-2 text-center">
                    {skill.name}
                  </p>
                  <span className="text-xs sm:text-sm text-gray-500 line-clamp-1 text-center">
                    {skill.level}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* 🧭 ردیف دوم */}
        <div className="overflow-hidden">
          <motion.ul
            className="flex gap-4 sm:gap-8 min-w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {[...secondRow, ...secondRow].map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <li
                  key={skill.name + idx}
                  className="skill-card flex flex-col items-center justify-center w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[rgb(32,32,32)] dark:bg-gray-800 rounded-lg sm:rounded-xl shadow p-3 sm:p-4 flex-shrink-0 opacity-0 translate-y-10"
                >
                  {Icon && <Icon className={`${skill.color} text-2xl sm:text-3xl md:text-4xl mb-2`} />}
                  <p className="text-sm sm:text-base font-medium line-clamp-2 text-center">
                    {skill.name}
                  </p>
                  <span className="text-xs sm:text-sm text-gray-500 line-clamp-1 text-center">
                    {skill.level}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
