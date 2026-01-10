import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'File Converter – Convert Files Online (PDF, Image, Audio)',
    template: '%s | A2Tool',
  },
  description:
    'Free File Converter to convert files between PDF, image, document, and audio formats quickly and securely online.',
  keywords: [
    'file converter',
    'online file converter',
    'convert files online',
    'pdf converter',
    'image converter',
    'audio converter',
    'document converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/file-converter/',
  },
  openGraph: {
    title: 'File Converter – Convert Files Online',
    description:
      'Convert files between PDF, images, documents, and audio formats instantly using A2Tool File Converter.',
    url: 'https://a2tool.com/tools/utilityTools/file-converter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'File Converter Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
