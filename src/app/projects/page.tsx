import type { Metadata } from 'next';
import LandingProjects from '@/features/LandingProjects/LandingProjects';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-next-js-parham.vercel.app'),
  title: 'Projects | Parham Portfolio',
  description:
    'مشاهده پروژه‌های برنامه‌نویسی پرهام شیرین‌کام شامل بازی Snake، بازی Neon Reflex، پالت رنگ و پورتفولیو. Browse Parham Shirinkam projects - React, Next.js, and Tailwind CSS. استكشف مشاريع برمجة الويب.',
  keywords: [
    'Parham Shirinkam',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'Frontend Developer Portfolio',
  ],

  icons: {
  icon: "/og-image.png",
},
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'Projects | Parham Portfolio',
    description:
      'مشاهده پروژه‌های برنامه‌نویسی پرهام شیرین‌کام شامل بازی Snake، بازی Neon Reflex، پالت رنگ و پورتفولیو. Browse Parham Shirinkam projects - React, Next.js, and Tailwind CSS. استكشف مشاريع برمجة الويب.',
    url: 'https://portfolio-next-js-parham.vercel.app/projects',
    siteName: 'Parham Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parham Shirinkam Projects Portfolio | پروژه‌های پرهام شیرین‌کام',
      },
    ],
    locale: 'fa_IR',
    alternateLocale: ['en_US', 'ar_AE'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Parham Portfolio',
    description:
      'مشاهده پروژه‌های برنامه‌نویسی پرهام شیرین‌کام شامل بازی Snake، بازی Neon Reflex، پالت رنگ و پورتفولیو. Browse Parham Shirinkam projects - React, Next.js, and Tailwind CSS. استكشف مشاريع برمجة الويب.',
    images: ['/favicon.ico'],
  },
  alternates: {
    canonical: 'https://portfolio-next-js-parham.vercel.app/projects',
    languages: {
      'en-US': 'https://portfolio-next-js-parham.vercel.app/projects',
      'fa-IR': 'https://portfolio-next-js-parham.vercel.app/fa/projects',
      'ar-AE': 'https://portfolio-next-js-parham.vercel.app/ar/projects',
    },
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects of Parham Shirinkam | پروژه‌های پرهام شیرین‌کام',
    description:
      'A showcase of web development projects, games, and responsive designs created by Parham Shirinkam.',
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
              'A classic Snake game built with React and TailwindCSS.',
            image: 'https://portfolio-next-js-parham.vercel.app/snake.avif',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'CreativeWork',
            name: 'Neon Reflex',
            description:
              'A fast-paced cyberpunk reflex game with glowing neon UI.',
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
              'A responsive cryptocurrency dashboard for tracking crypto prices and market data, built with Next.js and React.',
            image: 'https://portfolio-next-js-parham.vercel.app/crypto.avif',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'WebSite',
            name: 'Mahan Balaei',
            description:
              'A modern personal website for fitness coach Mahan Balaei, built with Next.js, React, and Tailwind CSS.',

            image: 'https://portfolio-next-js-parham.vercel.app/mahan.avif',
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
