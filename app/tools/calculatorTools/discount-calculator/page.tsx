import type { Metadata } from 'next';
import React from 'react';
import DiscountCalculator from './DiscountCalculator';

export const metadata: Metadata = {
  title: {
    default: 'Discount Calculator – Calculate Price After Discount Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Discount Calculator to calculate final price after discount, savings amount, and discount percentage instantly online.',
  keywords: [
    'discount calculator',
    'calculate discount',
    'price after discount',
    'discount percentage calculator',
    'sale price calculator',
    'online discount calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/discount-calculator/',
  },
  openGraph: {
    title: 'Discount Calculator – Calculate Discounted Price',
    description:
      'Calculate discounted price, savings, and final amount instantly using A2Tool Discount Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/discount-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Discount Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <DiscountCalculator />;
}
