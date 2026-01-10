"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  // FIXED TYPES HERE ⬇⬇⬇
  const [result, setResult] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const calculateDiscount = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);

    if (isNaN(p) || isNaN(d)) return;

    const discountAmount = (p * d) / 100;
    const finalPrice = p - discountAmount;

    setSaved(discountAmount.toFixed(2)); // string OK
    setResult(finalPrice.toFixed(2)); // string OK
  };

  const clearAll = () => {
    setPrice("");
    setDiscount("");
    setSaved(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
      >
        {/* Heading */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Discount Calculator – Calculate Final Price After Discountr</h1>
          <p className="text-sm text-gray-500 mt-2">Find final price after applying any discount</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Original Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter discount %"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={calculateDiscount}
            className="py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow hover:shadow-lg active:scale-95 transition"
          >
            Calculate
          </button>

          <button
            onClick={clearAll}
            className="py-3 rounded-xl bg-gray-200 text-gray-800 text-sm font-semibold shadow hover:shadow-lg active:scale-95 transition"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        {(result || saved) && (
          <div className="mt-10 space-y-4">
            {saved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-600 text-white rounded-2xl text-center text-lg font-semibold shadow-lg"
              >
                You Save: ₹{saved}
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-green-600 text-white rounded-2xl text-center text-2xl font-bold shadow-lg"
              >
                Final Price: ₹{result}
              </motion.div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="mt-10 text-sm text-gray-600">
          <p className="font-semibold text-gray-700">Examples</p>
          <ul className="list-disc ml-5 mt-2 space-y-2">
            <li>10% off on ₹1000 → Enter <b>1000</b> & <b>10</b></li>
            <li>25% discount on ₹800 → Enter <b>800</b> & <b>25</b></li>
            <li>Great for shopping, offers, festival sales & more!</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
