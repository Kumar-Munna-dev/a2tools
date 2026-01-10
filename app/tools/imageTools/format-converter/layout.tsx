import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Image Format Converter – Convert JPG, PNG, WEBP Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Image Format Converter to convert images between JPG, PNG, WEBP, and more without losing quality online.',
  keywords: [
    'image format converter',
    'jpg to png',
    'png to jpg',
    'webp converter',
    'image converter online',
    'photo format converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/format-converter/',
  },
  openGraph: {
    title: 'Image Format Converter – Convert Image Formats Online',
    description:
      'Convert images between JPG, PNG, and WEBP instantly using A2Tool Image Format Converter.',
    url: 'https://a2tool.com/tools/imageTools/format-converter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Format Converter Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
