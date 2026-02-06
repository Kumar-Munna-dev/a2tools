"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  Copy,
  Check,
  RefreshCcw,
  ArrowRightLeft,
  Globe,
  Monitor
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

export default function EpochConverter() {
  // Live Clock State
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  // Converter 1: Timestamp to Date
  const [timestampInput, setTimestampInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Converter 2: Date to Timestamp
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));

  // Update Live Clock
  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  // Conversion Logic: Timestamp to Human
  const getParsedDate = (input: string) => {
    try {
      let val = parseInt(input);
      if (isNaN(val)) return null;

      // Auto-detect seconds vs milliseconds (Simple rule: > 10^11 is ms)
      const isMs = val > 99999999999;
      const date = new Date(isMs ? val : val * 1000);

      if (isNaN(date.getTime())) return null;
      return date;
    } catch {
      return null;
    }
  };

  const parsedDate = getParsedDate(timestampInput);

  // Conversion Logic: Human to Timestamp
  const reverseTimestamp = Math.floor(new Date(dateInput).getTime() / 1000);

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        {/* Main Converter Area */}
        <div className="lg:col-span-2 space-y-8">

          {/* Live Clock Card */}
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl  relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 opacity-80 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wider">Current Unix Epoch</span>
              </div>
              <div className="text-5xl md:text-6xl font-mono font-bold mb-4 tracking-tight tabular-nums">
                {now}
              </div>
              <button
                onClick={() => setTimestampInput(now.toString())}
                className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                <RefreshCcw size={16} /> Insert into converter
              </button>
            </div>
            <Clock className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white/10 rotate-12" />
          </div>

          {/* Section 1: Timestamp to Human Date */}
          <div className="rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 ">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                <ArrowRightLeft size={24} />
              </div>
              <h2 className="text-xl font-bold">Epoch to Human Date</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Unix Timestamp</label>
                <div className="relative">
                  <input
                    type="text"
                    value={timestampInput}
                    onChange={(e) => setTimestampInput(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 text-2xl font-mono focus:border-blue-500 focus:ring-0 outline-none transition-all"
                    placeholder="Enter timestamp (e.g. 1707221460)"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-white dark:bg-slate-900 px-2 py-1 rounded border">
                    {timestampInput.length > 11 ? "Milliseconds" : "Seconds"}
                  </span>
                </div>
              </div>

              {parsedDate ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* UTC Result */}
                  <div className="p-5 rounded-2xl border border-slate-200 relative group">
                    <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-bold uppercase">
                      <Globe size={14} /> UTC Time
                    </div>
                    <div className="text-lg font-semibold truncate">{parsedDate.toUTCString()}</div>
                    <button
                      onClick={() => handleCopy(parsedDate.toUTCString(), 'utc')}
                      className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-700 rounded-md shadow-sm"
                    >
                      {copySuccess === 'utc' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Local Result */}
                  <div className="p-5 rounded-2xl border border-slate-200 relative group">
                    <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-bold uppercase">
                      <Monitor size={14} /> Your Timezone
                    </div>
                    <div className="text-lg font-semibold truncate">{parsedDate.toString().split(' (')[0]}</div>
                    <button
                      onClick={() => handleCopy(parsedDate.toString(), 'local')}
                      className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-700 rounded-md shadow-sm"
                    >
                      {copySuccess === 'local' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-rose-600 rounded-2xl border border-rose-100 dark:border-rose-900/30 text-center font-medium">
                  Invalid Unix Timestamp. Please enter a valid numeric value.
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Human Date to Epoch */}
          <div className="rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                <Calendar size={24} />
              </div>
              <h2 className="text-xl font-bold">Human Date to Epoch</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold mb-2">Local Date & Time</label>
                <input
                  type="datetime-local"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full  border-2 border-slate-100 rounded-2xl px-6 py-4 text-xl font-mono outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="flex-1 w-full relative group">
                <label className="block text-sm font-bold mb-2">Resulting Timestamp</label>
                <div className="text-indigo-700 dark:text-indigo-300 rounded-2xl px-6 py-4 text-2xl font-mono font-bold flex justify-between items-center border border-indigo-100 dark:border-indigo-900/30">
                  <span>{reverseTimestamp}</span>
                  <button
                    onClick={() => handleCopy(reverseTimestamp.toString(), 'rev')}
                    className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:scale-110 transition-transform"
                  >
                    {copySuccess === 'rev' ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-3xl p-6 border border-slate-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Clock size={18} className="text-blue-500" /> Quick Reference
            </h3>
            <div className="space-y-3">
              {[
                { label: "1 Minute", val: "60 s" },
                { label: "1 Hour", val: "3,600 s" },
                { label: "1 Day", val: "86,400 s" },
                { label: "1 Week", val: "604,800 s" },
                { label: "1 Month (30d)", val: "2,592,000 s" },
                { label: "1 Year (365d)", val: "31,536,000 s" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-mono font-bold">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
          {/* SEO / Info Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoDropdown
              title="What is Unix Epoch time?"
              content="The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds."
            />
            <InfoDropdown
              title="Seconds vs Milliseconds"
              content="Standard Unix timestamps use 10 digits (seconds). JavaScript and many modern APIs use 13 digits (milliseconds). This tool automatically detects which one you are using."
            />
          </div>
        </div>


      </div>
      {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Utility" />
      </div>
    </motion.div>

  );
}