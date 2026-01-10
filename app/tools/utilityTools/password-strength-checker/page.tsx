import type { Metadata } from 'next';
import React from 'react';
import PasswordStrengthChecker from './PasswordStrengthChecker';

export const metadata: Metadata = {
  title: {
    default: 'Password Strength Checker – Test Password Security Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Password Strength Checker to test password security, strength, and complexity instantly. Check weak, strong, or secure passwords online.',
  keywords: [
    'password strength checker',
    'password security checker',
    'check password strength',
    'strong password test',
    'password safety checker',
    'online password checker',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/password-strength-checker/',
  },
  openGraph: {
    title: 'Password Strength Checker – Test Password Security',
    description:
      'Check how strong and secure your password is using A2Tool Password Strength Checker.',
    url: 'https://a2tool.com/tools/utilityTools/password-strength-checker/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Password Strength Checker Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <PasswordStrengthChecker />;
}
