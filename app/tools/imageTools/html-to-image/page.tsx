import type { Metadata } from 'next';
import React from 'react';
import HtmlToImage from './HtmlToImage';

export const metadata: Metadata = {
  title: {
    default: 'HTML to Image – Convert HTML Code to Image Online',
    template: '%s | A2Tool',
  },
  description:
    'Free HTML to Image tool to convert HTML code, web pages, or components into high-quality images instantly online.',
  keywords: [
    'html to image',
    'convert html to image',
    'html to png',
    'html to jpg',
    'webpage to image',
    'html screenshot tool',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/html-to-image/',
  },
  openGraph: {
    title: 'HTML to Image – Convert HTML Code to Image',
    description:
      'Convert HTML and web layouts into images instantly using A2Tool HTML to Image.',
    url: 'https://a2tool.com/tools/imageTools/html-to-image/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HTML to Image Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <HtmlToImage />;
}
