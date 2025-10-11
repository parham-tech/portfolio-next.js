// src/features/Skills/Skills.tsx
"use client";
import { motion } from "framer-motion";
import { skills } from "./SkillsData";

export default function SkillsSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          My Skills
        </h2>

        {/* Groups */}
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
           {group.items.map((skill) => {
  const Icon = skill.icon;
  return (
    <li key={skill.name} className="flex items-center gap-4">
      {Icon && <Icon className={`${skill.color} text-3xl`} />}
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">{skill.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{skill.level}</p>
      </div>
    </li>
  );
})}

              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
