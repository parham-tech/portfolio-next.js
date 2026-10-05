import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),

  title: "Skills | Parham Shirinkam — Frontend Developer",

  description:
    "Explore Parham Shirinkam's frontend development skills, including React, Next.js, TypeScript, Tailwind CSS, performance, accessibility, and modern web practices.",

  keywords: [
    "Parham Shirinkam",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Skills",
  ],

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Skills | Parham Shirinkam — Frontend Developer",

    description:
      "Frontend development skills including React, Next.js, TypeScript, Tailwind CSS, performance, accessibility, and modern web technologies.",

    url: "https://portfolio-next-js-parham.vercel.app/skills",

    siteName: "Parham Shirinkam Portfolio",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam - Frontend Developer Skills",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Skills | Parham Shirinkam — Frontend Developer",

    description:
      "Explore Parham Shirinkam's frontend development skills with React, Next.js, TypeScript, and modern web technologies.",

    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/skills",
  },
};

export default function SkillsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    name: "Skills | Parham Shirinkam",

    description:
      "Technical frontend development skills, web best practices, and modern UI technologies used by Parham Shirinkam.",

    url: "https://portfolio-next-js-parham.vercel.app/skills",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Frontend Development (HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS)",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Web Quality & Best Practices (SEO, Accessibility, Performance)",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "UI Development & Animations (Figma, Framer Motion, GSAP)",
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