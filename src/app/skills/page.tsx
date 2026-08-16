import type { Metadata } from "next";
import { Skills } from "@/features/Skills";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),
  title: "Skills | Parham Portfolio",
  description:
    "مهارت‌های تخصصی پرهام شیرین‌کام در زمینه‌های فرانت‌اند React، Next.js، توسعه وب کامپوننت، بهینه‌سازی سرعت و سئو. Check out Parham Shirinkam's professional skills. مهارات برمجة فرونت إند وتطوير الويب.",
  keywords: [
    "مهارت‌های پرهام شیرین‌کام",
    "تخصص‌ها",
    "ریکت",
    "نکست جی اس",
    "طراحی فرانت اند",
    "سئو و بهینه سازی",
    "Parham Shirinkam skills",
    "React developer skills",
    "TypeScript expert",
    "Frontend skills portfolio",
    "SEO best practices",
    "مهارات فرونت اند",
    "تطوير رياكت",
    "مطور واجهات المستخدم"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Skills | Parham Portfolio",
    description:
      "مهارت‌های تخصصی پرهام شیرین‌کام در زمینه‌های فرانت‌اند React، Next.js، توسعه وب کامپوننت، بهینه‌سازی سرعت و سئو. Check out Parham Shirinkam's professional skills. مهارات برمجة فرونت إند وتطوير الويب.",
    url: "https://portfolio-next-js-parham.vercel.app/skills",
    siteName: "Parham Portfolio",
    images: [
      {
        url: "https://portfolio-next-js-parham.vercel.app/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam Skills Portfolio | مهارت‌های پرهام شیرین‌کام",
      },
    ],
    locale: "fa_IR",
    alternateLocale: ["en_US", "ar_AE"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills | Parham Portfolio",
    description:
      "مهارت‌های تخصصی پرهام شیرین‌کام در زمینه‌های فرانت‌اند React، Next.js، توسعه وب کامپوننت، بهینه‌سازی سرعت و سئو. Check out Parham Shirinkam's professional skills. مهارات برمجة فرونت إند وتطوير الويب.",
    images: ["https://portfolio-next-js-parham.vercel.app/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/skills",
    languages: {
      "en-US": "https://portfolio-next-js-parham.vercel.app/skills",
      "fa-IR": "https://portfolio-next-js-parham.vercel.app/fa/skills",
      "ar-AE": "https://portfolio-next-js-parham.vercel.app/ar/skills",
    },
  },
};

export default function SkillsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Skills of Parham Shirinkam | مهارت‌های پرهام شیرین‌کام",
    description: "Technical frontend development skills, web best practices, and animation tools of Parham Shirinkam.",
    url: "https://portfolio-next-js-parham.vercel.app/skills",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Frontend Development (HTML, CSS, JavaScript, React, Next.js, TypeScript, TailwindCSS)",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Web Core Best Practices & Quality (SEO, Accessibility, Performance, Security)",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Design & Animations (UI/UX, Figma, Framer Motion, GSAP)",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "AI Productivity Tools (ChatGPT, Bolt.new, Claude)",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Skills />
      </main>
    </>
  );
}
