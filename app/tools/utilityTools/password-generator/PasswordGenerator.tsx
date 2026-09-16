"use client";
import React, { useState, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import { generatePasswordLogic, calculatePasswordStrength, PasswordOptions } from "@/app/utils/passwordLogic";
import { Copy, RefreshCw } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<PasswordOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [strength, setStrength] = useState({ score: 0, text: "Very Weak" });

  const handleGenerate = () => {
    const pwd = generatePasswordLogic(length, options);
    if (!pwd) {
      alert("Please select at least one character type!");
      return;
    }
    setPassword(pwd);
    setStrength(calculatePasswordStrength(pwd));
  };

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      alert("Copied to clipboard!");
    } catch {
      alert("Failed to copy");
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [length, options]); // eslint-disable-line react-hooks/exhaustive-deps

  const getStrengthColor = () => {
    if (strength.score > 4) return "bg-green-500";
    if (strength.score > 2) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <ToolLayout 
      title="Password Generator" 
      description="Create strong, secure, and random passwords instantly." 
      toolType="Utility"
      categoryPath="/tools/utilityTools"
      categoryName="Utility Tools"
      howToUse={[
        "Select your desired password length using the slider (between 6 and 50 characters).",
        "Check the boxes to include Uppercase letters, Lowercase letters, Numbers, and Symbols.",
        "Click the 'Regenerate Password' button to generate a new secure string.",
        "Check the strength meter to ensure your password is secure.",
        "Click the copy icon to instantly copy the password to your clipboard."
      ]}
      features={[
        "Cryptographically secure pseudo-random generation",
        "Real-time password strength meter",
        "Customizable character sets (A-Z, a-z, 0-9, Symbols)",
        "Instant one-click clipboard copy",
        "100% Client-side processing — your passwords are never sent to a server"
      ]}
      faqs={[
        { question: "What makes a strong password?", answer: "A strong password is generally at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. It should not contain dictionary words or personal information." },
        { question: "Are the passwords generated here secure?", answer: "Yes. This tool uses local client-side processing, meaning the passwords are created directly in your browser. They are never transmitted over the internet or saved on our servers." },
        { question: "Why should I use a password generator?", answer: "Humans are naturally bad at creating truly random strings. A generator ensures your password is not susceptible to dictionary or brute-force attacks by using true entropy." }
      ]}
    >
      <div className="flex flex-col gap-6">
        {/* Password Display */}
        <div className="relative">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full h-14 px-4 pr-24 rounded-xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-lg font-mono outline-none transition"
            placeholder="Your password will appear here"
          />
          <div className="absolute inset-y-0 right-2 flex items-center space-x-1">
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
              title="Copy password"
            >
              <Copy size={20} />
            </button>
            <button
              onClick={handleGenerate}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
              title="Regenerate password"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div>
          <div className="flex justify-between text-sm mb-2 dark:text-slate-300">
            <span>Password Strength</span>
            <span className="font-semibold">{strength.text}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${getStrengthColor()} transition-all duration-300`}
              style={{ width: `${(strength.score / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Length Slider */}
        <div>
          <label className="flex justify-between items-center text-sm font-medium dark:text-slate-300 mb-2">
            <span>Length</span>
            <span className="text-indigo-500 font-bold">{length}</span>
          </label>
          <input
            type="range"
            min="6"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Character Options */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            uppercase: "Uppercase (A-Z)",
            lowercase: "Lowercase (a-z)",
            numbers: "Numbers (0-9)",
            symbols: "Symbols (!@#)",
          }).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-3 p-3 rounded-xl border dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition"
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
                className="w-5 h-5 rounded text-indigo-500 focus:ring-indigo-400 accent-indigo-500"
              />
              <span className="text-sm font-medium dark:text-slate-300">{label}</span>
            </label>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="mt-2 w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-sm transition flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} />
          Regenerate Password
        </button>
      </div>
    </ToolLayout>
  );
}
