"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";
import ToolSEO from "@/app/components/ToolSEO";
import { calculatePercentage } from "@/app/utils/calculators";

export default function PercentageCalculator() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [mode, setMode] = useState("percent_of");

  const [result, setResult] = useState<ReturnType<typeof calculatePercentage> | { error: string } | null>(null);

  const handleCalculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    
    if (isNaN(v1) || isNaN(v2)) {
      return setResult({ error: "Please enter valid numbers in both fields." });
    }

    const calc = calculatePercentage(mode, v1, v2);
    if (!calc) {
      setResult({ error: "Calculation failed." });
    } else if (calc.error) {
      setResult({ error: calc.error });
    } else {
      setResult(calc);
    }
  };

  const clearAll = () => {
    setValue1("");
    setValue2("");
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row items-center lg:items-start gap-10 p-4 sm:p-8 dark:bg-slate-950 dark:text-slate-100"
    >
      <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto order-1 lg:order-2" aria-label="Percentage Calculator">
        
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Percentage Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Calculate percentage of a number, percentage increase, and more.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 rounded-2xl shadow-sm">
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Calculation Type</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer font-medium transition ${mode === "percent_of" ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300" : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`}>
                <input type="radio" className="hidden" checked={mode === "percent_of"} onChange={() => setMode("percent_of")} />
                X% of Y
              </label>
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer font-medium transition ${mode === "is_what_percent" ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300" : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`}>
                <input type="radio" className="hidden" checked={mode === "is_what_percent"} onChange={() => setMode("is_what_percent")} />
                X is what % of Y
              </label>
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer font-medium transition ${mode === "percent_change" ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300" : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`}>
                <input type="radio" className="hidden" checked={mode === "percent_change"} onChange={() => setMode("percent_change")} />
                % Change
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {mode === "percent_of" ? "Percentage (X%)" : mode === "is_what_percent" ? "Value (X)" : "From Value (X)"}
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xl font-medium rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 20"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {mode === "percent_of" ? "Value (Y)" : mode === "is_what_percent" ? "Total Value (Y)" : "To Value (Y)"}
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xl font-medium rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g. 150"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 py-3 sm:py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-transform active:scale-95 shadow-sm"
            >
              Calculate
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
              <div className="p-6 sm:p-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-2">{result.explanation}</p>
                <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400 mt-2">
                  {result.result}
                  {mode !== "percent_of" && <span className="text-3xl font-bold ml-1">%</span>}
                </div>
              </div>
            )}
          </motion.div>
        )}


      
  

        <ToolSEO 
          title="Percentage Calculator"
          howToUse={[
            "Choose the type of percentage calculation you need.",
            "Enter the known values in the input fields.",
            "The missing percentage or value is calculated automatically."
          ]}
          features={[
            "Calculate percentage of a number",
            "Find what percentage one number is of another",
            "Calculate percentage increase or decrease safely"
          ]}
          faqs={[
            { question: "How do I calculate a percentage increase?", answer: "Select the '% Change' mode. Enter the original value in the first box and the new value in the second box. The calculator will show the exact percentage difference." },
            { question: "Can I use negative numbers?", answer: "Yes, you can use negative numbers to calculate changes or percentages of negative values." }
          ]}
        />
      </section>

      <aside className="w-full lg:w-80 order-2 lg:order-1 flex-shrink-0 mt-8 lg:mt-0">
        <RelatedTools currentTool="Calculator" />
      </aside>

    </motion.div>
  );
}