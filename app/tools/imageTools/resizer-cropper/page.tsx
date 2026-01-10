import type { Metadata } from 'next';
import React from 'react';
import ImageResizerCropper from './ImageResizerCropper';

export const metadata: Metadata = {
  title: {
    default: 'Image Resizer & Cropper – Resize and Crop Images Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Image Resizer and Cropper tool to resize images, crop photos, change dimensions, and maintain quality online.',
  keywords: [
    'image resizer',
    'image cropper',
    'resize image online',
    'crop image online',
    'photo resizer',
    'image size reducer',
    'image dimension changer',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/resizer-cropper/',
  },
  openGraph: {
    title: 'Image Resizer & Cropper – Resize and Crop Images Online',
    description:
      'Resize and crop images instantly while maintaining quality using A2Tool Image Resizer & Cropper.',
    url: 'https://a2tool.com/tools/imageTools/resizer-cropper/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Resizer and Cropper Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <ImageResizerCropper />;
}
