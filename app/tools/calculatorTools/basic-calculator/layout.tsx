import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Basic Calculator – Simple Online Calculator for Everyday Math',
    template: '%s | A2Tool',
  },
  description:
    'Free Basic Calculator to perform simple arithmetic operations like addition, subtraction, multiplication, and division online.',
  keywords: [
    'basic calculator',
    'simple calculator',
    'online calculator',
    'addition calculator',
    'subtraction calculator',
    'multiplication calculator',
    'division calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/basic-calculator/',
  },
  openGraph: {
    title: 'Basic Calculator – Simple Online Calculator',
    description:
      'Perform quick and accurate calculations using A2Tool Basic Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/basic-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Basic Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
