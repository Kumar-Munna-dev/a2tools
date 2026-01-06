"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100"
      >
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Age Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">
            Find your exact age in years, months, and days
          </p>
        </div>

        {/* Inputs */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mt-2 sm:mt-0">To Date (Optional)</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="mt-1 w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCalculate}
              className="py-3 px-4 rounded-xl bg-indigo-600 text-white font-medium hover:shadow-md"
            >
              Calculate
            </button>

            <button
              onClick={handleClear}
              className="py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-medium hover:shadow-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-gradient-to-r from-white via-gray-50 to-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            {result.error ? (
              <div className="text-red-500 font-medium">{result.error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Exact Age</h2>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {result.years} yrs • {result.months} mos • {result.days} days
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Calculated at: {result.calculatedAt}
                  </div>
                </div>

                {/* Right */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">More Details</h3>
                  <ul className="mt-2 text-sm text-gray-600 list-disc ml-5 space-y-1">
                    <li>
                      Total days lived:{" "}
                      <span className="font-medium text-gray-800">{result.totalDays}</span>
                    </li>
                    <li>
                      Total months:{" "}
                      <span className="font-medium text-gray-800">{result.totalMonths}</span>
                    </li>
                    <li>
                      Weeks lived:{" "}
                      <span className="font-medium text-gray-800">{result.weeks}</span>
                    </li>
                    <li>
                      Next birthday:{" "}
                      <span className="font-medium text-gray-800">{result.nextBirthday}</span>{" "}
                      (<span className="font-medium text-gray-800">{result.daysToNext} days</span>)
                    </li>
                  </ul>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={copyResult}
                      className="py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() => alert("Share coming soon")}
                      className="py-2 px-3 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium"
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
      </motion.div>
    </div>
  );
}
