import type { Metadata } from 'next';
import React from 'react';
import EMICalculator from './EMICalculator';
import SeoMeta from '@/app/components/SeoMeta';

export const metadata: Metadata = {
  title: 'EMI Calculator – Calculate Loan EMI, Interest & Tenure Online | A2Tool',
  description:
    'Free EMI Calculator to calculate monthly loan EMI, total interest, and repayment amount for home, car, and personal loans online.',
  keywords: [
    'emi calculator',
    'loan emi calculator',
    'home loan emi calculator',
    'car loan emi calculator',
    'personal loan emi calculator',
    'monthly emi calculator',
    'interest calculator',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/calculatorTools/emi-calculator/',
  },
  openGraph: {
    title: 'EMI Calculator – Calculate Loan EMI Online',
    description:
      'Calculate monthly EMI, interest, and total loan repayment instantly using A2Tool EMI Calculator.',
    url: 'https://a2tool.com/tools/calculatorTools/emi-calculator/',
    siteName: 'A2Tool',
    images: ['/og-image.png'],
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <SeoMeta
        title="EMI Calculator"
        description="Calculate your Equated Monthly Installment (EMI) instantly with precision."
        url="https://a2tool.com/tools/calculatorTools/emi-calculator/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Utility Tools", item: "https://a2tool.com/tools/utilityTools/" },
          { name: "EMI Calculator", item: "https://a2tool.com/tools/calculatorTools/emi-calculator/" }
        ]}
        faqs={[
          { question: "What is an EMI?", answer: "Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month." },
          { question: "How is the EMI calculated?", answer: "EMI is calculated using the formula: P x R x (1+R)^N / [(1+R)^N-1] where P stands for the loan amount, R is the interest rate per month, and N is the number of monthly installments." },
          { question: "Is this EMI calculator accurate for home and car loans?", answer: "Yes! As long as your bank uses standard reducing-balance interest formulas." }
        ]}
      />
      <EMICalculator />
    </>
  );
}
