import type { Metadata } from 'next';
import React from 'react';
import CalculatorTools from './CalculatorTools';


export const metadata: Metadata = {
  title: {
    default: 'Online Calculator Tools – Free Calculators for Daily Use',
    template: '%s | Calculator Tools | A2Tool',
  },
  description:
    'Free online calculator tools including age calculator, BMI calculator, EMI calculator, GST calculator, percentage calculator, and more.',
  keywords: [
    'online calculator',
    'calculator tools',
    'age calculator',
    'bmi calculator',
    'emi calculator',
    'gst calculator',
    'percentage calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/',
  },
  openGraph: {
    title: 'Online Calculator Tools – Free & Easy Calculators',
    description:
      'Use free online calculator tools for age, BMI, EMI, GST, percentage, and more on A2Tool.',
    url: 'https://a2tool.com/tools/calculatorTools/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Calculator Tools',
      },
    ],
    type: 'website',
  },
};
export default function  Page() {
  return  <CalculatorTools />;
}
