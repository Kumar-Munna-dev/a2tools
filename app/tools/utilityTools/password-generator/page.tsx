import type { Metadata } from 'next';
import React from 'react';
import PasswordGenerator from './PasswordGenerator';

export const metadata: Metadata = {
  title: {
    default: 'Password Generator – Create Strong & Secure Passwords Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Password Generator to create strong, secure, and random passwords online. Customize length, symbols, numbers, and characters.',
  keywords: [
    'password generator',
    'strong password generator',
    'secure password generator',
    'random password generator',
    'online password generator',
    'password creator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/password-generator/',
  },
  openGraph: {
    title: 'Password Generator – Create Secure Passwords',
    description:
      'Generate strong and secure passwords instantly using A2Tool Password Generator.',
    url: 'https://a2tool.com/tools/utilityTools/password-generator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Password Generator Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <PasswordGenerator />;
}
