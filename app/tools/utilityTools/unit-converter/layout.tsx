import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Unit Converter – Convert Length, Weight, Area & More Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Unit Converter to convert length, weight, area, volume, temperature, speed, and more instantly online.',
  keywords: [
    'unit converter',
    'measurement converter',
    'length converter',
    'weight converter',
    'area converter',
    'temperature converter',
    'online unit converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/unit-converter/',
  },
  openGraph: {
    title: 'Unit Converter – Convert Units Online',
    description:
      'Convert measurement units like length, weight, temperature, and more instantly using A2Tool Unit Converter.',
    url: 'https://a2tool.com/tools/utilityTools/unit-converter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Unit Converter Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
