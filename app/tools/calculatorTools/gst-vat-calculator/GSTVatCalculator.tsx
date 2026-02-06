"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";

export default function GSTVatCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");

  // FIXED TYPES BELOW ⬇⬇⬇
  const [gstAmount, setGstAmount] = useState<string | null>(null);
  const [finalAmount, setFinalAmount] = useState<string | null>(null);
  const [exclusiveAmount, setExclusiveAmount] = useState<string | null>(null);

  const calculateInclusive = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r)) return;

    const gst = (a * r) / 100;
    const total = a + gst;

    setGstAmount(gst.toFixed(2));
    setFinalAmount(total.toFixed(2));
    setExclusiveAmount(null);
  };

  const calculateExclusive = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r)) return;

    const base = a / (1 + r / 100);
    const gst = a - base;

    setExclusiveAmount(base.toFixed(2));
    setGstAmount(gst.toFixed(2));
    setFinalAmount(a.toFixed(2));
  };

  const clearAll = () => {
    setAmount("");
    setRate("18");
    setGstAmount(null);
    setFinalAmount(null);
    setExclusiveAmount(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold dark:text-slate-50 tracking-tight">GST & VAT Calculator – Calculate Tax and Final Price</h1>
          <p className="dark:text-slate-400 mt-2 text-sm">Calculate Goods & Services Tax quickly and accurately</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm dark:text-slate-600 font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300  focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="text-sm font-medium">GST / VAT Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400  transition"
              placeholder="Enter rate"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={calculateInclusive}
            className="py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            Add GST
          </button>

          <button
            onClick={calculateExclusive}
            className="py-3 rounded-xl bg-amber-600 text-white text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            Remove GST
          </button>

          <button
            onClick={clearAll}
            className="py-3 rounded-xl bg-gray-200 text-gray-800 text-sm font-semibold shadow hover:shadow-md active:scale-95 transition"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        {(gstAmount || finalAmount || exclusiveAmount) && (
          <div className="mt-8 space-y-3">
            {exclusiveAmount && (
              <div className="p-4 bg-gray-900 text-white rounded-2xl text-center text-lg font-semibold">
                Base Amount (Without GST): {exclusiveAmount}
              </div>
            )}

            {gstAmount && (
              <div className="p-4 bg-indigo-700 text-white rounded-2xl text-center text-lg font-semibold">
                GST Amount: {gstAmount}
              </div>
            )}

            {finalAmount && (
              <div className="p-4 bg-green-700 text-white rounded-2xl text-center text-lg font-semibold">
                Final Amount: {finalAmount}
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 text-sm ">
          <p className="font-semibold ">Examples</p>
          <ul className="list-disc ml-5 mt-2 space-y-2">
            <li>Add 18% GST to ₹1000 → Enter <b>1000</b> & <b>18</b></li>
            <li>Price includes 18% GST (₹1180) → Enter <b>1180</b> & <b>18</b> then click <b>Remove GST</b></li>
            <li>Useful for VAT too — just enter your VAT rate</li>
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
