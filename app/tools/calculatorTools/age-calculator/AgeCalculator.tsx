"use client";
import React, { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import { calculateAge } from "@/app/utils/calculators";
import { Copy, Calculator, Trash2 } from "lucide-react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!dob) return;

    const b = new Date(dob);
    if (isNaN(b.getTime())) return setResult({ error: "Invalid date" });

    const now = toDate ? new Date(toDate) : new Date();
    const data = calculateAge(b, now);

    if (!data) return setResult({ error: "Could not calculate" });

    setResult({ ...data, calculatedAt: now.toLocaleString() });
  };

  const handleClear = () => {
    setDob("");
    setToDate("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Age: ${result.years} years, ${result.months} months, ${result.days} days\nTotal days: ${result.totalDays}\nTotal months: ${result.totalMonths}\nWeeks lived: ${result.weeks}\nNext birthday: ${result.nextBirthday} (in ${result.daysToNext} days)`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Unable to copy");
    }
  };

  return (
    <ToolLayout 
      title="Age Calculator" 
      description="Find your exact age in years, months, and days" 
      toolType="Calculator"
    >
      <div className="flex flex-col gap-6">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 rounded-xl border dark:border-slate-800 dark:bg-slate-950 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-slate-300 mb-1">To Date (Optional)</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-3 rounded-xl border dark:border-slate-800 dark:bg-slate-950 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
          >
            <Calculator size={18} />
            Calculate
          </button>
          <button
            onClick={handleClear}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            <Trash2 size={18} />
            Clear
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-4 p-5 rounded-2xl border dark:border-slate-800 shadow-sm bg-slate-50 dark:bg-slate-900/50">
            {result.error ? (
              <div className="text-red-500 font-medium">{result.error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Exact Age</h2>
                  <div className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-500 dark:text-indigo-400">
                    {result.years} <span className="text-lg font-medium text-slate-600 dark:text-slate-300">yrs</span> • {result.months} <span className="text-lg font-medium text-slate-600 dark:text-slate-300">mos</span> • {result.days} <span className="text-lg font-medium text-slate-600 dark:text-slate-300">days</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Calculated at: {result.calculatedAt}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border dark:border-slate-800">
                  <h3 className="text-sm font-semibold dark:text-slate-300 mb-3">More Details</h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex justify-between"><span>Total days lived:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.totalDays}</span></li>
                    <li className="flex justify-between"><span>Total months:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.totalMonths}</span></li>
                    <li className="flex justify-between"><span>Weeks lived:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.weeks}</span></li>
                    <li className="flex justify-between"><span>Next birthday:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.nextBirthday}</span></li>
                    <li className="flex justify-between"><span>Days to next:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.daysToNext} days</span></li>
                  </ul>
                  <button 
                    onClick={copyResult} 
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium transition"
                  >
                    <Copy size={16} />
                    Copy Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
