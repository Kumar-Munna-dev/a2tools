"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CalendarDays, RefreshCcw, Copy } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function EpochTimestampConverter() {
  const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [convertedDate, setConvertedDate] = useState<string>("");
  const [convertedTimestamp, setConvertedTimestamp] = useState<number | null>(null);

  // ⏱️ Live Timestamp Updater
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🧮 Convert Timestamp → Date
  const handleTimestampToDate = () => {
    if (!timestamp) return;
    const dateObj = new Date(timestamp * 1000);
    setConvertedDate(dateObj.toLocaleString());
  };

  // 📆 Convert Date → Timestamp
  const handleDateToTimestamp = () => {
    if (!date) return;
    const dateObj = new Date(date);
    setConvertedTimestamp(Math.floor(dateObj.getTime() / 1000));
  };

  // 📋 Copy Function
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("✅ Copied to clipboard!");
    } catch {
      alert("❌ Copy not supported, please copy manually.");
    }
  };

  // 🔁 Reset
  const handleReset = () => {
    setTimestamp(Math.floor(Date.now() / 1000));
    setDate(new Date().toISOString().slice(0, 16));
    setConvertedDate("");
    setConvertedTimestamp(null);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full backdrop-blur-md bg-white/40 dark:bg-gray-800/60 rounded-3xl shadow-xl p-6 sm:p-8 border border-white/30 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Epoch Converter – Convert Unix Timestamp to Date & Time
        </h1>

        {/* Live Timestamp */}
        <div className="bg-white/70 dark:bg-gray-700 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Clock className="text-blue-600 dark:text-blue-400 h-6 w-6" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Current UNIX Timestamp
            </h2>
          </div>
          <div className="text-2xl sm:text-3xl font-mono text-gray-800 dark:text-gray-100 mb-2">
            {timestamp}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Updated in real-time
          </p>
        </div>

        {/* Timestamp → Date */}
        <div className="bg-white/60 dark:bg-gray-700 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 text-gray-900 dark:text-gray-100">
            🔄 Convert UNIX Timestamp to Date
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <input
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(Number(e.target.value))}
              className="w-full sm:w-2/3 p-2 sm:p-3 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-center focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={handleTimestampToDate}
              className="px-5 py-2 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold"
            >
              Convert
            </button>
          </div>
          {convertedDate && (
            <div className="mt-2 text-center">
              <p className="text-gray-800 dark:text-gray-100 font-medium">
                📅 <strong>{convertedDate}</strong>
              </p>
              <button
                onClick={() => handleCopy(convertedDate)}
                className="mt-2 flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mx-auto"
              >
                <Copy className="h-4 w-4" /> Copy
              </button>
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="bg-white/60 dark:bg-gray-700 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 text-gray-900 dark:text-gray-100">
            📆 Convert Date to UNIX Timestamp
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full sm:w-2/3 p-2 sm:p-3 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <button
              onClick={handleDateToTimestamp}
              className="px-5 py-2 sm:px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold"
            >
              Convert
            </button>
          </div>
          {convertedTimestamp && (
            <div className="mt-2 text-center">
              <p className="text-gray-800 dark:text-gray-100 font-medium">
                ⏱️ <strong>{convertedTimestamp}</strong>
              </p>
              <button
                onClick={() => handleCopy(convertedTimestamp.toString())}
                className="mt-2 flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mx-auto"
              >
                <Copy className="h-4 w-4" /> Copy
              </button>
            </div>
          )}
        </div>

        {/* Reset */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2 sm:px-6 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        {/* SEO Info Section */}
        <div className="space-y-4 sm:space-y-6">
          <InfoDropdown
            title="🕓 What Is a UNIX Timestamp?"
            content="A UNIX timestamp represents the number of seconds that have elapsed since January 1, 1970 (UTC). It’s widely used in programming, databases, and APIs to represent date-time data in numeric form."
          />
          <InfoDropdown
            title="📅 Why Convert Between Timestamps and Dates?"
            content="Converting between UNIX timestamps and readable dates helps developers, analysts, and system administrators work with time-based data more easily in APIs, logs, and databases."
          />
          <InfoDropdown
            title="🔄 How This Converter Works"
            content="Simply enter a UNIX timestamp to get a human-readable date or enter a date/time to get the corresponding UNIX timestamp — no internet connection required!"
          />
          <InfoDropdown
            title="📱 Mobile-Friendly and Offline"
            content="This tool works seamlessly across mobile, tablet, and desktop devices. It also runs entirely in your browser for privacy and offline accessibility."
          />
          <InfoDropdown
            title="🧠 Common Uses of Timestamps"
            content="Developers use timestamps to track user sessions, event logs, and data synchronization. Analysts use them to compare times, calculate durations, or schedule automation."
          />
          <InfoDropdown
            title="🌐 Timezone Conversion"
            content="All timestamps are represented in UTC by default. The converted human-readable date adjusts automatically to your local timezone."
          />
          <InfoDropdown
            title="⚡ Privacy & Performance"
            content="No data is sent to any server — all conversions happen locally, ensuring full data privacy and lightning-fast results."
          />
        </div>
      </motion.div>
    </main>
  );
}
