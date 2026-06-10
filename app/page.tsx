import type { Metadata } from 'next';
import React from 'react';
import Home from './components/homePage';


export const metadata: Metadata = {
  title: {
    default: 'A2Tool – Free Online Tools for Text, Image, PDF & Calculators',
    template: '%s | A2Tool',
  },
  description:
    'Access a powerful suite of 50+ free online tools instantly. A2Tool offers fast, secure, browser-based utilities including image compressors, text formatting, and calculators.',
  keywords: [
    'free online tools',
    'browser utilities',
    'text tools',
    'image tools',
    'image compressor',
    'pdf tools',
    'developer tools',
    'online calculators',
    'qr code generator',
    'unit converter',
    'A2Tool',
  ],
  authors: [{ name: 'A2Tool' }],
  creator: 'A2Tool',
  publisher: 'A2Tool',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://a2tool.com'),
  alternates: {
    canonical: 'https://a2tool.com/',
  },
  openGraph: {
    title: 'A2Tool – The Ultimate All-in-One Free Online Toolkit',
    description:
      'Access a powerful suite of 50+ free online tools for text processing, image optimization, utilities, and daily calculations. Fast, secure, and no login required.',
    url: 'https://a2tool.com/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A2Tool – Free Online Utility Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A2Tool – Free Online Utility Tools',
    description:
      'Use free, browser-based online tools for text, image editing, PDF operations, and calculations. No login required.',
    images: ['/og-image.png'],
  },
};

// JSON-LD Structured Data for the Homepage
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'A2Tool',
  alternateName: 'A2Tools',
  url: 'https://a2tool.com/',
  description: 'The Ultimate All-in-One Toolkit for text, image, PDF, utilities & calculations.',
  applicationCategory: 'UtilityApplication',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
