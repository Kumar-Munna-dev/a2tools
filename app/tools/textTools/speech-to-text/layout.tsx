import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Speech to Text – Convert Voice into Text Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Speech to Text tool to convert voice into accurate text instantly. Supports real-time speech recognition and multiple languages.',
  keywords: [
    'speech to text',
    'voice to text',
    'speech recognition',
    'audio to text',
    'speech transcription',
    'voice typing online',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/textTools/speech-to-text/',
  },
  openGraph: {
    title: 'Speech to Text – Convert Voice into Text',
    description:
      'Convert spoken words into text instantly using A2Tool Speech to Text.',
    url: 'https://a2tool.com/tools/textTools/speech-to-text/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Speech to Text Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
