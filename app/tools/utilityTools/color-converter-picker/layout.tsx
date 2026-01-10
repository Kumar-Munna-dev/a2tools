import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Color Converter & Picker – Convert HEX, RGB, HSL, CMYK Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Color Converter & Picker to convert between HEX, RGB, HSL, CMYK and pick colors instantly. Perfect for designers and developers.',
  keywords: [
    'color converter',
    'color picker',
    'hex to rgb',
    'rgb to hex',
    'hsl to rgb',
    'cmyk to rgb',
    'online color converter',
    'color code converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/color-converter-picker/',
  },
  openGraph: {
    title: 'Color Converter & Picker – Convert Color Codes Online',
    description:
      'Convert and pick colors between HEX, RGB, HSL, and CMYK instantly using A2Tool.',
    url: 'https://a2tool.com/tools/utilityTools/color-converter-picker/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Color Converter and Picker Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
