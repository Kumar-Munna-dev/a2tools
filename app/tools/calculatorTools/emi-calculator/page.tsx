import type { Metadata } from 'next';
import React from 'react';
import EMICalculator from './EMICalculator';

export const metadata: Metadata = {
  title: {
    default: 'EMI Calculator – Calculate Loan EMI, Interest & Monthly Payment',
    template: '%s | A2Tool',
  },
  description:
    'Free EMI Calculator to calculate loan EMI, total interest, and monthly payment for home loan, car loan, and personal loan.',
  keywords: [
    'emi calculator',
    'loan emi calculator',
    'monthly emi calculator',
    'home loan emi',
    'car loan emi calculator',
    'personal loan emi calculator',
    'interest calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/emi-calculator/',
  },
  openGraph: {
    title: 'EMI Calculator – Calculate Loan EMI Online',
    description:
      'Calculate EMI, interest amount, and total loan cost instantly using A2Tool EMI Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/emi-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EMI Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <EMICalculator />;
}
