import type { Metadata } from 'next';
import React from 'react';
import SeoMeta from '@/app/components/SeoMeta';
import PercentageCalculator from './PercentageCalculator';

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

export default function  Page() {
  return (
    <>

      <SeoMeta
        title="Percentage Calculator"
        description="Free Percentage Calculator to calculate percentages, increase or decrease percentage, and percentage difference online."
        url="https://a2tool.com/tools/calculatorTools/percentage-calculator/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Calculator Tools", item: "https://a2tool.com/tools/calculatorTools/" },
          { name: "Percentage Calculator", item: "https://a2tool.com/tools/calculatorTools/percentage-calculator/" }
        ]}
        faqs={[{"question":"How do I calculate a percentage increase?","answer":"Enter the original value and the new value, and the calculator will show the exact percentage difference."}]}
      />
      <PercentageCalculator />
    </>
  );
}
