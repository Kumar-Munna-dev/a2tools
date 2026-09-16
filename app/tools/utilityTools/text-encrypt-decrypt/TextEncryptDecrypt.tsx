"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Unlock,
  Copy,
  Upload,
  RefreshCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

/* ---------------------- Safe Clipboard ---------------------- */
async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    }
  } catch {
    return false;
  }
}

/* ---------------------- Robust WebCrypto API detection ---------------------- */
function getCryptoSubtle(): SubtleCrypto | null {
  if (typeof window === "undefined") return null;
  const win = window as any;
  if (win.crypto && (win.crypto.subtle || win.crypto.webkitSubtle)) {
    return (win.crypto.subtle || win.crypto.webkitSubtle) as SubtleCrypto;
  }
  if (win.msCrypto && (win.msCrypto.subtle || win.msCrypto.webkitSubtle)) {
    return (win.msCrypto.subtle || win.msCrypto.webkitSubtle) as SubtleCrypto;
  }
  return null;
}

function getCryptoRand(): Crypto | null {
  if (typeof window === "undefined") return null;
  const win = window as any;
  if (win.crypto && typeof win.crypto.getRandomValues === "function")
    return win.crypto as Crypto;
  if (win.msCrypto && typeof win.msCrypto.getRandomValues === "function")
    return win.msCrypto as Crypto;
  return null;
}

function ensureCryptoAvailableOrThrow() {
  const subtle = getCryptoSubtle();
  const rng = getCryptoRand();
  if (!subtle || !rng) {
    throw new Error(
      "❌ Secure encryption is not supported in this environment.\nPlease open this tool in Chrome, Edge, or Safari over HTTPS or localhost."
    );
  }
  return { subtle, rng };
}

/* ---------------------- Helpers ---------------------- */
function bufToBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++)
    binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBuf(b64: string) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/* ---------------------- AES-GCM Encryption Logic ---------------------- */
async function deriveKey(password: string, salt: Uint8Array) {
  const { subtle } = ensureCryptoAvailableOrThrow();
  const enc = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const safeSalt = new Uint8Array(salt).buffer as ArrayBuffer;

  return await subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: safeSalt,
      iterations: 120000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptText(password: string, text: string) {
  const { subtle, rng } = ensureCryptoAvailableOrThrow();
  const enc = new TextEncoder();
  const salt = rng.getRandomValues(new Uint8Array(16));
  const iv = rng.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(password, salt);
  const encoded = enc.encode(text);
  const cipher = await subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

  const result = new Uint8Array(salt.byteLength + iv.byteLength + cipher.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.byteLength);
  result.set(new Uint8Array(cipher), salt.byteLength + iv.byteLength);
  return bufToBase64(result.buffer);
}

async function decryptText(password: string, base64Data: string) {
  const { subtle } = ensureCryptoAvailableOrThrow();
  const data = new Uint8Array(base64ToBuf(base64Data));
  if (data.length < 29) throw new Error("Invalid ciphertext data.");

  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const cipher = data.slice(28);
  const key = await deriveKey(password, salt);
  const decrypted = await subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
  return new TextDecoder().decode(decrypted);
}

/* ---------------------- Component ---------------------- */
export default function TextEncryptDecrypt() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const runEncryption = async () => {
    try {
      ensureCryptoAvailableOrThrow();
    } catch (err: any) {
      return setMessage(err.message);
    }
    if (!password) return setMessage("⚠️ Enter password");
    if (!input) return setMessage("⚠️ Enter text to encrypt");

    try {
      setProcessing(true);
      const encrypted = await encryptText(password, input);
      setOutput(encrypted);
      setMessage("✅ Encrypted successfully");
    } catch (e: any) {
      setMessage("❌ Encryption failed: " + e.message);
    } finally {
      setProcessing(false);
    }
  };

  const runDecryption = async () => {
    try {
      ensureCryptoAvailableOrThrow();
    } catch (err: any) {
      return setMessage(err.message);
    }
    if (!password) return setMessage("⚠️ Enter password");
    if (!input) return setMessage("⚠️ Enter base64 ciphertext");

    try {
      setProcessing(true);
      const decrypted = await decryptText(password, input);
      setOutput(decrypted);
      setMessage("✅ Decrypted successfully");
    } catch (e: any) {
      setMessage("❌ Wrong password or invalid data");
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = async () => {
    const text = output || input;
    if (!text) return;
    const ok = await copyToClipboard(text);
    setCopied(ok);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setInput(String(event.target?.result || ""));
    reader.readAsText(file);
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setPassword("");
    setMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Text Encrypt Decrypt – Securely Encrypt & Decrypt Text Online
        </h1>

        {/* Mode switch */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              setMode(mode === "encrypt" ? "decrypt" : "encrypt");
              setOutput("");
              setInput("");
              setMessage("");
            }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full font-medium text-slate-800 dark:text-slate-100 dark:text-gray-200"
          >
            {mode === "encrypt" ? "Switch to Decrypt" : "Switch to Encrypt"}
          </button>
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Input Textarea */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            {mode === "encrypt" ? "Plaintext" : "Ciphertext (Base64)"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            placeholder={
              mode === "encrypt"
                ? "Enter your message to encrypt..."
                : "Paste your encrypted Base64 text..."
            }
            className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 text-sm font-mono resize-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {mode === "encrypt" ? (
            <button
              onClick={runEncryption}
              disabled={processing}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold"
            >
              Encrypt
            </button>
          ) : (
            <button
              onClick={runDecryption}
              disabled={processing}
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full font-semibold"
            >
              Decrypt
            </button>
          )}
          <button
            onClick={handleCopy}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={reset}
            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center gap-2"
          >
            <Upload className="h-4 w-4" /> File
          </button>
          <input
            type="file"
            ref={fileRef}
            onChange={handleFile}
            accept=".txt,.enc"
            className="hidden"
          />
        </div>

        {/* Output */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Result
          </label>
          <div className="min-h-[100px] max-h-[300px] overflow-auto p-3 sm:p-4 rounded-lg border border-gray-300 font-mono text-sm">
            {output || (
              <span className="">
                Result will appear here.
              </span>
            )}
          </div>
        </div>

        {/* Status */}
        {message && (
          <div className="text-center text-sm mb-6 whitespace-pre-line">
            {message}
          </div>
        )}

        {/* Info Section */}
        <div className="space-y-4">
          <InfoDropdown
            title="🔐 About This Tool"
            content="This tool securely encrypts or decrypts text using AES-GCM encryption with PBKDF2 password derivation. It's fully offline and safe."
          />
          <InfoDropdown
            title="📱 Mobile & Offline Friendly"
            content="All encryption/decryption happens inside your browser — works perfectly on mobile and desktop without an internet connection."
          />
          <InfoDropdown
            title="⚙️ Security Details"
            content="It uses AES-GCM 256-bit with random IVs and salt. Your password never leaves your device. AES-GCM also ensures integrity (detects tampering)."
          />
          <InfoDropdown
            title="💾 File Support"
            content="You can load text from local files and save encrypted results as .enc or decrypted text as .txt."
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
