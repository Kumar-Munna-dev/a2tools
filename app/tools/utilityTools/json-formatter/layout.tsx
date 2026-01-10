import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'JSON Formatter – Format, Validate & Beautify JSON Online',
    template: '%s | A2Tool',
  },
  description:
    'Free JSON Formatter tool to format, validate, minify, and beautify JSON data instantly online. Ideal for developers and APIs.',
  keywords: [
    'json formatter',
    'json beautifier',
    'json validator',
    'format json',
    'minify json',
    'json editor online',
    'json tool',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/json-formatter/',
  },
  openGraph: {
    title: 'JSON Formatter – Format & Validate JSON',
    description:
      'Format, validate, and beautify JSON instantly using A2Tool JSON Formatter.',
    url: 'https://a2tool.com/tools/utilityTools/json-formatter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
