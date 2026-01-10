import type { Metadata } from 'next';
import React from 'react';
import ImageWatermarkTool from './ImageWatermarkTool';

export const metadata: Metadata = {
  title: {
    default: 'Watermark Tool – Add Text or Image Watermark Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Watermark Tool to add text or image watermarks to photos online. Protect images with custom opacity, size, and position.',
  keywords: [
    'watermark tool',
    'add watermark to image',
    'image watermark',
    'photo watermark',
    'text watermark',
    'logo watermark',
    'online watermark tool',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/watermark-tool/',
  },
  openGraph: {
    title: 'Watermark Tool – Add Watermark to Images',
    description:
      'Protect your photos by adding text or logo watermarks instantly using A2Tool Watermark Tool.',
    url: 'https://a2tool.com/tools/imageTools/watermark-tool/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Watermark Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <ImageWatermarkTool />;
}
