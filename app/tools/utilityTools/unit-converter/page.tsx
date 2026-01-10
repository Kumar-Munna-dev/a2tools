 

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, RefreshCcw } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [inputValue, setInputValue] = useState(1);
  const [result, setResult] = useState(0);

  // ✅ Units data
  const units: Record<string, Record<string, number>> = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371,
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1e6,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
    },
    temperature: {
      celsius: 0,
      fahrenheit: 0,
      kelvin: 0,
    },
    area: {
      "square meter": 1,
      "square kilometer": 1e-6,
      "square centimeter": 10000,
      "square foot": 10.7639,
      "square yard": 1.19599,
      "square mile": 3.861e-7,
      hectare: 0.0001,
      acre: 0.000247105,
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
      tablespoon: 67.628,
      teaspoon: 202.884,
    },
  };

  // ✅ Conversion Logic
  const convert = () => {
    if (category === "temperature") {
      let val = Number(inputValue);
      if (fromUnit === "celsius" && toUnit === "fahrenheit")
        setResult(val * 9 / 5 + 32);
      else if (fromUnit === "fahrenheit" && toUnit === "celsius")
        setResult(((val - 32) * 5) / 9);
      else if (fromUnit === "celsius" && toUnit === "kelvin")
        setResult(val + 273.15);
      else if (fromUnit === "kelvin" && toUnit === "celsius")
        setResult(val - 273.15);
      else if (fromUnit === "fahrenheit" && toUnit === "kelvin")
        setResult(((val - 32) * 5) / 9 + 273.15);
      else if (fromUnit === "kelvin" && toUnit === "fahrenheit")
        setResult(((val - 273.15) * 9) / 5 + 32);
      else setResult(val);
      return;
    }

    const baseValue = Number(inputValue) / units[category][fromUnit];
    const convertedValue = baseValue * units[category][toUnit];
    setResult(convertedValue);
  };

  useEffect(() => {
    convert();
  }, [category, fromUnit, toUnit, inputValue]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const formatNumber = (num: number) =>
    Math.abs(num) < 0.000001 ? num.toExponential(4) : Number(num.toFixed(6));

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full backdrop-blur-md bg-white/40 dark:bg-gray-800/60 rounded-3xl shadow-xl p-8 border border-white/30 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Unit Converter – Convert Measurements Instantly
        </h1>

        {/* Category Selector */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setFromUnit(Object.keys(units[e.target.value])[0]);
              setToUnit(Object.keys(units[e.target.value])[1]);
            }}
            className="w-full p-3 rounded-xl border dark:border-gray-700 bg-white/70 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {Object.keys(units).map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Conversion Box */}
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-3 gap-4 items-center mb-8"
        >
          {/* From */}
          <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-700 shadow-inner border border-gray-200 dark:border-gray-600">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
              From
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              {Object.keys(units[category]).map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <motion.button
              whileTap={{ rotate: 180, scale: 0.9 }}
              onClick={handleSwap}
              className="p-4 bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all"
            >
              <ArrowLeftRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* To */}
          <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-700 shadow-inner border border-gray-200 dark:border-gray-600">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
              To
            </label>
            <input
              type="text"
              readOnly
              value={formatNumber(result)}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2 outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              {Object.keys(units[category]).map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Reset Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setInputValue(1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        {/* Info Dropdowns */}
        <div className="space-y-6">
          <InfoDropdown
            title="📏 What Is a Unit Converter?"
            content="A smart tool that instantly converts values between different measurement units like length, weight, temperature, and more — with precision and speed."
          />
          <InfoDropdown
            title="⚙️ How Does It Work?"
            content="The converter uses mathematical formulas and ratios for accurate results. It supports metric, imperial, and scientific measurements."
          />
          <InfoDropdown
            title="🌡️ Temperature Conversion"
            content="Temperature conversions are handled with standard physics formulas to ensure accurate conversion between Celsius, Fahrenheit, and Kelvin."
          />
          <InfoDropdown
            title="💾 Offline and Secure"
            content="This tool runs entirely in your browser. No internet, no data tracking — everything happens privately on your device."
          />
          <InfoDropdown
            title="🌍 Supported Categories"
            content="Length, Weight, Temperature, Area, and Volume — each with multiple common and advanced units for professionals and students."
          />
        </div>
      </motion.div>
    </main>
  );
}
