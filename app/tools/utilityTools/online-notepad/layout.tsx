import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Online Notepad – Write, Edit & Save Notes Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Online Notepad to write, edit, and save notes instantly in your browser. No login required, fast and secure.',
  keywords: [
    'online notepad',
    'notepad online',
    'write notes online',
    'browser notepad',
    'text editor online',
    'free online notepad',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/online-notepad/',
  },
  openGraph: {
    title: 'Online Notepad – Write & Save Notes Online',
    description:
      'Write, edit, and save notes instantly using A2Tool Online Notepad. No sign-up required.',
    url: 'https://a2tool.com/tools/utilityTools/online-notepad/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Online Notepad Tool',
      },
    ],
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
