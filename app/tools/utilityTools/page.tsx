import type { Metadata } from 'next';
import React from 'react';

import UtilityTools from './UtilityTools';
export const metadata: Metadata = {
  title: {
    default: 'Utility Tools – Free Online Utility Tools Collection',
    template: '%s | Utility Tools | A2Tool',
  },
  description:
    'Free online utility tools including QR Code Generator, Password Generator, URL Shortener, Unit Converter, Currency Converter, and more.',
  keywords: [
    'utility tools',
    'online utility tools',
    'free online tools',
    'qr code generator',
    'password generator',
    'url shortener',
    'unit converter',
    'currency converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/',
  },
  openGraph: {
    title: 'Utility Tools – Free Online Utility Tools',
    description:
      'Explore a complete collection of free online utility tools on A2Tool. Simple, fast, and easy to use.',
    url: 'https://a2tool.com/tools/utilityTools/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Utility Tools Collection',
      },
    ],
    type: 'website',
  },
};
export default function  Page() {
  return  <UtilityTools />;
}
