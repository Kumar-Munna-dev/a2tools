import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Percentage Calculator – Calculate Percentage Online Instantly',
    template: '%s | A2Tool',
  },
  description:
    'Free Percentage Calculator to calculate percentages, increase or decrease percentage, and percentage difference online.',
  keywords: [
    'percentage calculator',
    'calculate percentage',
    'percentage increase calculator',
    'percentage decrease calculator',
    'percentage difference calculator',
    'online percentage calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/percentage-calculator/',
  },
  openGraph: {
    title: 'Percentage Calculator – Calculate Percentage Easily',
    description:
      'Calculate percentage, increase, decrease, and difference instantly using A2Tool Percentage Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/percentage-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Percentage Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
