"use client";
import React, { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import { calculateAge } from "@/app/utils/calculators";
import { Copy, Calculator, Trash2 } from "lucide-react";
import RelatedTools from "@/app/components/RelatedTools";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateAge> & { error?: string; calculatedAt?: string } | null>(null);

  const handleCalculate = () => {
    if (!dob) {
      setResult({ error: "Please enter your Date of Birth." } as any);
      return;
    }

    const b = new Date(dob);
    if (isNaN(b.getTime())) return setResult({ error: "Invalid birth date" } as any);

    const now = toDate ? new Date(toDate) : new Date();
    if (isNaN(now.getTime())) return setResult({ error: "Invalid target date" } as any);

    if (now < b) return setResult({ error: "Target date must be after birth date" } as any);

    const data = calculateAge(b, now);
    if (!data) return setResult({ error: "Could not calculate age" } as any);

    setResult({ ...data, calculatedAt: new Date().toLocaleTimeString() } as any);
  };

  const handleClear = () => {
    setDob("");
    setToDate("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result || result.error) return;
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
      description="Find your exact age in years, months, and days instantly." 
      toolType="Calculator"
      categoryPath="/tools/calculatorTools"
      categoryName="Calculator Tools"
      howToUse={["Select your Date of Birth.","Select the target date (defaults to today).","Click calculate to see your exact age in years, months, and days."]}
      features={["Precise calculation down to days","Compares any two dates in history","Instant client-side calculation"]}
      faqs={[{"question":"Is this age calculator accurate?","answer":"Yes, it accounts for leap years and varying month lengths to give an exact chronological age."},{"question":"Can I check my age on a specific future date?","answer":"Absolutely. Just change the 'To Date' to any future date."}]}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">To Date (Optional)</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCalculate}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg transition-transform active:scale-95 shadow-sm"
              >
                <Calculator size={20} />
                Calculate Age
              </button>
              <button
                onClick={handleClear}
                className="w-full sm:w-1/3 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-transform active:scale-95 border border-slate-200 dark:border-slate-700"
              >
                <Trash2 size={18} />
                Reset
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
              {result.error ? (
                <div className="text-red-500 font-medium text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">{result.error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Exact Age</h2>
                    <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {result.years} <span className="text-lg font-medium text-slate-600 dark:text-slate-300 mr-2">yrs</span>
                      {result.months} <span className="text-lg font-medium text-slate-600 dark:text-slate-300 mr-2">mos</span>
                      {result.days} <span className="text-lg font-medium text-slate-600 dark:text-slate-300">days</span>
                    </div>
                    <div className="mt-4 text-xs font-mono text-slate-500 dark:text-slate-500">
                      Calculated at: {result.calculatedAt}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">More Details</h3>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3">
                      <li className="flex justify-between border-b border-slate-200/50 dark:border-slate-700/50 pb-1"><span>Total days lived:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.totalDays}</span></li>
                      <li className="flex justify-between border-b border-slate-200/50 dark:border-slate-700/50 pb-1"><span>Total months:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.totalMonths}</span></li>
                      <li className="flex justify-between border-b border-slate-200/50 dark:border-slate-700/50 pb-1"><span>Weeks lived:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.weeks}</span></li>
                      <li className="flex justify-between border-b border-slate-200/50 dark:border-slate-700/50 pb-1"><span>Next birthday:</span> <span className="font-medium text-slate-900 dark:text-slate-200">{result.nextBirthday?.toString()}</span></li>
                      <li className="flex justify-between pt-1"><span>Days to next:</span> <span className="font-medium text-indigo-600 dark:text-indigo-400">{result.daysToNext} days</span></li>
                    </ul>
                    <button 
                      onClick={copyResult} 
                      className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition shadow-sm active:scale-95"
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
        
        <aside className="w-full lg:w-80 flex-shrink-0">
          <RelatedTools currentTool="Calculator" />
        </aside>
      </div>
    </ToolLayout>
  );
}
