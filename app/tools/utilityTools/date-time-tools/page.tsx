"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CalendarDays, Globe2, RefreshCcw } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function DateTimeTool() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateDiff, setDateDiff] = useState("");

  // 🌍 Common timezones
  const timezones = [
    "UTC",
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Europe/Berlin",
    "America/Los_Angeles",
    "Africa/Johannesburg",
  ];

  // ⏱️ Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 📅 Date difference
  const calculateDateDiff = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
    setDateDiff(`${days} days, ${hours} hours, and ${minutes} minutes`);
  };

  const resetDates = () => {
    setStartDate("");
    setEndDate("");
    setDateDiff("");
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
          Date & Time Tools – Online Date and Time Calculators
        </h1>

        {/* Current Time Display */}
        <div className="bg-white/60 dark:bg-gray-700 p-4 sm:p-5 rounded-xl mb-6 border border-gray-200 dark:border-gray-600 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Clock className="text-blue-600 dark:text-blue-400 h-6 w-6" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Current Time
            </h2>
          </div>

          <div className="text-3xl sm:text-4xl font-mono text-gray-800 dark:text-gray-100 mb-3">
            {currentTime.toLocaleTimeString("en-US", {
              timeZone: timezone,
              hour12: true,
            })}
          </div>

          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full sm:w-2/3 p-2 sm:p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Date Difference Calculator */}
        <div className="bg-white/60 dark:bg-gray-700 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <CalendarDays className="text-purple-600 dark:text-purple-400 h-6 w-6" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Date Difference Calculator
            </h2>
          </div>

          {/* Centered Date Inputs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 sm:p-3 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <span className="text-gray-500 dark:text-gray-300 font-semibold text-lg sm:mx-2">
              →
            </span>

            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 sm:p-3 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={calculateDateDiff}
              className="flex items-center gap-2 px-5 py-2 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all"
            >
              <CalendarDays className="h-4 w-4" /> Calculate
            </button>

            <button
              onClick={resetDates}
              className="flex items-center gap-2 px-5 py-2 sm:px-6 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all"
            >
              <RefreshCcw className="h-4 w-4" /> Reset
            </button>
          </div>

          {/* Result */}
          {dateDiff && (
            <div className="mt-5 text-center text-gray-800 dark:text-gray-100 font-medium text-base sm:text-lg">
              🧮 Difference:{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-300">
                {dateDiff}
              </span>
            </div>
          )}
        </div>


        {/* Time Zone Info */}
        <div className="bg-white/60 dark:bg-gray-700 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-600 text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Globe2 className="text-green-600 dark:text-green-400 h-6 w-6" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              World Clock Example
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-sm sm:text-base">
            {timezones.map((tz) => (
              <div
                key={tz}
                className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <strong className="block text-gray-900 dark:text-gray-100">{tz}</strong>
                <span className="text-gray-700 dark:text-gray-300">
                  {new Date().toLocaleTimeString("en-US", {
                    timeZone: tz,
                    hour12: true,
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO InfoDropdown Section */}
        <div className="space-y-4 sm:space-y-6">
          <InfoDropdown
            title="🕒 What Is the Date & Time Tool?"
            content="Our Date & Time Tool lets you view the current time in different world time zones, calculate date differences, and check time globally — all in one simple interface."
          />
          <InfoDropdown
            title="📆 How To Calculate Date Differences?"
            content="Select two dates, and this tool instantly calculates the difference in days, hours, and minutes. Perfect for project planning, deadlines, and event countdowns."
          />
          <InfoDropdown
            title="🌍 Check Global Time Zones Instantly"
            content="Quickly view real-time clocks for multiple countries and regions. Supports major cities like New York, London, Tokyo, and Sydney with accurate local times."
          />
          <InfoDropdown
            title="⏰ Real-Time Clock"
            content="The current time updates automatically every second, showing your selected time zone’s exact hour, minute, and second in a clean, readable format."
          />
          <InfoDropdown
            title="📱 Works on Any Device"
            content="The Date & Time Tool is fully responsive — optimized for desktop, tablet, and mobile devices — and can be used offline after loading once."
          />
          <InfoDropdown
            title="🔒 Privacy and Security"
            content="All calculations and time conversions are performed locally in your browser. We never store or send your data to any server, ensuring total privacy."
          />
          <InfoDropdown
            title="⚙️ Ideal Use Cases"
            content="Use it to check global meeting times, travel planning, project scheduling, or learning time zone differences. It’s fast, accurate, and designed for daily use."
          />
        </div>
      </motion.div>
    </main>
  );
}
