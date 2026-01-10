import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Image Compressor – Compress Images Online Without Losing Quality',
    template: '%s | A2Tool',
  },
  description:
    'Free Image Compressor to reduce image file size without losing quality. Compress JPG, PNG, WEBP images online instantly.',
  keywords: [
    'image compressor',
    'compress images online',
    'reduce image size',
    'jpg compressor',
    'png compressor',
    'webp compressor',
    'image optimization',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/image-compressor/',
  },
  openGraph: {
    title: 'Image Compressor – Reduce Image Size Online',
    description:
      'Compress JPG, PNG, and WEBP images instantly without quality loss using A2Tool Image Compressor.',
    url: 'https://a2tool.com/tools/imageTools/image-compressor/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Compressor Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
