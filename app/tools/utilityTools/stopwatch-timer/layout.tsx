import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Stopwatch & Timer – Online Countdown and Time Tracker',
    template: '%s | A2Tool',
  },
  description:
    'Free online Stopwatch & Timer tool to track time, measure intervals, and set countdown timers easily and accurately.',
  keywords: [
    'stopwatch',
    'online stopwatch',
    'timer',
    'countdown timer',
    'time tracker',
    'interval timer',
    'stopwatch and timer',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/stopwatch-timer/',
  },
  openGraph: {
    title: 'Stopwatch & Timer – Track Time Online',
    description:
      'Track time and set countdowns instantly using A2Tool Stopwatch & Timer.',
    url: 'https://a2tool.com/tools/utilityTools/stopwatch-timer/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stopwatch and Timer Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
