import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'File Compressor – Compress Files Online Without Quality Loss',
    template: '%s | A2Tool',
  },
  description:
    'Free File Compressor to reduce file size online. Compress images, documents, and files without losing quality.',
  keywords: [
    'file compressor',
    'compress files online',
    'reduce file size',
    'online file compression',
    'document compressor',
    'image compressor',
    'file size reducer',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/file-compressor/',
  },
  openGraph: {
    title: 'File Compressor – Reduce File Size Online',
    description:
      'Compress files online and reduce file size instantly using A2Tool File Compressor.',
    url: 'https://a2tool.com/tools/utilityTools/file-compressor/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'File Compressor Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
