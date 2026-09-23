"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";
import ToolSEO from "@/app/components/ToolSEO";
import { calculateEMI, formatCurrency } from "@/app/utils/calculators";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");

  const [result, setResult] = useState<ReturnType<typeof calculateEMI> | { error: string } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const m = parseFloat(months);

    if (isNaN(p) || isNaN(r) || isNaN(m) || p <= 0 || m <= 0 || r < 0) {
      return setResult({ error: "Please enter valid positive values." });
    }

    if (p > 1000000000) {
      return setResult({ error: "Loan amount exceeds maximum limit." });
    }

    const calc = calculateEMI(p, r, m);
    if (!calc) {
      setResult({ error: "Calculation failed." });
    } else {
      setResult(calc);
    }
  };

  const clearAll = () => {
    setPrincipal("");
    setRate("");
    setMonths("");
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row items-center lg:items-start gap-10 p-4 sm:p-8 dark:bg-slate-950 dark:text-slate-100"
    >
      <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto order-1 lg:order-2" aria-label="EMI Calculator">
        
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">EMI Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Calculate Loan Equated Monthly Installments exactly.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Loan Amount (Principal)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">₹</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full pl-10 p-4 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-lg font-medium rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="e.g. 100000"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 8.5"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tenure (Months)</label>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 60"
                min="1"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 py-3 sm:py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-transform active:scale-95 shadow-sm"
            >
              Calculate EMI
            </button>
            <button
              onClick={clearAll}
              className="w-full sm:w-1/3 py-3 sm:py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-transform active:scale-95 border border-slate-200 dark:border-slate-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
          >
            {"error" in result ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-center font-medium">
                {result.error}
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-2">Monthly EMI</p>
                  <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                    {formatCurrency(result.monthlyEMI, 'INR', 'en-IN')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Total Interest Payable</p>
                    <p className="text-xl font-bold text-red-500 dark:text-red-400">
                      {formatCurrency(result.totalInterest, 'INR', 'en-IN')}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Total Payment (Principal + Interest)</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-500">
                      {formatCurrency(result.totalPayment, 'INR', 'en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <ToolSEO 
          title="EMI Calculator"
          howToUse={[
            "Enter the total loan amount you wish to borrow.",
            "Enter the annual interest rate.",
            "Enter the loan tenure (duration) in months.",
            "Click calculate to see your exact Monthly EMI and interest breakdown."
          ]}
          features={[
            "Standard reducing-balance mathematical formula",
            "Instantly calculates total interest over loan life",
            "Indian Rupee number formatting supported",
            "Safe client-side calculation"
          ]}
          faqs={[
            { question: "What is an EMI?", answer: "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month." },
            { question: "Does this use the reducing balance method?", answer: "Yes, this calculator uses the standard reducing balance method universally used by banks for home and car loans." }
          ]}
        />
      </section>

      <aside className="w-full lg:w-80 order-2 lg:order-1 flex-shrink-0 mt-8 lg:mt-0">
        <RelatedTools currentTool="Calculator" />
      </aside>

    </motion.div>
  );
}
