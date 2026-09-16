
import type { Metadata } from 'next';
import React from 'react';
import WordCounter from './WordCounter';

export const metadata: Metadata = {
  title: {
    default: 'Word Counter – Count Words and Improve Writing',
    template: '%s | A2Tool',
  },
  description: 'Free online word counter to instantly count words, characters, sentences, paragraphs, and estimate reading time. Perfect for writers, students, and SEO content creators.',
  keywords: [
    'word counter',
    'word count',
    'character counter',
    'sentence counter',
    'online word counter',
    'text counter',
    'reading time calculator',
    'paragraph counter',
    'word count tool',
    'free word counter',
  ],
  authors: [{ name: "A2Tool", url: "https://a2tool.com" }],
  creator: "A2Tool",
  publisher: "A2Tool",
  category: "Text Tools",
  metadataBase: new URL('https://a2tool.com'),
  alternates: {
    canonical: 'https://a2tool.com/tools/textTools/word-counter/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: 'Online Word Counter – Instantly Count Words & Characters',
    description: 'A free and easy-to-use word counter that provides detailed statistics about your text, including word, character, and sentence count, plus reading time.',
    url: 'https://a2tool.com/tools/textTools/word-counter/',
    siteName: 'A2Tool',
    locale: "en_US",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A2Tool Online Word Counter',
        type: "image/png",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter – Free Online Tool by A2Tool",
    description:
      "Instantly count words, characters, sentences, and paragraphs. A simple, fast, and private tool for all your writing needs.",
    images: ["/og-image.png"],
    site: "@a2tool",
    creator: "@a2tool",
  },
  other: {
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Word Counter",
        url: "https://a2tool.com/tools/textTools/word-counter/",
        description: "Free online tool to count words, characters, sentences, paragraphs, and estimate reading time.",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a Word Counter?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A word counter is an online tool that counts the number of words, characters, sentences, and paragraphs in a text. It also often provides an estimated reading time.",
            },
          },
          {
            "@type": "Question",
            name: "How is reading time calculated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Reading time is typically estimated based on an average reading speed of 200 words per minute.",
            },
          },
        ],
      },
    ]),
  },
};

export default function  Page() {
  return  <WordCounter />;
}
