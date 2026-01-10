import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'URL Shortener – Shorten Long Links Instantly Online',
    template: '%s | A2Tool',
  },
  description:
    'Free URL Shortener tool to shorten long URLs, create shareable links, and track clicks easily online.',
  keywords: [
    'url shortener',
    'shorten url',
    'link shortener',
    'short url generator',
    'free url shortener',
    'online link shortener',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/url-shortener/',
  },
  openGraph: {
    title: 'URL Shortener – Shorten Links Online',
    description:
      'Shorten long URLs and create shareable links instantly using A2Tool URL Shortener.',
    url: 'https://a2tool.com/tools/utilityTools/url-shortener/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'URL Shortener Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
