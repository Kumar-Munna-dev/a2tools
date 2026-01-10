import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Text Cleaner – Remove Extra Spaces, Lines & Symbols Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Text Cleaner tool to remove extra spaces, blank lines, special characters, and clean text instantly online.',
  keywords: [
    'text cleaner',
    'remove extra spaces',
    'clean text online',
    'remove special characters',
    'text formatting tool',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/textTools/text-cleaner/',
  },
  openGraph: {
    title: 'Text Cleaner – Clean Text Online',
    description:
      'Clean your text by removing extra spaces, blank lines, and unwanted characters with A2Tool Text Cleaner.',
    url: 'https://a2tool.com/tools/textTools/text-cleaner/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text Cleaner Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
