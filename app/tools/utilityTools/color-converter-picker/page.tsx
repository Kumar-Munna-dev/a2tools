"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCcw, Droplet, Palette } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

/* ---------------------- Utilities ---------------------- */
async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    }
  } catch {
    return false;
  }
}

function hexToRgb(hex: string) {
  hex = hex.replace("#", "").trim();
  if (hex.length === 3)
    hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX code");
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h: number = 0, s: number, l = (max + min) / 2;
  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

/* ---------------------- Component ---------------------- */
export default function ColorConverterPicker() {
  const [hex, setHex] = useState("#FF5733");
  const [rgb, setRgb] = useState("rgb(255, 87, 51)");
  const [hsl, setHsl] = useState("hsl(14, 100%, 60%)");
  const [copied, setCopied] = useState<string | null>(null);

  const updateFromHex = (value: string) => {
    try {
      const { r, g, b } = hexToRgb(value);
      setRgb(`rgb(${r}, ${g}, ${b})`);
      const { h, s, l } = rgbToHsl(r, g, b);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
      setHex(value);
    } catch {}
  };

  const updateFromRgb = (value: string) => {
    try {
      const parts = value.match(/\d+/g);
      if (!parts || parts.length < 3) throw new Error();
      const [r, g, b] = parts.map(Number);
      setHex(rgbToHex(r, g, b));
      const { h, s, l } = rgbToHsl(r, g, b);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
      setRgb(value);
    } catch {}
  };

  const updateFromHsl = (value: string) => {
    try {
      const parts = value.match(/\d+/g);
      if (!parts || parts.length < 3) throw new Error();
      const [h, s, l] = parts.map(Number);
      const { r, g, b } = hslToRgb(h, s, l);
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHex(rgbToHex(r, g, b));
      setHsl(value);
    } catch {}
  };

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const reset = () => updateFromHex("#FF5733");

  return (
    <main className="min-h-screen bg-linear-to-br from-pink-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl p-5 sm:p-8 border border-white/40 dark:border-gray-700"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Color Converter & Picker – Convert and Pick Colors Instantly
        </h1>

        {/* Picker + Preview */}
        <div className="flex flex-col items-center mb-8 space-y-3">
          <input
            type="color"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md cursor-pointer"
          />
          <div
            className="w-full h-16 rounded-xl border border-gray-300 dark:border-gray-600 shadow-inner transition-all"
            style={{ backgroundColor: hex }}
          ></div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* HEX */}
          <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <label className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200">
              HEX
            </label>
            <input
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full text-center p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono"
            />
            <button
              onClick={() => handleCopy(hex, "HEX")}
              className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded-full"
            >
              <Copy className="inline h-4 w-4 mr-1" />
              {copied === "HEX" ? "Copied" : "Copy"}
            </button>
          </div>

          {/* RGB */}
          <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <label className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200">
              RGB
            </label>
            <input
              value={rgb}
              onChange={(e) => updateFromRgb(e.target.value)}
              className="w-full text-center p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono"
            />
            <button
              onClick={() => handleCopy(rgb, "RGB")}
              className="mt-2 text-sm px-3 py-1 bg-green-600 text-white rounded-full"
            >
              <Copy className="inline h-4 w-4 mr-1" />
              {copied === "RGB" ? "Copied" : "Copy"}
            </button>
          </div>

          {/* HSL */}
          <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <label className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200">
              HSL
            </label>
            <input
              value={hsl}
              onChange={(e) => updateFromHsl(e.target.value)}
              className="w-full text-center p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono"
            />
            <button
              onClick={() => handleCopy(hsl, "HSL")}
              className="mt-2 text-sm px-3 py-1 bg-purple-600 text-white rounded-full"
            >
              <Copy className="inline h-4 w-4 mr-1" />
              {copied === "HSL" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Reset */}
        <div className="flex justify-center mb-8">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <InfoDropdown
            title="🎨 Convert Between All Color Models"
            content="Easily convert between HEX, RGB, and HSL color codes. Paste any format and the tool will auto-detect and convert it instantly."
          />
          <InfoDropdown
            title="🧠 Smart Auto Detection"
            content="Paste HEX, RGB, or HSL code in any box — the converter intelligently updates all other color formats in real-time."
          />
          <InfoDropdown
            title="📋 Copy and Use Instantly"
            content="Each format has its own copy button. Works on mobile and desktop using a secure clipboard fallback method."
          />
          <InfoDropdown
            title="🌈 Real-Time Preview"
            content="The color preview box updates instantly as you change or paste new color values."
          />
          <InfoDropdown
            title="🔒 Privacy & Offline"
            content="This color converter runs completely offline in your browser — no data is sent to any server."
          />
        </div>
      </motion.div>
    </main>
  );
}
