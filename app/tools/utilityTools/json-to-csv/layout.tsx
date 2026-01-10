import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'JSON to CSV Converter – Convert JSON into CSV Online',
    template: '%s | A2Tool',
  },
  description:
    'Free JSON to CSV Converter to convert JSON data into CSV format instantly online. Ideal for data analysis and spreadsheets.',
  keywords: [
    'json to csv',
    'json to csv converter',
    'convert json to csv',
    'json csv online',
    'json to spreadsheet',
    'data format converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/json-to-csv/',
  },
  openGraph: {
    title: 'JSON to CSV Converter – Convert Data Formats',
    description:
      'Convert JSON data into CSV format quickly and accurately using A2Tool JSON to CSV Converter.',
    url: 'https://a2tool.com/tools/utilityTools/json-to-csv/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON to CSV Converter Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
