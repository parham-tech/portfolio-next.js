import type { Metadata } from "next";
import Contact from "@/features/contact/Contact";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-js-parham.vercel.app"),

  title: "Contact | Parham Shirinkam — Frontend Developer",

  description:
    "Contact Parham Shirinkam, Frontend Developer specializing in React, Next.js, TypeScript, and modern web experiences.",

  keywords: [
    "Contact Parham Shirinkam",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
  ],

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
    title: "Contact | Parham Shirinkam — Frontend Developer",

    description:
      "Contact Parham Shirinkam for frontend development opportunities, collaborations, and projects.",

    url: "https://portfolio-next-js-parham.vercel.app/contact",

    siteName: "Parham Shirinkam Portfolio",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parham Shirinkam - Frontend Developer Portfolio",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact | Parham Shirinkam — Frontend Developer",

    description:
      "Contact Parham Shirinkam for frontend development opportunities, collaborations, and projects.",

    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}