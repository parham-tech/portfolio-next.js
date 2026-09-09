// src/app/story/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const StoryModeScene = dynamic(
  () =>
    import("../../features/StoryModeScene/StoryModeScene").then(
      (m) => m.StoryModeScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans gap-4" dir="rtl">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold animate-pulse text-yellow-400">در حال بارگذاری داستان تعاملی...</p>
        <p className="text-sm text-gray-400">لطفاً شکیبا باشید، جلوه‌های بصری در حال آماده‌سازی هستند.</p>
      </div>
    ),
  }
);

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
      {/* Preloading critical grass images to bypass dynamic component JS chunk rendering delay */}
      <link rel="preload" href="/_next/image?url=%2Fgrass%2Fgrass-left.png&w=1200&q=75" as="image" />
      <link rel="preload" href="/_next/image?url=%2Fgrass%2Fgrass-center.png&w=1200&q=75" as="image" />
      <link rel="preload" href="/_next/image?url=%2Fgrass%2Fgrass-right.png&w=1200&q=75" as="image" />
      
      {/* Preloading main background video */}
      <link rel="preload" href="/videos/bg-loop.mp4" as="video" type="video/mp4" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryModeScene />
    </>
  );
}
