import type { Metadata } from 'next';
import React from 'react';
import Base64EncoderDecoder from './base64-encoder-decoder';

export const metadata: Metadata = {
  title: {
    default: 'Base64 Encoder Decoder – Encode & Decode Base64 Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Base64 Encoder Decoder tool to encode and decode text, data, and files in Base64 format instantly online.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'encode base64',
    'decode base64',
    'base64 converter',
    'online base64 tool',
    'base64 encode decode',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/base64-encoder-decoder/',
  },
  openGraph: {
    title: 'Base64 Encoder Decoder – Encode & Decode Data',
    description:
      'Encode or decode Base64 text and data instantly using A2Tool Base64 Encoder Decoder.',
    url: 'https://a2tool.com/tools/utilityTools/base64-encoder-decoder/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Base64 Encoder Decoder Tool',
      },
    ],
    type: 'website',
  },
};

export default function Page() {
  return <Base64EncoderDecoder />;
}
