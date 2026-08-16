// src/app/story/page.tsx
import { StoryModeScene } from "../../features/StoryModeScene/StoryModeScene";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),
  title: "Interactive Story | Parham Portfolio",
  description:
    "حالت داستانی تعاملی پورتفولیوی پرهام شیرین‌کام. تجربه جذاب Scrollytelling سه‌بعدی و پارالاکس. Experience the interactive storytelling web development mode. تجربة قصة تفاعلية شيقة.",
  keywords: [
    "داستان تعاملی پرهام شیرین‌کام",
    "بازی تعاملی",
    "اسکرول‌ی‌تلینگ",
    "انیمیشن پارالاکس",
    "Interactive Story Parham",
    "Scrollytelling React",
    "Web animation parallax",
    "Interactive portfolio",
    "قصة تفاعلية",
    "تحريك ويب"
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
    title: "Interactive Story | Parham Portfolio",
    description:
      "حالت داستانی تعاملی پورتفولیوی پرهام شیرین‌کام. تجربه جذاب Scrollytelling سه‌بعدی و پارالاکس. Experience the interactive storytelling web development mode. تجربة قصة تفاعلية شيقة.",
    url: "https://portfolio-next-js-parham.vercel.app/story",
    siteName: "Parham Portfolio",
    images: [
      {
        url: "https://portfolio-next-js-parham.vercel.app/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam Interactive Story Portfolio | داستان تعاملی پرهام شیرین‌کام",
      },
    ],
    locale: "fa_IR",
    alternateLocale: ["en_US", "ar_AE"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Story | Parham Portfolio",
    description:
      "حالت داستانی تعاملی پورتفولیوی پرهام شیرین‌کام. تجربه جذاب Scrollytelling سه‌بعدی و پارالاکس. Experience the interactive storytelling web development mode. تجربة قصة تفاعلية شيقة.",
    images: ["https://portfolio-next-js-parham.vercel.app/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/story",
    languages: {
      "en-US": "https://portfolio-next-js-parham.vercel.app/story",
      "fa-IR": "https://portfolio-next-js-parham.vercel.app/fa/story",
      "ar-AE": "https://portfolio-next-js-parham.vercel.app/ar/story",
    },
  },
};

export default function StoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Interactive Story Mode - Parham Shirinkam | داستان تعاملی پرهام شیرین‌کام",
    description: "An interactive scrollytelling visual and storytelling presentation of Parham's design and code skills.",
    url: "https://portfolio-next-js-parham.vercel.app/story",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryModeScene />
    </>
  );
}
