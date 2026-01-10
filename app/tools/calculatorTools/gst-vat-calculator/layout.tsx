import type { Metadata } from 'next';
import React from 'react';

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
