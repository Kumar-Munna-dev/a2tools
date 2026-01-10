import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Image Rotator & Flipper – Rotate and Flip Images Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Image Rotator and Flipper tool to rotate images and flip horizontally or vertically online without quality loss.',
  keywords: [
    'image rotator',
    'image flipper',
    'rotate image online',
    'flip image horizontally',
    'flip image vertically',
    'photo rotator',
    'online image editor',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/rotator-flipper/',
  },
  openGraph: {
    title: 'Image Rotator & Flipper – Rotate and Flip Images',
    description:
      'Rotate images and flip photos horizontally or vertically instantly using A2Tool Image Rotator & Flipper.',
    url: 'https://a2tool.com/tools/imageTools/rotator-flipper/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Rotator and Flipper Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
