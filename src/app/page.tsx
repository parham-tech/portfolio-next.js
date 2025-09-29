import { Hero } from "@/features/Hero";

export const metadata = {
  title: "Home | Parham Portfolio",
  description: "Welcome to my portfolio website. Frontend developer. Explore my work and projects.",
  openGraph: {
    title: "Home | Parham Portfolio",
    description: "Welcome to my portfolio website. Frontend developer. Explore my work and projects.",
    url: "https://portfolio-next-js-parham.vercel.app/",
    siteName: "Parham Portfolio",
    images: [
      {
        url: "https://portfolio-next-js-parham.vercel.app/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Parham Portfolio Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Parham Portfolio",
    description: "Welcome to my portfolio website. Frontend developer. Explore my work and projects.",
    images: ["https://portfolio-next-js-parham.vercel.app/og-image-home.jpg"],
    // creator: "",
  },
  alternates: {
    canonical: "https://portfolio-next-js-parham.vercel.app/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
