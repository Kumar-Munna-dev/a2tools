import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'EMI Calculator – Calculate Loan EMI, Interest & Tenure Online',
    template: '%s | A2Tool',
  },
  description:
    'Free EMI Calculator to calculate monthly loan EMI, total interest, and repayment amount for home, car, and personal loans online.',
  keywords: [
    'emi calculator',
    'loan emi calculator',
    'home loan emi calculator',
    'car loan emi calculator',
    'personal loan emi calculator',
    'monthly emi calculator',
    'interest calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/emi-calculator/',
  },
  openGraph: {
    title: 'EMI Calculator – Calculate Loan EMI Online',
    description:
      'Calculate monthly EMI, interest, and total loan repayment instantly using A2Tool EMI Calculator.',
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
