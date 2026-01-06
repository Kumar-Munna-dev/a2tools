"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCcw, ArrowUpDown, Lock, Unlock } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function Base64EncoderDecoder() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  // 🧠 Encode or Decode
  const handleConvert = () => {
    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        setResult(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(text)));
        setResult(decoded);
      }
    } catch (error) {
      alert("❌ Invalid Base64 input or encoding error!");
    }
  };
const handleCopy = async () => {
  if (!result) return;

  try {
    // ✅ Use modern Clipboard API if available and secure
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(result);
      alert("✅ Copied to clipboard!");
    } else {
      // ✅ Fallback for mobile browsers (Safari / older Android)
      const textArea = document.createElement("textarea");
      textArea.value = result;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        alert("✅ Copied to clipboard!");
      } else {
        alert("❌ Copy failed. Please copy manually.");
      }
    }
  } catch (err) {
    console.error("Copy failed:", err);
    alert("❌ Copy not supported on this device.");
  }
};


  // 🔁 Reset
  const handleReset = () => {
    setText("");
    setResult("");
  };

  // 🔄 Swap Encode/Decode Mode
  const handleSwap = () => {
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
    setResult("");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6 pt-15">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full backdrop-blur-md bg-white/40 dark:bg-gray-800/60 rounded-3xl shadow-xl p-6 sm:p-8 border border-white/30 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          🔐 Base64 Encoder / Decoder
        </h1>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSwap}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold shadow-md transition-all"
          >
            <ArrowUpDown className="h-4 w-4" /> Switch to{" "}
            {mode === "encode" ? "Decode" : "Encode"}
          </button>
        </div>

        {/* Input Area */}
        <div className="bg-white/70 dark:bg-gray-700 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
          <div className="flex justify-center items-center gap-2 mb-3">
            {mode === "encode" ? (
              <Lock className="text-blue-600 dark:text-blue-400 h-5 w-5" />
            ) : (
              <Unlock className="text-purple-600 dark:text-purple-400 h-5 w-5" />
            )}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
            </h2>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            placeholder={
              mode === "encode"
                ? "Enter plain text here..."
                : "Enter Base64 encoded text here..."
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
          <button
            onClick={handleConvert}
            className="px-5 py-2 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2 sm:px-6 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold"
          >
            <Copy className="h-4 w-4" /> Copy
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2 sm:px-6 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        {/* Result Box */}
        {result && (
          <div className="bg-white/70 dark:bg-gray-700 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">
              Result
            </h2>
            <textarea
              readOnly
              value={result}
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono resize-none"
            />
          </div>
        )}

        {/* Info Section for SEO */}
        <div className="space-y-4 sm:space-y-6">
          <InfoDropdown
            title="🔐 What Is Base64 Encoding?"
            content="Base64 encoding is a method that converts binary or text data into ASCII string format using 64 printable characters. It's commonly used to encode images, files, or data before transmission or storage."
          />
          <InfoDropdown
            title="📤 How Does Base64 Encoding Work?"
            content="Base64 divides binary data into 6-bit chunks and represents each chunk as a character from a specific 64-character set (A–Z, a–z, 0–9, +, /). It helps ensure safe data transfer across systems that only handle text."
          />
          <InfoDropdown
            title="📥 What Is Base64 Decoding?"
            content="Base64 decoding reverses the encoding process — converting a Base64 string back to its original binary or text format. This tool lets you decode instantly and read the original data."
          />
          <InfoDropdown
            title="🧠 Common Uses of Base64"
            content="Base64 is widely used in web development for embedding small images in HTML/CSS, encoding API credentials, and storing binary files or JSON data safely in databases."
          />
          <InfoDropdown
            title="⚙️ Online Base64 Converter Features"
            content="This Base64 encoder/decoder works offline, supports instant conversion, and provides copy, reset, and swap options — all with a clean and responsive interface."
          />
          <InfoDropdown
            title="📱 Mobile-Friendly & Secure"
            content="All conversions happen locally on your device. The tool works perfectly on phones, tablets, and desktops without sending any data to a server."
          />
          <InfoDropdown
            title="🔒 Privacy & Safety"
            content="Since Base64 encoding is not encryption, it doesn’t secure sensitive information — it just formats it safely. For sensitive data, always use proper encryption methods."
          />
        </div>
      </motion.div>
    </main>
  );
}
