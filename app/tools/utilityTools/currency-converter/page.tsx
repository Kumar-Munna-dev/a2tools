import type { Metadata } from 'next';
import React from 'react';
import CurrencyConverter from './CurrencyConverter';

export const metadata: Metadata = {
  title: {
    default: 'Currency Converter – Convert Exchange Rates Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Currency Converter to convert exchange rates between major world currencies with real-time conversion online.',
  keywords: [
    'currency converter',
    'exchange rate converter',
    'money converter',
    'foreign exchange calculator',
    'fx rate converter',
    'online currency converter',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/currency-converter/',
  },
  openGraph: {
    title: 'Currency Converter – Convert Exchange Rates',
    description:
      'Convert currencies and exchange rates instantly using A2Tool Currency Converter.',
    url: 'https://a2tool.com/tools/utilityTools/currency-converter/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Currency Converter Tool',
      },
    ],
    type: 'website',
  },
};

export default function Page() {
  return <CurrencyConverter />;
}
