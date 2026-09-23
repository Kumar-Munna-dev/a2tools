import type { Metadata } from 'next';
import React from 'react';
import SeoMeta from '@/app/components/SeoMeta';
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
  return (
    <>

      <SeoMeta
        title="BMI Calculator"
        description="Free BMI Calculator to check your Body Mass Index based on height and weight. Instantly find out if you are underweight, normal, overweight, or obese."
        url="https://a2tool.com/tools/calculatorTools/bmi-calculator/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Calculator Tools", item: "https://a2tool.com/tools/calculatorTools/" },
          { name: "BMI Calculator", item: "https://a2tool.com/tools/calculatorTools/bmi-calculator/" }
        ]}
        faqs={[{"question":"What is a healthy BMI?","answer":"A healthy BMI typically falls between 18.5 and 24.9 according to the WHO."}]}
      />
      <BMICalculator />
    </>
  );
}
