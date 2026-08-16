import type { Metadata } from "next";
import LandingProjects from "@/features/LandingProjects/LandingProjects";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),
  title: "Projects | Parham Portfolio",
  description:
    "مشاهده پروژه‌های برنامه‌نویسی پرهام شیرین‌کام شامل بازی Snake، بازی Neon Reflex، پالت رنگ و پورتفولیو. Browse Parham Shirinkam projects - React, Next.js, and Tailwind CSS. استكشف مشاريع برمجة الويب.",
  keywords: [
    "پروژه‌های پرهام شیرین‌کام",
    "برنامه نویسی",
    "بازی ری‌اکت",
    "فرانت اند",
    "Parham Shirinkam projects",
    "React projects",
    "Next.js portfolio",
    "Cyberpunk game React",
    "Snake game web",
    "مشاريع برمجة",
    "مشاريع ريأكت",
    "مطور واجهات"
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
    title: "Projects | Parham Portfolio",
    description:
      "مشاهده پروژه‌های برنامه‌نویسی پرهام شیرین‌کام شامل بازی Snake، بازی Neon Reflex، پالت رنگ و پورتفولیو. Browse Parham Shirinkam projects - React, Next.js, and Tailwind CSS. استكشف مشاريع برمجة الويب.",
    url: "https://portfolio-next-js-parham.vercel.app/projects",
    siteName: "Parham Portfolio",
    images: [
      {
        url: "https://portfolio-next-js-parham.vercel.app/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam Projects Portfolio | پروژه‌های پرهام شیرین‌کام",
      },
    ],
    locale: "fa_IR",
    alternateLocale: ["en_US", "ar_AE"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Parham Portfolio",
    description:
      "مشاهده پروژه‌های برنامه‌نویسی پرهام شیرین‌کام شامل بازی Snake، بازی Neon Reflex، پالت رنگ و پورتفولیو. Browse Parham Shirinkam projects - React, Next.js, and Tailwind CSS. استكشف مشاريع برمجة الويب.",
    images: ["https://portfolio-next-js-parham.vercel.app/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/projects",
    languages: {
      "en-US": "https://portfolio-next-js-parham.vercel.app/projects",
      "fa-IR": "https://portfolio-next-js-parham.vercel.app/fa/projects",
      "ar-AE": "https://portfolio-next-js-parham.vercel.app/ar/projects",
    },
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects of Parham Shirinkam | پروژه‌های پرهام شیرین‌کام",
    description: "A showcase of web development projects, games, and responsive designs created by Parham Shirinkam.",
    url: "https://portfolio-next-js-parham.vercel.app/projects",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Snake Game",
            description: "A classic Snake game built with React and TailwindCSS.",
            image: "https://i.pinimg.com/736x/9f/09/45/9f0945103fc6158cb16e1828a2665b5c.jpg",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "Neon Reflex",
            description: "A fast-paced cyberpunk reflex game with glowing neon UI.",
            image: "https://i.pinimg.com/736x/5d/bf/f2/5dbff2b4c0fdcb9815e989f0db386f95.jpg",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "Portfolio Website",
            description: "Personal portfolio with interactive scrollytelling animations.",
            image: "https://i.pinimg.com/1200x/6e/4c/39/6e4c394783c731f261f295e7ffd1deed.jpg",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "CreativeWork",
            name: "Todo App",
            description: "A simple and elegant todo list app.",
            image: "https://i.pinimg.com/736x/07/cf/4a/07cf4a3a6f4144b4c7ac8e2ec5978dc1.jpg",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "CreativeWork",
            name: "Color Flow Palette",
            description: "An abstract color motion project with dynamic golden flow.",
            image: "https://i.pinimg.com/originals/fe/your_image_path_here.jpg",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <LandingProjects />
      </main>
    </>
  );
}
