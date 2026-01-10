import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Text Encrypt Decrypt – Securely Encrypt & Decrypt Text Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Text Encrypt Decrypt tool to securely encrypt and decrypt text using modern algorithms. Protect sensitive information online.',
  keywords: [
    'text encrypt decrypt',
    'encrypt text',
    'decrypt text',
    'text encryption',
    'text decryption',
    'secure text online',
    'online encryption tool',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/text-encrypt-decrypt/',
  },
  openGraph: {
    title: 'Text Encrypt Decrypt – Secure Text Encryption',
    description:
      'Encrypt and decrypt text instantly with A2Tool Text Encrypt Decrypt tool.',
    url: 'https://a2tool.com/tools/utilityTools/text-encrypt-decrypt/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text Encrypt Decrypt Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
