import type { Metadata } from 'next';
import React from 'react';
import DateTimeTool from './DateTimeTool';

export const metadata: Metadata = {
  title: {
    default: 'Date & Time Tools – Calculator, Converter & Utilities Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Date & Time Tools to calculate date differences, convert time zones, add or subtract dates, and manage time easily online.',
  keywords: [
    'date and time tools',
    'date calculator',
    'time calculator',
    'date difference calculator',
    'time zone converter',
    'online date tools',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/date-time-tools/',
  },
  openGraph: {
    title: 'Date & Time Tools – Online Date and Time Utilities',
    description:
      'Calculate date differences, convert time zones, and manage time efficiently using A2Tool Date & Time Tools.',
    url: 'https://a2tool.com/tools/utilityTools/date-time-tools/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Date and Time Tools',
      },
    ],
    type: 'website',
  },
};

export default function Page() {
  return <DateTimeTool />;
}
