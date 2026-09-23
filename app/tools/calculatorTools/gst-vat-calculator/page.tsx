import type { Metadata } from 'next';
import React from 'react';
import SeoMeta from '@/app/components/SeoMeta';
import GSTVatCalculator from './GSTVatCalculator';

export const metadata: Metadata = {
  title: {
    default: 'GST & VAT Calculator – Calculate Tax Amount and Final Price Online',
    template: '%s | A2Tool',
  },
  description:
    'Free GST & VAT Calculator to calculate tax amount, net price, and final price including GST or VAT instantly online.',
  keywords: [
    'gst calculator',
    'vat calculator',
    'gst tax calculator',
    'vat tax calculator',
    'price including gst',
    'tax calculator online',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/gst-vat-calculator/',
  },
  openGraph: {
    title: 'GST & VAT Calculator – Calculate Tax Online',
    description:
      'Calculate GST or VAT amount and final price instantly using A2Tool GST & VAT Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/gst-vat-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GST and VAT Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return (
    <>

      <SeoMeta
        title="GST & VAT Calculator"
        description="Free GST & VAT Calculator to calculate tax amount, net price, and final price including GST or VAT instantly online."
        url="https://a2tool.com/tools/calculatorTools/gst-vat-calculator/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Calculator Tools", item: "https://a2tool.com/tools/calculatorTools/" },
          { name: "GST & VAT Calculator", item: "https://a2tool.com/tools/calculatorTools/gst-vat-calculator/" }
        ]}
        faqs={[{"question":"What is the difference between Add and Remove GST?","answer":"Add GST calculates the tax on top of a base amount. Remove GST extracts the tax amount from a total inclusive price."}]}
      />
      <GSTVatCalculator />
    </>
  );
}
