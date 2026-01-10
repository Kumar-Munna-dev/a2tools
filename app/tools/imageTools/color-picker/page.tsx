import type { Metadata } from 'next';
import React from 'react';
import ImageColorPicker from './ImageColorPicker';

export const metadata: Metadata = {
  title: {
    default: 'Color Picker – Pick & Convert HEX, RGB, HSL Colors Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Color Picker tool to pick colors and convert between HEX, RGB, HSL, and more. Ideal for designers and developers.',
  keywords: [
    'color picker',
    'hex color picker',
    'rgb color picker',
    'hsl color picker',
    'color code picker',
    'online color picker',
    'color converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/color-picker/',
  },
  openGraph: {
    title: 'Color Picker – Pick & Convert Colors Online',
    description:
      'Pick colors and convert HEX, RGB, and HSL values instantly using A2Tool Color Picker.',
    url: 'https://a2tool.com/tools/imageTools/color-picker/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Color Picker Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <ImageColorPicker />;
}
