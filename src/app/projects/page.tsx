import type { Metadata } from 'next';
import LandingProjects from '@/features/LandingProjects/LandingProjects';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-next-js-parham.vercel.app'),

  title: 'Projects | Parham Shirinkam — Frontend Developer',

  description:
    'Explore web development projects by Parham Shirinkam, featuring React, Next.js, TypeScript, and modern frontend experiences.',

  keywords: [
    'Parham Shirinkam',
    'Frontend Developer',
    'React Projects',
    'Next.js Projects',
    'Frontend Portfolio',
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
    title: 'Projects | Parham Shirinkam — Frontend Developer',

    description:
      'Explore React, Next.js, and modern frontend projects created by Parham Shirinkam.',

    url: 'https://portfolio-next-js-parham.vercel.app/projects',

    siteName: 'Parham Shirinkam Portfolio',

    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parham Shirinkam - Frontend Developer Projects',
      },
    ],

    locale: 'en_US',

    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Projects | Parham Shirinkam — Frontend Developer',

    description:
      'Explore React, Next.js, TypeScript, and modern frontend projects created by Parham Shirinkam.',

    images: ['/og-image.png'],
  },

  alternates: {
    canonical: 'https://portfolio-next-js-parham.vercel.app/projects',
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',

    name: 'Projects | Parham Shirinkam',

    description:
      'A showcase of web development projects, games, and responsive frontend experiences created by Parham Shirinkam.',

    url: 'https://portfolio-next-js-parham.vercel.app/projects',

    mainEntity: {
      '@type': 'ItemList',

      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'CreativeWork',
            name: 'Snake Game',
            description:
              'A classic Snake game built with React and Tailwind CSS.',
            image:
              'https://portfolio-next-js-parham.vercel.app/snake.avif',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'CreativeWork',
            name: 'Neon Reflex',
            description:
              'A cyberpunk-inspired reflex game with neon UI effects.',
            image:
              'https://portfolio-next-js-parham.vercel.app/neon-reflex.avif',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'WebApplication',
            name: 'Crypto Dashboard',
            description:
              'A cryptocurrency dashboard built with Next.js and React for tracking market data.',
            image:
              'https://portfolio-next-js-parham.vercel.app/crypto.avif',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'WebSite',
            name: 'Mahan Balaei',
            description:
              'A modern fitness coach website built with Next.js, React, and Tailwind CSS.',
            image:
              'https://portfolio-next-js-parham.vercel.app/mahan.avif',
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