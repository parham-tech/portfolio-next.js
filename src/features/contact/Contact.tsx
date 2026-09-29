"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  FileText,
} from "lucide-react";

const contactLinks = [
  {
    title: "Email",
    value: "parhamshirinkam21@gmail.com",
    href: "mailto:parhamshirinkam21@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/parham-shirinkam",
    href: "https://www.linkedin.com/in/parham-shirinkam",
    icon: Linkedin,
    external: true,
  },
  {
    title: "GitHub",
    value: "github.com/parham-tech",
    href: "https://github.com/parham-tech",
    icon: Github,
    external: true,
  },
  {
  
  title: "Resume",
  value: "Download PDF",
  href: "/Parham_Shirinkam_CV.pdf",
  icon: FileText,
  external: false,
  download: true,

  },
];

export default function Contact() {
  return (
    <section className="min-h-screen py-16 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let&apos;s Connect
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-12">
            I&apos;m open to frontend development opportunities,
            collaborations, and interesting projects.
          </p>

          <div className=" grid gap-4 grid-cols-1 md:grid-cols-2">
            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  download={item.download ? true : undefined}
                  target={item.external ? "_blank" : undefined}
                  rel={
                    item.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={`Contact via ${item.title}`}
                  className="
                   bg-gradient-to-l from-white/60 to-white/90
                    flex items-center gap-4
                    rounded-2xl
                    border border-white/10
                    p-5
                    transition-all duration-300
                    hover:bg-white/5
                    hover:border-white/20
                  "
                >
                  <div
                    className="
                      flex items-center justify-center
                      w-12 h-12
                      rounded-xl
                      bg-white/5
                      group-hover:scale-110
                      transition-transform
                    "
                  >
                    <Icon
                      size={26}
                      aria-hidden="true"
                      className="text-gray-800"
                    />
                  </div>

                  <div className="text-left">
                    <h2 className="font-semibold text-lg  text-gray-900">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-900 break-all">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}