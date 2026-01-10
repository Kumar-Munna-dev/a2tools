import type { Metadata } from 'next';
import React from 'react';
import TextCaseConverter from './TextCaseConverter';

export const metadata: Metadata = {
  title: {
    default: 'Text Case Converter – Change Text to Uppercase, Lowercase & More',
    template: '%s | A2Tool',
  },
  description:
    'Free Text Case Converter to change text into uppercase, lowercase, sentence case, title case, and more online.',
  keywords: [
    'text case converter',
    'uppercase converter',
    'lowercase converter',
    'sentence case converter',
    'title case converter',
    'change text case',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/textTools/text-case-converter/',
  },
  openGraph: {
    title: 'Text Case Converter – Change Text Case Online',
    description:
      'Convert text to uppercase, lowercase, title case, and sentence case instantly with A2Tool.',
    url: 'https://a2tool.com/tools/textTools/text-case-converter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text Case Converter Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <TextCaseConverter />;
}
