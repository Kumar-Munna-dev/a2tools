"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Download,
  Upload,
  Copy,
  RefreshCcw,
  Zap,
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

function escapeCsvField(value: any, delimiter = ",") {
  if (value === null || value === undefined) return "";
  const str = String(value);
  const mustQuote =
    str.includes(delimiter) || str.includes('"') || str.includes("\n");
  const escaped = str.replace(/"/g, '""');
  return mustQuote ? `"${escaped}"` : escaped;
}

function jsonToCsv(data: any[], delimiter = ",", includeHeaders = true) {
  if (!Array.isArray(data))
    throw new Error("JSON must be an array of objects.");
  const keys = Array.from(
    new Set(data.flatMap((obj) => Object.keys(obj ?? {})))
  );
  const rows = [];
  if (includeHeaders) rows.push(keys.join(delimiter));
  for (const item of data) {
    const row = keys.map((key) => escapeCsvField(item[key], delimiter));
    rows.push(row.join(delimiter));
  }
  return rows.join("\n");
}

function parseCsv(csv: string, delimiter = ",") {
  const lines = csv.trim().split(/\r?\n/);
  return lines.map((line) =>
    line
      .split(delimiter)
      .map((value) => value.replace(/^"|"$/g, "").replace(/""/g, '"'))
  );
}

function csvToJson(csv: string, delimiter = ",", hasHeaders = true) {
  const rows = parseCsv(csv, delimiter);
  if (!rows.length) return [];
  const headers = hasHeaders
    ? rows.shift()!
    : rows[0].map((_, i) => `col${i + 1}`);
  return rows.map((r) => {
    const obj: any = {};
    headers.forEach((h, i) => (obj[h] = r[i]));
    return obj;
  });
}

async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      return true;
    }
  } catch {
    return false;
  }
}

export default function JsonCsvTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");
  const [delimiter, setDelimiter] = useState(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const sampleJson = `[
  {"name":"Munna","age":30,"city":"Patna"},
  {"name":"Anita","age":28,"city":"Delhi"},
  {"name":"Ravi","age":35,"city":"Mumbai"}
]`;

  const sampleCsv = `name,age,city
Munna,30,Patna
Anita,28,Delhi
Ravi,35,Mumbai`;

  const handleConvert = () => {
    setError(null);
    try {
      if (mode === "json-to-csv") {
        const parsed = JSON.parse(input);
        const csv = jsonToCsv(parsed, delimiter, includeHeaders);
        setOutput(csv);
      } else {
        const json = csvToJson(input, delimiter, hasHeaders);
        setOutput(JSON.stringify(json, null, 2));
      }
    } catch (err: any) {
      setError(err.message || "Invalid input");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    const text = output || input;
    if (!text) return;
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } else alert("Copy not supported on this device.");
  };

  const handleDownload = () => {
    const blob = new Blob([output || input], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "json-to-csv" ? "converted.csv" : "converted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput(String(ev.target?.result || ""));
      setOutput("");
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-20 flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          JSON to CSV Converter – Convert JSON Data into CSV
        </h1>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full font-semibold ${mode === "json-to-csv"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            onClick={() => setMode("json-to-csv")}
          >
            JSON → CSV
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold ${mode === "csv-to-json"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            onClick={() => setMode("csv-to-json")}
          >
            CSV → JSON
          </button>

          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="px-3 py-2 rounded-lg border "
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (↹)</option>
          </select>

          {mode === "json-to-csv" ? (
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
              />
              Include headers
            </label>
          ) : (
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasHeaders}
                onChange={(e) => setHasHeaders(e.target.checked)}
              />
              First row has headers
            </label>
          )}

          <button
            onClick={() => fileRef.current?.click()}
            className="px-3 py-2 bg-amber-500 text-white rounded-lg flex items-center gap-1"
          >
            <Upload className="h-4 w-4" /> File
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json,.csv,.txt"
            onChange={handleFile}
            className="hidden"
          />
          <button
            onClick={() =>
              setInput(mode === "json-to-csv" ? sampleJson : sampleCsv)
            }
            className="px-3 py-2 border rounded-lg"
          >
            Sample
          </button>
        </div>

        {/* Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              {mode === "json-to-csv" ? "Input (JSON Array)" : "Input (CSV)"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={14}
              placeholder={
                mode === "json-to-csv" ? sampleJson : sampleCsv
              }
              className="w-full p-3 rounded-lg border  text-sm font-mono focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            />
          </div>

          {/* Output */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              {mode === "json-to-csv" ? "Output (CSV)" : "Output (JSON)"}
            </label>
            <div className="min-h-[200px] max-h-[360px] overflow-auto w-full p-3 rounded-lg border  text-sm font-mono whitespace-pre-wrap">
              {error ? (
                <div className="text-red-600 dark:text-red-400">
                  ❌ {error}
                </div>
              ) : output ? (
                <pre>{output}</pre>
              ) : (
                <div className="text-center">
                  Result will appear here.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
          <button
            onClick={handleConvert}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold flex items-center gap-2"
          >
            <Zap className="h-4 w-4" /> Convert
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold flex items-center gap-2"
          >
            <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-semibold flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
              setError(null);
            }}
            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" /> Clear
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 space-y-4">
          <InfoDropdown
            title="🔁 What is JSON ↔ CSV Converter?"
            content="This tool lets you convert between JSON arrays and CSV format instantly — useful for spreadsheets, APIs, and data import/export tasks."
          />
          <InfoDropdown
            title="⚙️ How to Use"
            content="Paste JSON data or upload a file, select delimiter and headers, and click Convert. You can copy or download the result for quick use."
          />
          <InfoDropdown
            title="🧾 Supported Formats"
            content="Supports standard JSON arrays (of objects) and CSV files with optional headers. Handles commas, semicolons, and tab delimiters."
          />
          <InfoDropdown
            title="🔒 Privacy & Offline"
            content="Everything runs locally in your browser — no data is uploaded or stored. Safe and private for sensitive data."
          />
        </div>
      </div>
      {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Utility" />
      </div>
    </motion.div>
  );
}
