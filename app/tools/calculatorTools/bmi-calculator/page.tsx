"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

/* -----------------------------
  FIX TYPE FOR RESULT
----------------------------- */
type BMIResult =
  | { bmi: string; status: string; tip: string }
  | { error: string }
  | null;

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const [result, setResult] = useState<BMIResult>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (!w || !h) return setResult({ error: "Enter valid values" });

    const bmi = w / (h * h);
    let status = "";
    let tip = "";

    if (bmi < 18.5) {
      status = "Underweight";
      tip = "Consider adding more nutritious calories to your diet.";
    } else if (bmi < 25) {
      status = "Normal Weight";
      tip = "Great! Maintain with regular exercise & balanced meals.";
    } else if (bmi < 30) {
      status = "Overweight";
      tip = "Try increasing physical activity and reducing sugars.";
    } else {
      status = "Obese";
      tip = "Seek advice from a healthcare professional.";
    }

    setResult({
      bmi: bmi.toFixed(1),
      status,
      tip,
    });
  };

  const clearAll = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          BMI Calculator
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Calculate your Body Mass Index and get health tips
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-gray-700 font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
              className="mt-1 w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              className="mt-1 w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 25"
              className="mt-1 w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={calculateBMI}
            className="py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:shadow-md transition"
          >
            Calculate BMI
          </button>

          <button
            onClick={clearAll}
            className="py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:shadow-sm transition"
          >
            Clear
          </button>
        </div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-6 rounded-2xl border bg-gray-50 shadow-inner"
          >
            {"error" in result ? (
              <p className="text-red-500 font-medium text-center">{result.error}</p>
            ) : (
              <div className="text-center">
                <p
                  className={`text-4xl font-bold ${
                    result.status === "Normal Weight"
                      ? "text-green-600"
                      : result.status === "Underweight"
                      ? "text-yellow-500"
                      : result.status === "Overweight"
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {result.bmi}
                </p>

                <p className="font-semibold mt-2 text-lg">{result.status}</p>
                <p className="mt-3 text-gray-600 text-sm">{result.tip}</p>
              </div>
            )}

            {/* BMI categories */}
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-semibold text-gray-700">BMI Categories:</p>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Underweight: &lt; 18.5</li>
                <li>Normal: 18.5 – 24.9</li>
                <li>Overweight: 25 – 29.9</li>
                <li>Obese: ≥ 30</li>
              </ul>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
