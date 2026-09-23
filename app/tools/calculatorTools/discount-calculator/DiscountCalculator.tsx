"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";
import ToolSEO from "@/app/components/ToolSEO";
import { calculateDiscount, formatCurrency } from "@/app/utils/calculators";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");

  const [result, setResult] = useState<ReturnType<typeof calculateDiscount> | { error: string } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    const t = parseFloat(tax) || 0;

    if (isNaN(p) || isNaN(d) || p < 0 || d < 0 || t < 0) {
      return setResult({ error: "Please enter valid positive numbers." });
    }

    const calc = calculateDiscount(p, d, t);
    if (!calc) {
      setResult({ error: "Calculation failed due to invalid inputs." });
    } else {
      setResult(calc);
    }
  };

  const clearAll = () => {
    setPrice("");
    setDiscount("");
    setTax("");
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row items-center lg:items-start gap-10 p-4 sm:p-8 dark:bg-slate-950 dark:text-slate-100"
    >
      <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto order-1 lg:order-2" aria-label="Discount Calculator">
        
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Discount Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Calculate final price and savings after discount and tax.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Original Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xl font-medium rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 1000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Discount (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 15"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tax (%) (Optional)</label>
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 5"
                min="0"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 py-3 sm:py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-transform active:scale-95 shadow-sm"
            >
              Calculate Final Price
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
                  <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-2">Final Price To Pay</p>
                  <p className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">
                    {formatCurrency(result.finalPrice)}
                  </p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    You Save: {formatCurrency(result.totalSaved)}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Calculation Breakdown</h3>
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span>Original Price:</span> 
                      <span className="font-medium">{formatCurrency(parseFloat(price))}</span>
                    </div>
                    <div className="flex justify-between text-indigo-500">
                      <span>Discount ({discount}%):</span> 
                      <span className="font-medium">- {formatCurrency(result.discountAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price After Discount:</span> 
                      <span className="font-medium">{formatCurrency(result.priceAfterDiscount)}</span>
                    </div>
                    {parseFloat(tax) > 0 && (
                      <div className="flex justify-between text-red-500">
                        <span>Tax ({tax}%):</span> 
                        <span className="font-medium">+ {formatCurrency(result.taxAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span>Total Final Price:</span> 
                      <span className="text-green-600 dark:text-green-400">{formatCurrency(result.finalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}


      
  

        <ToolSEO 
          title="Discount Calculator"
          howToUse={[
            "Enter the original price of the item.",
            "Enter the discount percentage.",
            "Optionally enter a tax percentage if applicable.",
            "Click calculate to see the final price and your total savings."
          ]}
          features={[
            "Calculates final price instantly",
            "Shows exact amount saved",
            "Supports tax calculations on top of discounted price",
            "Clean and mobile-friendly design"
          ]}
          faqs={[
            { question: "Does tax apply before or after the discount?", answer: "This calculator applies tax to the discounted price, which is standard practice in most retail environments." },
            { question: "Can I use this for sales tax?", answer: "Yes, you can leave the discount at 0 and just use the tax field to calculate final price with sales tax." }
          ]}
        />
      </section>

      <aside className="w-full lg:w-80 order-2 lg:order-1 flex-shrink-0 mt-8 lg:mt-0">
        <RelatedTools currentTool="Calculator" />
      </aside>

    </motion.div>
  );
}