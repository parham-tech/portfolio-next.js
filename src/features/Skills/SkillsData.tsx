// src/features/Skills/SkillsData.ts
import { 
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaSearch, FaTachometerAlt, FaPalette, FaShieldAlt, FaRobot, FaBolt 
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiFigma } from "react-icons/si";
import { MdAccessibilityNew, MdMotionPhotosOn } from "react-icons/md";
import { GiSpiralLollipop } from "react-icons/gi"; // نزدیک به لوگوی GSAP (چرخشی/انیمیشن)

export const skills = [
  {
    category: "Frontend Development",
    items: [
      { name: "HTML", level: "Advanced", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS", level: "Advanced", icon: FaCss3Alt, color: "text-blue-500" },
      { name: "JavaScript (ES6+)", level: "Intermediate", icon: FaJsSquare, color: "text-yellow-400" },
      { name: "TailwindCSS", level: "Intermediate", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "React.js", level: "Intermediate", icon: FaReact, color: "text-blue-400" },
      { name: "Next.js + TypeScript", level: "Intermediate", icon: SiNextdotjs, color: "text-black dark:text-white" },
      { name: "TypeScript", level: "Beginner+", icon: SiTypescript, color: "text-blue-600" },
    ],
  },
  {
    category: "Web Core Best Practices & Quality",
    items: [
      { name: "Accessibility (a11y)", level: "Intermediate", icon: MdAccessibilityNew, color: "text-green-500" },
      { name: "SEO", level: "Basic", icon: FaSearch, color: "text-gray-600 dark:text-gray-300" },
      { name: "Performance Optimization(webpagetest.org, Lighthouse, SiteSpeed.io)", level: "Intermediate", icon: FaTachometerAlt, color: "text-red-500" },
      { name: "Best Practices (Security & Web Standards from Lighthouse)", level: "Intermediate", icon: FaShieldAlt, color: "text-purple-600" },
    ],
  },
  {
    category: "Design, Product Thinking & Tools",
    items: [
      { name: "UI/UX", level: "Beginner+", icon: FaPalette, color: "text-pink-500" },
      { name: "Figma (Design Tool)", level: "Beginner+", icon: SiFigma, color: "text-purple-500" },
      { name: "Framer Motion (Animations)", level: "Familiar(used with AI assistance)", icon: MdMotionPhotosOn, color: "text-indigo-500" },
      { name: "GSAP (Scroll & Advanced Animations)", level: "Familiar(used with AI assistance)", icon: GiSpiralLollipop, color: "text-green-500" },
    ],
  },
  {
    category: "AI Tools & Productivity",
    items: [
      { name: "ChatGPT", level: "Daily Use", icon: FaRobot, color: "text-emerald-500" },
      { name: "Bolt.new", level: "Prototyping", icon: FaBolt, color: "text-indigo-500" },
      { name: "Claude", level: "Productivity", icon: FaRobot, color: "text-yellow-500" },
      { name: "...", level: "and more", icon: FaRobot, color: "text-gray-400" },
    ],
  },
];
