import type { Metadata } from 'next';
import React from 'react';
import PasswordGenerator from './PasswordGenerator';
import SeoMeta from '@/app/components/SeoMeta';

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

export default function Page() {
  return (
    <>
      <SeoMeta
        title="Password Generator"
        description="Free online password generator. Create strong and secure passwords."
        url="https://a2tool.com/tools/utilityTools/password-generator/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Utility Tools", item: "https://a2tool.com/tools/utilityTools/" },
          { name: "Password Generator", item: "https://a2tool.com/tools/utilityTools/password-generator/" }
        ]}
        faqs={[
          { question: "What makes a strong password?", answer: "A strong password is generally at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols." },
          { question: "Are the passwords generated here secure?", answer: "Yes. This tool uses local client-side processing, meaning the passwords are created directly in your browser." },
          { question: "Why should I use a password generator?", answer: "Humans are naturally bad at creating truly random strings. A generator ensures your password is not susceptible to dictionary or brute-force attacks." }
        ]}
      />
      <PasswordGenerator />
    </>
  );
}
