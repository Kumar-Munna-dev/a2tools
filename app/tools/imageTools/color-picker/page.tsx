import type { Metadata } from 'next';
import React from 'react';
import ImageColorPicker from './ImageColorPicker';

export const metadata: Metadata = {
  title: 'Color Picker – Extract & Convert HEX, RGB, HSL, CMYK Colors Online',
  description:
    'Free online color picker tool. Upload images, pick colors, and instantly convert between HEX, RGB, HSL, and CMYK formats. Perfect for designers and developers.',
  keywords: [
    'color picker',
    'hex color picker',
    'rgb color picker',
    'hsl color picker',
    'cmyk color converter',
    'color code extractor',
    'online color picker',
    'image color picker',
    'color converter tool',
    'design tools',
  ],
  authors: [{ name: 'A2Tool' }],
  creator: 'A2Tool',
  publisher: 'A2Tool',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/color-picker/',
  },
  openGraph: {
    title: 'Color Picker – Extract & Convert Colors Online',
    description:
      'Free online color picker. Upload images, pick colors, and convert between HEX, RGB, HSL, CMYK instantly.',
    url: 'https://a2tool.com/tools/imageTools/color-picker/',
    type: 'website',
    siteName: 'A2Tool',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Color Picker Tool - Pick & Convert Colors',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@a2tool',
    creator: '@a2tool',
    title: 'Color Picker – Pick & Convert Colors Online',
    description:
      'Free online color picker tool. Upload images, pick colors, and convert HEX, RGB, HSL, CMYK.',
    images: ['/og-image.png'],
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'A2Tool Color Picker',
  description:
    'Free online color picker tool to extract colors from images and convert between HEX, RGB, HSL, and CMYK formats.',
  url: 'https://a2tool.com/tools/imageTools/color-picker/',
  applicationCategory: 'DesignApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImageColorPicker />
    </>
  );
}
