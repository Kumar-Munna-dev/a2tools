import type { Metadata } from 'next';
import React from 'react';
import Home from './components/homePage';


export const metadata: Metadata = {
  title: {
    default: 'A2Tool – Free Online Tools for Text, Image & Calculators',
    template: '%s | A2Tool',
  },
  description:
    'A2Tool offers free online tools including word counter, text to speech, image compressor, calculators, and many more. Fast, secure, and easy to use.',
  keywords: [
    'online tools',
    'free online tools',
    'word counter',
    'text to speech',
    'image compressor',
    'online calculators',
    'A2Tool',
  ],
  metadataBase: new URL('https://a2tool.com'),
  alternates: {
    canonical: 'https://a2tool.com/',
  },
  openGraph: {
    title: 'A2Tool – Free Online Tools',
    description:
      'All-in-one free online tools for text, image, utility, and calculators.',
    url: 'https://a2tool.com/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A2Tool – Free Online Tools',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A2Tool – Free Online Tools',
    description:
      'Use free online tools for text, image editing, and calculators at A2Tool.',
    images: ['/og-image.png'],
  },
};
export default function  Page() {
  return  <Home />;
}
