"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");

  // FIXED TYPES ⬇⬇⬇
  const [emi, setEmi] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  const [totalPayment, setTotalPayment] = useState<string | null>(null);

  const [interestType, setInterestType] = useState("reducing");

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(months);

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || n <= 0) return;

    let emiValue, totalPay, interest;

    switch (interestType) {
      case "reducing":
        if (r === 0) {
          emiValue = p / n;
          totalPay = p;
          interest = 0;
        } else {
          emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          totalPay = emiValue * n;
          interest = totalPay - p;
        }
        break;

      case "flat":
        const totalInterestFlat = (p * parseFloat(rate) * n) / (12 * 100);
        totalPay = p + totalInterestFlat;
        emiValue = totalPay / n;
        interest = totalInterestFlat;
        break;

      case "zero":
        emiValue = p / n;
        totalPay = p;
        interest = 0;
        break;

      case "balloon":
        const balloon = p * 0.3;
        const monthlyPrincipal = (p - balloon) / n;
        emiValue = monthlyPrincipal + p * r;
        totalPay = emiValue * (n - 1) + (emiValue + balloon);
        interest = totalPay - p;
        break;

      case "interestOnly":
        emiValue = p * r;
        totalPay = emiValue * n + p;
        interest = emiValue * n;
        break;

      default:
        return;
    }

    setEmi(emiValue.toFixed(2));
    setTotalInterest(interest.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
  };

  const clearAll = () => {
    setPrincipal("");
    setRate("");
    setMonths("");
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
  };

  const tabs = [
    { key: "reducing", label: "Reducing Balance" },
    { key: "flat", label: "Flat Interest" },
    { key: "zero", label: "Zero Interest" },
    { key: "balloon", label: "Balloon Payment" },
    { key: "interestOnly", label: "Interest Only" },
  ];

  return (
  <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-100"
      >
        <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600">Calculator – Calculate Loan EMI and Interest Easily</h1>
          <p className="text-sm text-gray-600 mt-2">
            Select interest type and calculate EMI instantly
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setInterestType(tab.key)}
              className={`px-4 py-2 rounded-full font-semibold border transition ${
                interestType === tab.key
                  ? "bg-blue-500 text-white border-blue-500"
                  : " datk:text-slate-100 border-gray-300 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm dark:text-slate-400">Loan Amount</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="100000"
              min="0"
            />
          </div>

          <div>
            <label className="text-sm dark:text-slate-400">Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="12"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="text-sm dark:text-slate-400">Duration (Months)</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="36"
              min="1"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={calculateEMI}
            className="py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition font-semibold shadow-md active:scale-95"
          >
            Calculate EMI
          </button>

          <button
            onClick={clearAll}
            className="py-3 rounded-xl bg-gray-200 text-black hover:bg-gray-300 transition font-semibold shadow-md active:scale-95"
          >
            Clear
          </button>
        </div>

        {(emi || totalInterest || totalPayment) && (
          <div className="mt-12 space-y-4">
            {emi && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 rounded-xl 
                dark:bg-slate-950 border border-blue-300 text-center text-xl font-bold shadow-md"
              >
                Monthly EMI: ₹{emi}
              </motion.div>
            )}

            {totalInterest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 rounded-xl dark:bg-slate-950 border border-red-300 text-center text-lg font-semibold shadow-md"
              >
                Total Interest: ₹{totalInterest}
              </motion.div>
            )}

            {totalPayment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 rounded-xl dark:bg-slate-950 border border-green-300 text-center text-lg font-semibold shadow-md"
              >
                Total Payable: ₹{totalPayment}
              </motion.div>
            )}
          </div>
        )}
        </div>

          {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Calculator" />
      </div>
      </motion.div>

  );
}
