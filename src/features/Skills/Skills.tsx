"use client";
import { motion } from "framer-motion";

// Icons
import { 
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, 
  FaSearch, FaTachometerAlt, FaPalette 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiNextdotjs, SiTypescript, SiDotnet 
} from "react-icons/si";
import { MdAccessibilityNew } from "react-icons/md";

const skills = [
  {
    category: "Frontend Development",
    items: [
      { name: "HTML", level: "Advanced", icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
      { name: "CSS", level: "Advanced", icon: <FaCss3Alt className="text-blue-500 text-3xl" /> },
      { name: "JavaScript (ES6+)", level: "Intermediate", icon: <FaJsSquare className="text-yellow-400 text-3xl" /> },
      { name: "TailwindCSS", level: "Advanced", icon: <SiTailwindcss className="text-cyan-400 text-3xl" /> },
      { name: "React.js", level: "Intermediate", icon: <FaReact className="text-blue-400 text-3xl" /> },
      { name: "Next.js + TypeScript", level: "Intermediate", icon: <SiNextdotjs className="text-black dark:text-white text-3xl" /> },
      { name: "TypeScript", level: "Beginner+", icon: <SiTypescript className="text-blue-600 text-3xl" /> },
    ],
  },
  {
    category: "Backend & Architecture",
    items: [
      { name: ".NET Core", level: "Intermediate", icon: <SiDotnet className="text-purple-500 text-3xl" /> },
    ],
  },
  {
    category: "Best Practices & Performance",
    items: [
      { name: "Accessibility (a11y)", level: "Intermediate", icon: <MdAccessibilityNew className="text-green-500 text-3xl" /> },
      { name: "SEO Basics", level: "Intermediate", icon: <FaSearch className="text-gray-600 dark:text-gray-300 text-3xl" /> },
      { name: "Performance (Lighthouse, SiteSpeed.io)", level: "Intermediate", icon: <FaTachometerAlt className="text-red-500 text-3xl" /> },
    ],
  },
  {
    category: "Design & Product Thinking",
    items: [
      { name: "UI/UX", level: "Beginner+", icon: <FaPalette className="text-pink-500 text-3xl" /> },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          My Skills
        </h2>

        {/* Skill Groups */}
        <div className="grid md:grid-cols-2 gap-10">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {group.category}
              </h3>
              <ul className="space-y-4">
                {group.items.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-4">
                    {skill.icon}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{skill.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{skill.level}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
