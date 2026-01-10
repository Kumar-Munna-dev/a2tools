import type { Metadata } from 'next';
import React from 'react';
import EpochTimestampConverter from './EpochTimestampConverter';

export const metadata: Metadata = {
  title: {
    default: 'Epoch Converter – Convert Unix Timestamp to Date & Time',
    template: '%s | A2Tool',
  },
  description:
    'Free Epoch Converter tool to convert Unix timestamp to human-readable date and time, and vice versa, instantly online.',
  keywords: [
    'epoch converter',
    'unix timestamp converter',
    'epoch time converter',
    'timestamp to date',
    'date to timestamp',
    'unix time converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/epoch-converter/',
  },
  openGraph: {
    title: 'Epoch Converter – Unix Timestamp Converter',
    description:
      'Convert Unix epoch time to readable date and time instantly using A2Tool Epoch Converter.',
    url: 'https://a2tool.com/tools/utilityTools/epoch-converter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Epoch Converter Tool',
      },
    ],
    type: 'website',
  },
};

export default function Page() {
  return <EpochTimestampConverter />;
}
