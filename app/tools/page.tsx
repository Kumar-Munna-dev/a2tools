import type { Metadata } from 'next';
import React from 'react';

import ToolPage from './toolPage';


export const metadata: Metadata = {
  title: {
    default: 'All Tools – Free Online Tools for Text, Image & Calculators',
    template: '%s | A2Tool',
  },
  description:
    'Explore all free online tools by A2Tool including text tools, image tools, utility tools, and calculators. Fast, secure, and easy to use.',
  keywords: [
    'online tools',
    'free online tools',
    'text tools',
    'image tools',
    'calculator tools',
    'utility tools',
    'A2Tool tools',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/',
  },
  openGraph: {
    title: 'All Tools – Free Online Tools by A2Tool',
    description:
      'Access all free online tools including text, image, utility, and calculator tools at A2Tool.',
    url: 'https://a2tool.com/tools/',
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
}
export default function  Page() {
  return  <ToolPage />;
}
