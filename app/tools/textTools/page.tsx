import type { Metadata } from 'next';
import React from 'react';

import TextTools from './TextTools';


export const metadata: Metadata = {
  title: {
    default: 'Text Tools – Free Online Text Utilities',
    template: '%s | Text Tools | A2Tool',
  },
  description:
    'Free online text tools including Word Counter, Text to Speech, Speech to Text, Text Cleaner, Text Formatter, and Case Converter.',
  keywords: [
    'text tools',
    'online text tools',
    'word counter',
    'text to speech',
    'speech to text',
    'text cleaner',
    'text formatter',
    'case converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/textTools/',
  },
  openGraph: {
    title: 'Text Tools – Free Online Text Utilities',
    description:
      'All-in-one text tools to count words, convert text, clean text, and generate speech online.',
    url: 'https://a2tool.com/tools/textTools/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text Tools Collection',
      },
    ],
    type: 'website',
  },
};


export default function  Page() {
  return  <TextTools />;
}
