import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Scientific Calculator – Advanced Online Math Calculator',
    template: '%s | A2Tool',
  },
  description:
    'Free Scientific Calculator to perform advanced math operations including trigonometry, logarithms, powers, roots, and equations online.',
  keywords: [
    'scientific calculator',
    'online scientific calculator',
    'advanced calculator',
    'math calculator',
    'trigonometry calculator',
    'logarithm calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/scientific-calculator/',
  },
  openGraph: {
    title: 'Scientific Calculator – Advanced Math Calculator',
    description:
      'Solve complex math problems instantly using A2Tool Scientific Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/scientific-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scientific Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
