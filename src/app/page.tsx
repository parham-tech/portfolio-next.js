import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-next-js-parham.vercel.app'),
  title: 'Parham Shirinkam — Frontend Developer',
  description:
   "Frontend Developer portfolio of Parham Shirinkam, featuring React, Next.js, TypeScript projects and modern web experiences",
  keywords: [
    'Parham Shirinkam',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'Frontend Developer Portfolio',
  ],
  icons: {
    icon: '/favicon.ico',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Parham Shirinkam — Frontend Developer',
    description:
      "Frontend Developer portfolio of Parham Shirinkam, featuring React, Next.js, TypeScript projects and modern web experiences",
    url: 'https://portfolio-next-js-parham.vercel.app/',
    siteName: 'Parham Shirinkam Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parham Shirinkam - Frontend Developer Portfolio | پرهام شیرین‌کام',
      },
    ],
    locale: 'en_US',
    
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parham Shirinkam — Frontend Developer',
    description:
      'Parham Shirinkam is a Frontend Developer specializing in React, Next.js, TypeScript, and modern web experiences.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://portfolio-next-js-parham.vercel.app/',
  
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Parham Shirinkam',
    alternateName: ['پرهام شیرین‌کام', 'پرهام شیرین کام'],
    url: 'https://portfolio-next-js-parham.vercel.app',
    image: 'https://portfolio-next-js-parham.vercel.app/og-image.png',
    description:
      'Frontend Developer specializing in React, Next.js, TypeScript, and modern web experiences.',
    jobTitle: 'Frontend Developer',
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Web Development',
      'SEO',
      'Scrollytelling',
    ],
    sameAs: [
      'https://github.com/parham-tech',
      'https://linkedin.com/in/parham-shirinkam',
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
