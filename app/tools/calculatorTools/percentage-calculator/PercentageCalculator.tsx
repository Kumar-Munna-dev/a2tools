"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");

  // FIXED HERE ⬇⬇⬇
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    const p = parseFloat(percent);
    if (isNaN(v) || isNaN(p)) return setResult("Invalid input");
    setResult(((v * p) / 100).toFixed(2));
  };

  const calculateIncrease = () => {
    const v = parseFloat(value);
    const p = parseFloat(percent);
    if (isNaN(v) || isNaN(p)) return setResult("Invalid input");
    setResult((v + (v * p) / 100).toFixed(2));
  };

  const calculateDecrease = () => {
    const v = parseFloat(value);
    const p = parseFloat(percent);
    if (isNaN(v) || isNaN(p)) return setResult("Invalid input");
    setResult((v - (v * p) / 100).toFixed(2));
  };

  const clearAll = () => {
    setValue("");
    setPercent("");
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold dark:text-slate-50 tracking-tight">Percentage Calculator – Calculate Percentage Online</h1>
          <p className="dark:text-slate-400 mt-2 text-sm">Modern, fast & professional tool to calculate percentages easily</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-smfont-medium">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-indigo-400  transition"
              placeholder="Enter number"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Percent (%)</label>
            <input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-indigo-400  transition"
              placeholder="Enter percentage"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={calculate}
            className="py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            % of Value
          </button>

          <button
            onClick={calculateIncrease}
            className="py-3 rounded-xl bg-green-600 text-white text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            Increase
          </button>

          <button
            onClick={calculateDecrease}
            className="py-3 rounded-xl bg-red-600 text-white text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            Decrease
          </button>

          <button
            onClick={clearAll}
            className="py-3 rounded-xl bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100 text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            Clear
          </button>
        </div>

        {/* Result */}
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-2xl text-center text-xl font-bold shadow-lg"
          >
            Result: {result}
          </motion.div>
        )}

        {/* Tips */}
        <div className="mt-8 text-sm ">
          <p className="font-semibold ">Examples</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>20% of 150 → Enter <b>150</b> & <b>20</b></li>
            <li>Increase ₹500 by 10% → Enter <b>500</b> & <b>10</b></li>
            <li>Decrease 800 by 25% → Enter <b>800</b> & <b>25</b></li>
          </ul>
        </div>

      </div>
      {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Calculator" />
      </div>
    </motion.div>

  );
}
