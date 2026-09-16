import type { Metadata } from 'next';
import React from 'react';
import UuidGenerator from './UuidGenerator';
import SeoMeta from '@/app/components/SeoMeta';

export const metadata: Metadata = {
  title: {
    default: 'UUID/GUID Generator – Generate Random v4 & v1 UUIDs',
    template: '%s | A2Tool',
  },
  description:
    'Free online UUID/GUID generator. Instantly generate random (v4) and time-based (v1) UUIDs in bulk with uppercase/lowercase options.',
  keywords: [
    'uuid generator',
    'guid generator',
    'generate uuid',
    'random guid',
    'uuid v4',
    'uuid v1',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/uuid-generator/',
  },
  openGraph: {
    title: 'UUID/GUID Generator – Generate Random UUIDs Online',
    description:
      'Instantly generate single or bulk UUIDs/GUIDs. Fast, free, and secure.',
    url: 'https://a2tool.com/tools/utilityTools/uuid-generator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UUID Generator Tool',
      },
    ],
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <SeoMeta 
        title="UUID/GUID Generator"
        description="Free online UUID/GUID generator."
        url="https://a2tool.com/tools/utilityTools/uuid-generator/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Utility Tools", item: "https://a2tool.com/tools/utilityTools/" },
          { name: "UUID/GUID Generator", item: "https://a2tool.com/tools/utilityTools/uuid-generator/" }
        ]}
        faqs={[
          { question: "What is a UUID?", answer: "A Universally Unique Identifier (UUID) is a 128-bit number used to uniquely identify information in computer systems." },
          { question: "What is the difference between UUID v1 and v4?", answer: "UUID Version 4 is generated using random numbers. UUID Version 1 is generated using the computer's MAC address and the current time." },
          { question: "Are these UUIDs generated securely?", answer: "Yes, this tool uses your browser's native cryptographic API to ensure high-quality randomness and security." }
        ]}
      />
      <UuidGenerator />
    </>
  );
}
