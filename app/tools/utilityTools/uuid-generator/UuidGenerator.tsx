"use client";
import React, { useState, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import { generateMultipleUUIDs } from "@/app/utils/uuidGeneratorLogic";
import { Copy, RefreshCw } from "lucide-react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [version, setVersion] = useState<1 | 4>(4);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate initial UUID on mount
  useEffect(() => {
    handleGenerate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGenerate = () => {
    const newUuids = generateMultipleUUIDs(count, version, uppercase);
    setUuids(newUuids);
  };

  const copyToClipboard = async (text: string, index?: number) => {
    try {
      await navigator.clipboard.writeText(text);
      if (index !== undefined) {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        alert("All UUIDs copied!");
      }
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <ToolLayout 
      title="UUID/GUID Generator" 
      description="Generate random v4 and time-based v1 UUIDs instantly." 
      toolType="Utility"
      categoryPath="/tools/utilityTools"
      categoryName="Utility Tools"
      howToUse={[
        "Select the number of UUIDs you want to generate (between 1 and 100).",
        "Choose the UUID version (Version 4 is random and most common, Version 1 is time-based).",
        "Toggle the 'Uppercase' option if you need the UUIDs formatted with capital letters.",
        "Click the 'Generate UUIDs' button.",
        "Copy individual UUIDs by clicking the copy icon next to them, or click 'Copy All' to copy the entire list."
      ]}
      features={[
        "Generate up to 100 UUIDs instantly",
        "Support for Version 4 (Random) and Version 1 (Time-based MAC) UUIDs",
        "100% Client-side processing using Crypto API for maximum security",
        "One-click copy to clipboard",
        "Uppercase and lowercase formatting options"
      ]}
      faqs={[
        { question: "What is a UUID?", answer: "A Universally Unique Identifier (UUID) is a 128-bit number used to uniquely identify information in computer systems. It is also known as a Globally Unique Identifier (GUID)." },
        { question: "What is the difference between UUID v1 and v4?", answer: "UUID Version 4 is generated using random numbers and is the most commonly used version. UUID Version 1 is generated using the computer's MAC address and the current time." },
        { question: "Are these UUIDs generated securely?", answer: "Yes, this tool uses your browser's native cryptographic API (crypto.getRandomValues) to ensure high-quality randomness and security. No data is sent to a server." }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-slate-300 mb-1">
              Number of UUIDs (1-100)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full p-3 rounded-xl border dark:border-slate-800 dark:bg-slate-950 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-slate-300 mb-1">
              UUID Version
            </label>
            <select
              value={version}
              onChange={(e) => setVersion(parseInt(e.target.value) as 1 | 4)}
              className="w-full p-3 rounded-xl border dark:border-slate-800 dark:bg-slate-950 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            >
              <option value={4}>Version 4 (Random)</option>
              <option value={1}>Version 1 (Time-based)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-500 focus:ring-indigo-400"
            />
            <span className="text-sm font-medium dark:text-slate-300">Uppercase</span>
          </label>

          <button
            onClick={handleGenerate}
            className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
          >
            <RefreshCw size={18} />
            Generate UUIDs
          </button>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold dark:text-slate-300">Generated UUIDs</h3>
            {uuids.length > 1 && (
              <button 
                onClick={() => copyToClipboard(uuids.join('\n'))}
                className="text-xs text-indigo-500 hover:text-indigo-600 font-medium"
              >
                Copy All
              </button>
            )}
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 max-h-[300px] overflow-y-auto border dark:border-slate-800 space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center justify-between group">
                <code className="text-sm font-mono text-slate-700 dark:text-slate-300">{uuid}</code>
                <button
                  onClick={() => copyToClipboard(uuid, i)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  title="Copy"
                >
                  {copiedIndex === i ? (
                    <span className="text-xs text-green-500 font-medium">Copied!</span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
