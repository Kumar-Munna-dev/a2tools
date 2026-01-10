'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(5);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const emiData = useMemo(() => {
    const principal = loanAmount;
    const rate = interestRate / 100 / 12;
    const tenure = loanTenure * 12;

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

  const interestPercentage = (emiData.totalInterest / emiData.totalAmount) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12 space-y-8"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">
        EMI Calculator – Calculate Monthly Loan EMI Instantly
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT SIDE CONTROLS */}
        <div className="lg:col-span-3 space-y-8">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loanAmount" className="font-medium">
                Loan amount
              </label>
              <div className="bg-green-100 text-green-800 rounded-md px-3 py-1 font-semibold">
                ₹ {loanAmount.toLocaleString('en-IN')}
              </div>
            </div>
            <input
              type="range"
              id="loanAmount"
              min="10000"
              max="5000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interestRate" className="font-medium">
                Interest rate (p.a)
              </label>
              <div className="bg-green-100 text-green-800 rounded-md px-3 py-1 font-semibold">
                {interestRate} %
              </div>
            </div>
            <input
              type="range"
              id="interestRate"
              min="1"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loanTenure" className="font-medium">
                Loan tenure (years)
              </label>
              <div className="bg-green-100 text-green-800 rounded-md px-3 py-1 font-semibold">
                {loanTenure} Yr
              </div>
            </div>
            <input
              type="range"
              id="loanTenure"
              min="1"
              max="30"
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>
        </div>

        {/* RIGHT SIDE CHART */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <motion.path
                className="text-green-600"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${interestPercentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-gray-500">Monthly EMI</span>
              <span className="text-2xl font-bold text-gray-800">
                {formatCurrency(emiData.emi)}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-sm">Principal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-sm">Interest</span>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="border-t pt-6 space-y-3">
        <div className="flex justify-between text-lg">
          <p className="text-gray-600">Principal amount</p>
          <p className="font-semibold text-gray-800">
            {formatCurrency(emiData.principal)}
          </p>
        </div>
        <div className="flex justify-between text-lg">
          <p className="text-gray-600">Total interest</p>
          <p className="font-semibold text-gray-800">
            {formatCurrency(emiData.totalInterest)}
          </p>
        </div>
        <div className="flex justify-between text-lg">
          <p className="text-gray-600">Total amount</p>
          <p className="font-semibold text-gray-800">
            {formatCurrency(emiData.totalAmount)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
