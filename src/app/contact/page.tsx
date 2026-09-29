import type { Metadata } from "next";
import Contact from "@/features/contact/Contact";

export const metadata: Metadata = {
  title: "Contact | Parham Shirinkam",
  description:
    "Get in touch with Parham Shirinkam, a Junior Frontend Developer specializing in React, Next.js, TypeScript, and modern web experiences.",
  keywords: [
    "Contact Parham Shirinkam",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
  ],
  openGraph: {
    title: "Contact | Parham Shirinkam",
    description:
      "Let's connect and discuss frontend development opportunities, collaborations, and projects.",
    url: "https://portfolio-next-js-parham.vercel.app/contact",
    siteName: "Parham Shirinkam Portfolio",
    images: [
      {
        url: "/og-image.png",
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
    title: "Contact | Parham Shirinkam",
    description:
      "Connect with Parham Shirinkam for frontend development opportunities.",
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