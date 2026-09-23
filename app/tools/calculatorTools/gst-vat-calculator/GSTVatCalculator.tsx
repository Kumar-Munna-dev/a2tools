"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";
import ToolSEO from "@/app/components/ToolSEO";
import { calculateGST, formatCurrency } from "@/app/utils/calculators";

export default function GSTVatCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  
  const [result, setResult] = useState<ReturnType<typeof calculateGST> | { error: string } | null>(null);
  const [modeUsed, setModeUsed] = useState<"add" | "remove" | null>(null);

  const handleCalculate = (mode: "add" | "remove") => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    
    if (isNaN(a) || isNaN(r) || a < 0 || r < 0) {
      return setResult({ error: "Please enter valid positive numbers." });
    }

    const calc = calculateGST(a, r, mode);
    if (!calc) {
      setResult({ error: "Calculation failed." });
    } else {
      setResult(calc);
      setModeUsed(mode);
    }
  };

  const clearAll = () => {
    setAmount("");
    setRate("18");
    setResult(null);
    setModeUsed(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row items-center lg:items-start gap-10 p-4 sm:p-8 dark:bg-slate-950 dark:text-slate-100"
    >
      <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto order-1 lg:order-2" aria-label="GST VAT Calculator">
        
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">GST & VAT Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Calculate tax inclusions and exclusions instantly.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Base Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xl font-medium rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 1000"
                min="0"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">GST / VAT Rate (%)</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {[5, 12, 18, 28].map(r => (
                  <button 
                    key={r}
                    onClick={() => setRate(r.toString())}
                    className={`px-3 py-1 text-sm rounded-md font-medium transition ${rate === r.toString() ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Custom Rate"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleCalculate("add")}
              className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-transform active:scale-95 shadow-sm"
            >
              Add GST (+)
            </button>
            <button
              onClick={() => handleCalculate("remove")}
              className="py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-transform active:scale-95 shadow-sm"
            >
              Remove GST (-)
            </button>
            <button
              onClick={clearAll}
              className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-transform active:scale-95 border border-slate-200 dark:border-slate-700"
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
                  <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-2">Gross Amount (Inclusive of Tax)</p>
                  <p className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">
                    {formatCurrency(result.grossAmount, 'INR', 'en-IN')}
                  </p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                    Tax Amount: {formatCurrency(result.taxAmount, 'INR', 'en-IN')}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">
                    {modeUsed === "add" ? "Tax Addition Breakdown" : "Tax Extraction Breakdown"}
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span>Net Amount (Exclusive of Tax):</span> 
                      <span className="font-medium text-slate-900 dark:text-slate-100">{formatCurrency(result.netAmount, 'INR', 'en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-indigo-500">
                      <span>Tax Rate ({rate}%):</span> 
                      <span className="font-medium">+ {formatCurrency(result.taxAmount, 'INR', 'en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span>Gross Amount (Inclusive of Tax):</span> 
                      <span className="text-green-600 dark:text-green-400">{formatCurrency(result.grossAmount, 'INR', 'en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}


      
  

        <ToolSEO 
          title="GST VAT Calculator"
          howToUse={[
            "Enter the base amount.",
            "Select or enter the GST/VAT tax percentage.",
            "Choose whether to Add or Remove the tax.",
            "View the net, gross, and tax amounts."
          ]}
          features={[
            "Add or extract tax from a total",
            "Customizable tax brackets",
            "Instant breakdown of amounts",
            "Indian Number formatting for better readability"
          ]}
          faqs={[
            { question: "What is the difference between Add and Remove GST?", answer: "Add GST calculates the tax on top of a base amount. Remove GST extracts the tax amount from a total inclusive price." },
            { question: "Does this work for VAT too?", answer: "Yes, the math for VAT (Value Added Tax) is identical to GST. Just use your local VAT rate." }
          ]}
        />
      </section>

      <aside className="w-full lg:w-80 order-2 lg:order-1 flex-shrink-0 mt-8 lg:mt-0">
        <RelatedTools currentTool="Calculator" />
      </aside>

    </motion.div>
  );
}