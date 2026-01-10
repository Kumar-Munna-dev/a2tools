 

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [strength, setStrength] = useState({ score: 0, text: "Very Weak" });

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    let text = "Very Weak";
    if (score > 5) text = "Very Strong";
    else if (score > 4) text = "Strong";
    else if (score > 2) text = "Moderate";
    else if (score > 1) text = "Weak";

    setStrength({ score, text });
  };

  const generatePassword = () => {
    const { uppercase, lowercase, numbers, symbols } = options;
    const sets = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let charset = "";
    if (uppercase) charset += sets.uppercase;
    if (lowercase) charset += sets.lowercase;
    if (numbers) charset += sets.numbers;
    if (symbols) charset += sets.symbols;

    if (!charset) {
      alert("Please select at least one character type!");
      return;
    }

    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(pwd);
    calculateStrength(pwd);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert("✅ Password copied to clipboard!");
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const getStrengthColor = () => {
    if (strength.score > 4) return "bg-green-500";
    if (strength.score > 2) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-10 p-6 sm:p-8 
        bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl 
        border border-gray-200/70 dark:border-gray-700/60 
        rounded-2xl shadow-xl"
    >
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center mb-6 bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
        Password Generator – Create Strong & Secure Passwords
      </h1>

      {/* Password Display */}
      <div className="relative mb-6">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full h-14 px-4 pr-24 border border-gray-300 dark:border-gray-700 
                     rounded-xl bg-gray-50/70 dark:bg-gray-800/70 text-lg font-mono 
                     text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 
                     outline-none transition"
          placeholder="Your password will appear here"
        />
        <div className="absolute inset-y-0 right-2 flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition"
            aria-label="Copy password"
          >
            <Copy className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
          </button>
          <button
            onClick={generatePassword}
            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition"
            aria-label="Regenerate password"
          >
            <RefreshCw className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Strength Meter */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2 text-gray-700 dark:text-gray-300">
          <span>Password Strength</span>
          <span className="font-semibold">{strength.text}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()} transition-all duration-300`}
            style={{ width: `${(strength.score / 6) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Length Slider */}
      <div className="mb-6">
        <label className="block text-gray-800 dark:text-gray-200 mb-1 font-medium">
          Length: <span className="text-blue-600 dark:text-cyan-400">{length}</span>
        </label>
        <input
          type="range"
          min="6"
          max="50"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      {/* Character Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Object.entries({
          uppercase: "Uppercase",
          lowercase: "Lowercase",
          numbers: "Numbers",
          symbols: "Symbols",
        }).map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <input
              type="checkbox"
              checked={options[key as keyof typeof options]}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  [key]: e.target.checked,
                }))
              }
              className="w-4 h-4 accent-blue-600"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Generate Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={generatePassword}
        className="w-full py-3 bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400 
                   hover:from-indigo-700 hover:to-blue-600 text-white font-semibold 
                   rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-center gap-2">
          <RefreshCw className="h-5 w-5" /> Regenerate Password
        </div>
      </motion.button>

      {/* Info Sections */}
      <div className="mt-10 space-y-6">
        <InfoDropdown
          title="🔐 What is a Password Generator Tool?"
          content="A password generator tool helps users create secure, random, and unique passwords instantly, reducing the risk of hacking or data theft."
        />
        <InfoDropdown
          title="⚙️ How Does It Work?"
          content="It uses a randomization algorithm to create strong passwords based on your chosen settings: uppercase, lowercase, numbers, and symbols."
        />
        <InfoDropdown
          title="🧠 Why Use Strong Passwords?"
          content="Strong passwords prevent brute-force attacks and protect your digital identity. Use a mix of characters for maximum security."
        />
        <InfoDropdown
          title="🔒 Tips for Strong Passwords"
          content="Use 12–16+ characters, include all character types, avoid personal info, and never reuse passwords."
        />
        <InfoDropdown
          title="🌍 Benefits of Using Our Tool"
          content="Our generator works 100% offline in your browser. No data storage or tracking — just fast, private password creation."
        />
      </div>
    </motion.div>
  );
}
