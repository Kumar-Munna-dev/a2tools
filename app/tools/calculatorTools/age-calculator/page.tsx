import type { Metadata } from 'next';
import React from 'react';
import AgeCalculator from './AgeCalculator';

export const metadata: Metadata = {
  title: {
    default: 'Age Calculator – Calculate Your Exact Age in Years, Months & Days',
    template: '%s | A2Tool',
  },
  description:
    'Free Age Calculator to calculate your exact age in years, months, days, hours, and minutes based on your date of birth.',
  keywords: [
    'age calculator',
    'calculate age',
    'date of birth calculator',
    'exact age calculator',
    'age in years months days',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/age-calculator/',
  },
  openGraph: {
    title: 'Age Calculator – Calculate Exact Age Online',
    description:
      'Calculate your exact age instantly in years, months, and days using A2Tool Age Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/age-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Age Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <AgeCalculator />;
}
