'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ToolLayout from '@/app/components/ToolLayout';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number | string>(1000000);
  const [interestRate, setInterestRate] = useState<number | string>(6.5);
  const [loanTenure, setLoanTenure] = useState<number | string>(5);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  const emiData = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const rate = (Number(interestRate) || 0) / 100 / 12;
    const tenure = (Number(loanTenure) || 0) * 12;

    if (principal > 0 && rate > 0 && tenure > 0) {
      const emi =
        (principal * rate * Math.pow(1 + rate, tenure)) /
        (Math.pow(1 + rate, tenure) - 1);
      const totalAmount = emi * tenure;
      const totalInterest = totalAmount - principal;
      return {
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal,
      };
    }
    return { emi: 0, totalAmount: 0, totalInterest: 0, principal };
  }, [loanAmount, interestRate, loanTenure]);

  const interestPercentage =
    emiData.totalAmount > 0
      ? (emiData.totalInterest / emiData.totalAmount) * 100
      : 0;

  return (
    <ToolLayout
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installment (EMI) instantly with precision."
      toolType="Utility"
      categoryPath="/tools/utilityTools"
      categoryName="Utility Tools"
      howToUse={[
        "Enter your total loan amount (principal).",
        "Enter the annual interest rate.",
        "Set the loan tenure (duration) in years.",
        "The calculator instantly updates your monthly EMI, total interest, and total payable amount.",
        "Review the visual chart to see the ratio of principal vs interest."
      ]}
      features={[
        "Real-time instant EMI calculation",
        "Interactive sliders and precise numeric inputs",
        "Visual chart displaying interest vs principal breakdown",
        "100% private, client-side browser processing",
        "Accurate Indian Rupee (₹) currency formatting"
      ]}
      faqs={[
        { question: "What is an EMI?", answer: "Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full." },
        { question: "How is the EMI calculated?", answer: "EMI is calculated using the formula: P x R x (1+R)^N / [(1+R)^N-1] where P stands for the loan amount, R is the interest rate per month, and N is the number of monthly installments." },
        { question: "Is this EMI calculator accurate for home and car loans?", answer: "Yes! As long as your bank uses standard reducing-balance interest formulas (which almost all banks do for home, car, and personal loans), this calculator will provide exact EMI figures." }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* INPUTS SECTION */}
        <div className="space-y-8">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="loanAmount" className="font-semibold text-slate-700 dark:text-slate-300">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full sm:w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                min="0"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={Number(loanAmount) || 0}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="interestRate" className="font-semibold text-slate-700 dark:text-slate-300">
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full sm:w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                min="0"
                step="0.1"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={Number(interestRate) || 0}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Loan Tenure */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="loanTenure" className="font-semibold text-slate-700 dark:text-slate-300">
                Loan Tenure (Years)
              </label>
              <input
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                className="w-full sm:w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                min="0"
                max="30"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={Number(loanTenure) || 0}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>
        </div>

        {/* RESULTS & CHART SECTION */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <motion.path
                className="text-indigo-500"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${interestPercentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${interestPercentage}, 100` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">Monthly EMI</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(emiData.emi)}
              </span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                Principal Amount
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(emiData.principal)}
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                Total Interest
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(emiData.totalInterest)}
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-base font-bold">
              <span className="text-slate-800 dark:text-slate-200">Total Payable</span>
              <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(emiData.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
