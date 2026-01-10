import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: {
    default: 'Text to Speech – Convert Text into Natural Voice Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Text to Speech tool to convert text into natural-sounding voice. Supports multiple languages and voices online.',
  keywords: [
    'text to speech',
    'tts',
    'text to voice',
    'online text to speech',
    'ai voice generator',
    'speech synthesis',
  ],
  metadataBase: new URL('https://a2tool.com'),
  alternates: {
    canonical: 'https://a2tool.com/tools/textTools/text-to-speech/',
  },
  openGraph: {
    title: 'Text to Speech – Convert Text into Voice',
    description:
      'Convert text into realistic voice instantly using A2Tool Text to Speech.',
    url: 'https://a2tool.com/tools/textTools/text-to-speech/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text to Speech Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}