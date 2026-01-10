import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Image Filters & Effects – Apply Photo Filters Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Image Filters & Effects tool to apply blur, grayscale, sepia, brightness, contrast, and artistic photo effects online.',
  keywords: [
    'image filters',
    'photo effects',
    'apply image filters online',
    'photo editor effects',
    'blur image',
    'grayscale image',
    'sepia filter',
    'online photo editor',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/filters-effects/',
  },
  openGraph: {
    title: 'Image Filters & Effects – Edit Photos Online',
    description:
      'Apply stunning photo filters and effects instantly using A2Tool Image Filters & Effects.',
    url: 'https://a2tool.com/tools/imageTools/filters-effects/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Filters and Effects Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
