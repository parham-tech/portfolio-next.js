import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),
  title: "Parham Shirinkam | Frontend Developer Portfolio",
  description:
    "Parham Shirinkam frontend developer portfolio. Explore my projects, skills, and experience with React and Next.js.",
  openGraph: {
    title: "Parham Shirinkam | Frontend Developer Portfolio",
    description:
      "Parham Shirinkam frontend developer portfolio. Explore my projects, skills, and experience with React and Next.js.",
    url: "https://portfolio-next-js-parham.vercel.app/",
    siteName: "Parham Portfolio",
    images: [
      {
        url: "https://portfolio-next-js-parham.vercel.app/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parham Shirinkam | Frontend Developer Portfolio",
    description:
      "Parham Shirinkam frontend developer portfolio. Explore my projects, skills, and experience with React and Next.js.",
    images: ["https://portfolio-next-js-parham.vercel.app/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/",
  },
};

export default function Home() {
  return <HomePageClient />;
}
