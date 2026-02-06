"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Trash2,
  ArrowRightLeft,
  Download,
  Upload,
  ShieldCheck,
  FileCode,
  AlertCircle
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- High-Performance Conversion Logic ---
  const processBase64 = useCallback((text: string, currentMode: "encode" | "decode", urlSafe: boolean) => {
    if (!text) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (currentMode === "encode") {
        // Encode UTF-8 to Base64
        const bytes = new TextEncoder().encode(text);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
        let b64 = btoa(binString);

        if (urlSafe) {
          b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        }
        setOutput(b64);
        setError(null);
      } else {
        // Decode Base64 to UTF-8
        let normalized = text.trim();
        if (urlSafe) {
          normalized = normalized.replace(/-/g, "+").replace(/_/g, "/");
          while (normalized.length % 4) normalized += "=";
        }

        const binString = atob(normalized);
        const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
        setOutput(new TextDecoder().decode(bytes));
        setError(null);
      }
    } catch (err) {
      setError(currentMode === "decode" ? "Invalid Base64 string detected" : "Conversion failed");
      setOutput("");
    }
  }, []);

  // Effect for live conversion
  useEffect(() => {
    const timer = setTimeout(() => {
      processBase64(input, mode, isUrlSafe);
    }, 100); // Debounce
    return () => clearTimeout(timer);
  }, [input, mode, isUrlSafe, processBase64]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSwap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput(input);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      // Remove the Data URI prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(",")[1];
      setMode("decode");
      setInput(base64);
    };
    reader.readAsDataURL(file);
  };

  const downloadOutput = () => {
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `base64-${mode === "encode" ? "encoded" : "decoded"}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        {/* Main Workspace */}
        <div className="lg:col-span-2 space-y-6">

          {/* Mode Header */}
          <div className="rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => setMode("encode")}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === "encode" ? "shadow-md text-blue-600" : "text-slate-500"}`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === "decode" ? " shadow-md text-blue-600" : "text-slate-500"}`}
              >
                Decode
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isUrlSafe ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                  <input type="checkbox" className="hidden" checked={isUrlSafe} onChange={() => setIsUrlSafe(!isUrlSafe)} />
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isUrlSafe ? 'left-6' : 'left-1'}`} />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase">URL Safe</span>
              </label>

              <button onClick={handleSwap} className="p-2 border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400" title="Swap Input/Output">
                <ArrowRightLeft size={20} />
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-end px-2">
              <label className="text-sm font-black uppercase tracking-widest">
                {mode === "encode" ? "Plain Text / String" : "Base64 String"}
              </label>
              <span className="text-xs font-mono">{input.length} characters</span>
            </div>
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-48 md:h-64  border-2 border-slate-200 rounded-3xl p-6 text-lg font-mono outline-none focus:border-blue-500 transition-all resize-none shadow-sm"
                placeholder={`Enter ${mode === "encode" ? "text" : "base64"} to convert...`}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <label className="p-2 rounded-xl cursor-pointer transition-colors">
                  <Upload size={18} />
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
                <button onClick={() => setInput("")} className="p-2 hover:bg-rose-100 hover:text-rose-600 rounded-xl transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Output Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-end px-2">
              <label className="text-sm font-black uppercase tracking-widest">Result</label>
              <div className="flex gap-4">
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-400 transition-colors uppercase">
                  {copySuccess ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
                <button onClick={downloadOutput} className="flex items-center gap-1.5 text-xs font-bold transition-colors uppercase">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
            <div className={`w-full min-h-[12rem] border-2 border-dashed rounded-3xl p-6 font-mono text-lg break-all transition-colors ${error ? 'border-rose-300 bg-rose-50 dark:bg-rose-900/10' : 'border-slate-200'}`}>
              {error ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
                  <AlertCircle size={32} />
                  <p className="font-bold">{error}</p>
                </div>
              ) : output ? (
                output
              ) : (
                <span className="italic">Result will appear here...</span>
              )}
            </div>
          </div>
          {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck size={18} /> Why use this tool?
            </h3>
            <ul className="space-y-4">
              {[
                { icon: FileCode, title: "UTF-8 Support", desc: "Encodes emojis and special characters correctly." },
                { icon: ShieldCheck, title: "100% Client-Side", desc: "Data never leaves your browser. Safe for sensitive keys." },
                { icon: Upload, title: "File Support", desc: "Quickly convert small files to Base64 data URIs." }
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1 text-blue-500"><item.icon size={18} /></div>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs dark:text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

          {/* SEO / Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
            <InfoDropdown title="What is Base64 Encoding?" content="Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used when there is a need to encode binary data that needs be stored and transferred over media that are designed to deal with textual data." />
            <InfoDropdown title="When to use URL-Safe Base64?" content="Standard Base64 contains '+' and '/' characters, which have special meanings in URLs. URL-Safe Base64 replaces these with '-' and '_' respectively, making the result safe for use in web addresses and file names." />
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