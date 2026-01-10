import type { Metadata } from 'next';
import React from 'react';
import ImageMetadataViewer from './ImageMetadataViewer';

export const metadata: Metadata = {
  title: {
    default: 'Metadata Viewer – View Image & File Metadata Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Metadata Viewer tool to view image and file metadata including EXIF, GPS, camera details, and file properties online.',
  keywords: [
    'metadata viewer',
    'image metadata viewer',
    'exif data viewer',
    'photo metadata',
    'file metadata viewer',
    'view exif data online',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/metadata-viewer/',
  },
  openGraph: {
    title: 'Metadata Viewer – View Image Metadata Online',
    description:
      'View image EXIF data, GPS location, camera info, and file metadata instantly using A2Tool.',
    url: 'https://a2tool.com/tools/imageTools/metadata-viewer/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Metadata Viewer Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <ImageMetadataViewer />;
}
