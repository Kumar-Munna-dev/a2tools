import type { Metadata } from 'next';
import React from 'react';
import BMICalculator from './BMICalculator';

export const metadata: Metadata = {
  title: {
    default: 'BMI Calculator – Check Body Mass Index Online',
    template: '%s | A2Tool',
  },
  description:
    'Free BMI Calculator to check your Body Mass Index based on height and weight. Instantly find out if you are underweight, normal, overweight, or obese.',
  keywords: [
    'bmi calculator',
    'body mass index calculator',
    'bmi check online',
    'health calculator',
    'weight height bmi',
    'calculate bmi',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/bmi-calculator/',
  },
  openGraph: {
    title: 'BMI Calculator – Check Your Body Mass Index',
    description:
      'Calculate your BMI instantly using height and weight with A2Tool BMI Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/bmi-calculator/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BMI Calculator Tool',
      },
    ],
    type: 'website',
  },
};

export default function  Page() {
  return  <BMICalculator />;
}
