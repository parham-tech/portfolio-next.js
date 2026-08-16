import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),
  title: "Parham Shirinkam | Frontend Developer Portfolio",
  description:
    "پورتفولیوی شخصی پرهام شیرین‌کام، برنامه‌نویس فرانت‌اند React و Next.js. Parham Shirinkam Portfolio - React & Next.js Frontend Developer. مطور فرونت إند وواجهات المستخدم.",
  keywords: [
    "پرهام شیرین‌کام",
    "پرهام شیرین کام",
    "شیرین کام",
    "برنامه نویس فرانت اند",
    "توسعه دهنده وب",
    "پورتفولیو برنامه نویسی",
    "سایت پرهام شیرین کام",
    "Parham Shirinkam",
    "Shirinkam",
    "Frontend Developer",
    "Next.js Developer Portfolio",
    "React Developer",
    "Web Developer Portfolio",
    "بارام شيرينكام",
    "مطور واجهات",
    "برمجة فرونت اند",
    "مطور ويب React"
  ],
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE",
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
    title: "Parham Shirinkam | Frontend Developer Portfolio",
    description:
      "پورتفولیوی شخصی پرهام شیرین‌کام، برنامه‌نویس فرانت‌اند React و Next.js. Parham Shirinkam Portfolio - React & Next.js Frontend Developer. مطور فرونت إند وواجهات المستخدم.",
    url: "https://portfolio-next-js-parham.vercel.app/",
    siteName: "Parham Portfolio",
    images: [
      {
        url: "https://portfolio-next-js-parham.vercel.app/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam - Frontend Developer Portfolio | پرهام شیرین‌کام",
      },
    ],
    locale: "fa_IR",
    alternateLocale: ["en_US", "ar_AE"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parham Shirinkam | Frontend Developer Portfolio",
    description:
      "پورتفولیوی شخصی پرهام شیرین‌کام، برنامه‌نویس فرانت‌اند React و Next.js. Parham Shirinkam Portfolio - React & Next.js Frontend Developer. مطور فرونت إند وواجهات المستخدم.",
    images: ["https://portfolio-next-js-parham.vercel.app/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/",
    languages: {
      "en-US": "https://portfolio-next-js-parham.vercel.app/",
      "fa-IR": "https://portfolio-next-js-parham.vercel.app/fa",
      "ar-AE": "https://portfolio-next-js-parham.vercel.app/ar",
    },
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Parham Shirinkam",
    alternateName: [
      "پرهام شیرین‌کام",
      "بارام شيرينكام",
      "پرهام شیرین کام",
      "شیرین کام"
    ],
    url: "https://portfolio-next-js-parham.vercel.app",
    image: "https://portfolio-next-js-parham.vercel.app/og-image-home.jpg",
    description:
      "Professional Frontend Developer specializing in React, Next.js, and TypeScript. طراح و توسعه‌دهنده فرانت‌اند با تخصص در ریکت و نکست‌جی‌اس. مطور واجهات المستخدم المتخصص في رياكت ونكست جي إس.",
    jobTitle: "Frontend Developer",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web Development",
      "SEO",
      "Scrollytelling",
      "Three.js",
    ],
    sameAs: [
      "https://github.com/parham-tech",
      "https://linkedin.com/in/parham-shirinkam"
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
