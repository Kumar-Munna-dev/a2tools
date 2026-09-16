"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";

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
  <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-100"
      >
       <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2"> {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          BMI Calculator – Check Body Mass Index Online
        </h1>
        <p className="text-centerdark:text-slate-100  mb-6 text-sm">
          Calculate your Body Mass Index and get health tips
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm  font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
              className="mt-1 w-full p-3 border rounded-xl dark:bg-slate-950 dark:text-slate-100 border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              className="mt-1 w-full p-3 border rounded-xl dark:bg-slate-950 dark:text-slate-100 border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 25"
              className="mt-1 w-full p-3 border rounded-xl dark:bg-slate-950 dark:text-slate-100 border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
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
            className="py-3 rounded-xl bg-slate-200 dark:bg-slate-800 dark:text-slate-100 text-gray-700 font-semibold hover:shadow-sm transition"
          >
            Clear
          </button>
        </div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-6 rounded-2xl border shadow-inner"
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
                <p className="mt-3 text-sm">{result.tip}</p>
              </div>
            )}

            {/* BMI categories */}
            <div className="mt-6 text-sm ">
              <p className="font-semibold ">BMI Categories:</p>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Underweight: &lt; 18.5</li>
                <li>Normal: 18.5 – 24.9</li>
                <li>Overweight: 25 – 29.9</li>
                <li>Obese: ≥ 30</li>
              </ul>
            </div>
          </motion.div>
        )}
        </div>

              {/* Here Moblie card */}
              <div className="order-2  sm:order-1">
          <RelatedTools currentTool="Calculator" />
              </div>
            
      </motion.div>

  );
}
