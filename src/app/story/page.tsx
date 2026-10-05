import type { Metadata } from "next";
import dynamic from "next/dynamic";

const StoryModeScene = dynamic(
  () =>
    import("../../features/story/StoryModeScene/StoryModeScene").then(
      (m) => m.StoryModeScene
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans gap-4"
        dir="rtl"
      >
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold animate-pulse text-yellow-400">
          در حال بارگذاری داستان تعاملی...
        </p>
        <p className="text-sm text-gray-400">
          لطفاً شکیبا باشید، جلوه‌های بصری در حال آماده‌سازی هستند.
        </p>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),

  title: "Interactive Story | Parham Shirinkam — Frontend Developer",

  description:
    "Experience Parham Shirinkam's interactive story mode featuring scrollytelling, animations, and modern frontend development techniques.",

  keywords: [
    "Parham Shirinkam",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Scrollytelling",
    "Interactive Web Experience",
  ],

  icons: {
    icon: "/favicon.png",
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
    title: "Interactive Story | Parham Shirinkam — Frontend Developer",

    description:
      "An interactive scrollytelling experience built with modern frontend technologies, animations, and creative web development.",

    url: "https://portfolio-next-js-parham.vercel.app/story",

    siteName: "Parham Shirinkam Portfolio",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam Interactive Story Experience",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Interactive Story | Parham Shirinkam — Frontend Developer",

    description:
      "Explore an interactive scrollytelling experience created by Parham Shirinkam using modern frontend technologies.",

    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/story",
  },
};

export default function StoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "WebPage",

    name: "Interactive Story Mode | Parham Shirinkam",

    description:
      "An interactive scrollytelling visual experience showcasing frontend development, animation, and creative web techniques.",

    url: "https://portfolio-next-js-parham.vercel.app/story",
  };

  return (
    <>
      <link
        rel="preload"
        href="/_next/image?url=%2Fgrass%2Fgrass-left.png&w=1200&q=75"
        as="image"
      />

      <link
        rel="preload"
        href="/_next/image?url=%2Fgrass%2Fgrass-center.png&w=1200&q=75"
        as="image"
      />

      <link
        rel="preload"
        href="/_next/image?url=%2Fgrass%2Fgrass-right.png&w=1200&q=75"
        as="image"
      />

      <link
        rel="preload"
        href="/videos/bg-loop.mp4"
        as="video"
        type="video/mp4"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <StoryModeScene />
    </>
  );
}