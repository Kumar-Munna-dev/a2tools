import type { Metadata } from 'next';
import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';

export const metadata: Metadata = {
  title: {
    default: 'QR Code Generator – Create QR Codes for URL, Text & More',
    template: '%s | A2Tool',
  },
  description:
    'Free QR Code Generator to create QR codes for URLs, text, WiFi, email, and more. Download high-quality QR codes instantly.',
  keywords: [
    'qr code generator',
    'create qr code',
    'qr code for url',
    'wifi qr code',
    'text qr code',
    'online qr generator',
    'free qr code generator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/qr-code-generator/',
  },
  openGraph: {
    title: 'QR Code Generator – Create QR Codes Online',
    description:
      'Create QR codes for links, text, WiFi, and more instantly using A2Tool QR Code Generator.',
    url: 'https://a2tool.com/tools/utilityTools/qr-code-generator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <QRCodeGenerator />;
}
