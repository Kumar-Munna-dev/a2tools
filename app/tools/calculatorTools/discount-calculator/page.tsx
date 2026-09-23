import type { Metadata } from 'next';
import React from 'react';
import SeoMeta from '@/app/components/SeoMeta';
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
  return (
    <>

      <SeoMeta
        title="Discount Calculator"
        description="Free Discount Calculator to calculate final price after discount, savings amount, and discount percentage instantly online."
        url="https://a2tool.com/tools/calculatorTools/discount-calculator/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Calculator Tools", item: "https://a2tool.com/tools/calculatorTools/" },
          { name: "Discount Calculator", item: "https://a2tool.com/tools/calculatorTools/discount-calculator/" }
        ]}
        faqs={[{"question":"Can I use this for sales tax?","answer":"Yes, by entering a negative discount or using it to find the percentage difference."}]}
      />
      <DiscountCalculator />
    </>
  );
}
