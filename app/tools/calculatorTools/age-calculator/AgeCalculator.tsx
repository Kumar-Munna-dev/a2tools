"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";

/* -------------------------------------------
   FIXED FULL AGE CALCULATOR FUNCTION (TS SAFE)
-------------------------------------------- */
function calculateAge(birth: Date, now: Date = new Date()) {
  if (!(birth instanceof Date) || isNaN(birth.getTime())) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const totalMonths = years * 12 + months;
  const weeks = Math.floor(totalDays / 7);

  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  const daysToNext = Math.ceil(
    (nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    weeks,
    nextBirthday: nextBirthday.toDateString(),
    daysToNext,
  };
}

/* -------------------------------------------
       MAIN COMPONENT (UI)
-------------------------------------------- */
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

    setResult({ ...(data as any), calculatedAt: now.toLocaleString() });
  };

  const handleClear = () => {
    setDob("");
    setToDate("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;

    const text = `
Age: ${result.years} years, ${result.months} months, ${result.days} days
Total days: ${result.totalDays}
Total months: ${result.totalMonths}
Weeks lived: ${result.weeks}
Next birthday: ${result.nextBirthday} (in ${result.daysToNext} days)
    `;

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Unable to copy");
    }
  };

  return (
   <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-100"
      >
        <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-slate-100">Age Calculator – Calculate Your Exact Age</h1>
          <p className="text-sm dark:slate-400 mt-1">
            Find your exact age in years, months, and days
          </p>
        </div>

        {/* Inputs */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium dark;text-slate-400">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 w-full p-3 rounded-xl border dark:border-slate-800 dark:bg-slate-950 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium dark:text-slate-100 mt-2 sm:mt-0">To Date (Optional)</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="mt-1 w-full p-3 rounded-xl border dark:bg-slate-950 dark:border-slate-800 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCalculate}
              className="py-3 px-4 rounded-xl bg-indigo-500 text-white font-medium hover:shadow-md"
            >
              Calculate
            </button>

            <button
              onClick={handleClear}
              className="py-3 px-4 rounded-xl bg-indigo-500 text-white font-medium hover:shadow-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 dark:bg-slate-950 p-4 rounded-2xl border dark:border-slate-800 shadow-sm">
            {result.error ? (
              <div className="text-red-500 font-medium">{result.error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left */}
                <div>
                  <h2 className="text-lg font-semibold dark:text-slate-100">Exact Age</h2>
                  <div className="mt-2 text-2xl font-bold dark:text-slate-400">
                    {result.years} yrs • {result.months} mos • {result.days} days
                  </div>
                  <div className="mt-2 text-sm dark:text-slate-400">
                    Calculated at: {result.calculatedAt}
                  </div>
                </div>

                {/* Right */}
                <div>
                  <h3 className="text-lg font-semibold dark:text-slate-100">More Details</h3>
                  <ul className="mt-2 text-sm dark:text-slate-400 list-disc ml-5 space-y-1">
                    <li>
                      Total days lived:{" "}
                      <span className="font-medium dark:text-slate-4000">{result.totalDays}</span>
                    </li>
                    <li>
                      Total months:{" "}
                      <span className="font-medium dark:text-slate-400">{result.totalMonths}</span>
                    </li>
                    <li>
                      Weeks lived:{" "}
                      <span className="font-medium dark:text-slate-400">{result.weeks}</span>
                    </li>
                    <li>
                      Next birthday:{" "}
                      <span className="font-medium dark:text-slate-400">{result.nextBirthday}</span>{" "}
                      (<span className="font-medium dark:text-slate-400">{result.daysToNext} days</span>)
                    </li>
                  </ul>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={copyResult}
                      className="py-2 px-3 rounded-lg bg-indigo-500 text-white text-sm font-medium"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() => alert("Share coming soon")}
                      className="py-2 px-3 rounded-lg bg-indigo-500 text-white text-sm font-medium"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500">
          Tip: Want age including hours/minutes? Ask for advanced version.
        </div>
        </div>
          {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Calculator" />
      </div>
      </motion.div>
  );
}
