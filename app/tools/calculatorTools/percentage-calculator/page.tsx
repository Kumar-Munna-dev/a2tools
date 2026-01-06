"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-100"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Percentage Calculator</h1>
          <p className="text-gray-500 mt-2 text-sm">Modern, fast & professional tool to calculate percentages easily</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600 font-medium">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-gray-50
                focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
              placeholder="Enter number"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Percent (%)</label>
            <input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-gray-50
                focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
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
            className="py-3 rounded-xl bg-gray-200 text-gray-800 text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            Clear
          </button>
        </div>

        {/* Result */}
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-5 bg-gray-900 text-white rounded-2xl text-center text-xl font-bold shadow-lg"
          >
            Result: {result}
          </motion.div>
        )}

        {/* Tips */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-semibold text-gray-700">Examples</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>20% of 150 → Enter <b>150</b> & <b>20</b></li>
            <li>Increase ₹500 by 10% → Enter <b>500</b> & <b>10</b></li>
            <li>Decrease 800 by 25% → Enter <b>800</b> & <b>25</b></li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
