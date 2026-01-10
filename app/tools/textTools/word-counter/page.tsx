
import type { Metadata } from 'next';
import React from 'react';
import WordCounter from './WordCounter';

export const metadata: Metadata = {
  title: {
    default: 'Word Counter – Count Words and Improve Writing',
    template: '%s | A2Tool',
  },
  description: 'Free word counter tool to count words, characters, sentences, and improve writing accuracy.',
  keywords: [
    'word counter',
    'word count',
    'character counter',
    'sentence counter',
    'online word counter',
  ],
  metadataBase: new URL('https://a2tool.com'),
  alternates: {
    canonical: 'https://a2tool.com/tools/textTools/word-counter/',
  },
  openGraph: {
    title: 'Word Counter – Count Words Online',
    description: 'Count words and characters instantly with A2Tool Word Counter.',
    url: 'https://a2tool.com/tools/textTools/word-counter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Word Counter Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <WordCounter />;
}
