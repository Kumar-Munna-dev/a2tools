"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RelatedTools from "@/app/components/RelatedTools";
import ToolSEO from "@/app/components/ToolSEO";
import { calculateBMI } from "@/app/utils/calculators";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "in" | "ft">("cm");
  
  // Note: Age and Gender are often collected for BMR or specific adjustments,
  // but standard adult BMI doesn't require them. We keep them for UI completeness 
  // or future expansion, but they won't affect the pure BMI math.
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const [result, setResult] = useState<ReturnType<typeof calculateBMI> | { error: string } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      return setResult({ error: "Please enter valid numbers greater than 0." });
    }

    if (w > 600 || h > 300) {
      return setResult({ error: "Values seem extremely high. Please check your inputs." });
    }

    const calculated = calculateBMI(h, heightUnit, w, weightUnit);
    if (!calculated) {
      setResult({ error: "Could not calculate with the given inputs." });
    } else {
      setResult(calculated);
    }
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
      className="flex flex-col lg:flex-row items-center lg:items-start gap-10 p-4 sm:p-8 dark:bg-slate-950 dark:text-slate-100"
    >
      <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto order-1 lg:order-2" aria-label="BMI Calculator">
        
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            BMI Calculator
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Calculate your Body Mass Index and understand your health profile.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Weight Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Weight</label>
              <div className="flex bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full p-3 bg-transparent text-slate-800 dark:text-slate-100 outline-none"
                  min="0"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 border-l border-slate-200 dark:border-slate-700 outline-none font-medium"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Height</label>
              <div className="flex bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 170"
                  className="w-full p-3 bg-transparent text-slate-800 dark:text-slate-100 outline-none"
                  min="0"
                />
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value as "cm" | "in" | "ft")}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 border-l border-slate-200 dark:border-slate-700 outline-none font-medium"
                >
                  <option value="cm">cm</option>
                  <option value="in">inches</option>
                  <option value="ft">feet</option>
                </select>
              </div>
            </div>

            {/* Age & Gender */}
            <div className="sm:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Age (Optional)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Gender (Optional)</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 py-3 sm:py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-transform active:scale-95 shadow-sm"
            >
              Calculate BMI
            </button>
            <button
              onClick={clearAll}
              className="w-full sm:w-1/3 py-3 sm:py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-transform active:scale-95 border border-slate-200 dark:border-slate-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result Area */}
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
          >
            {"error" in result ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-center font-medium">
                {result.error}
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-2">Your BMI Is</p>
                  <p className={`text-6xl font-black mb-2 ${result.color}`}>
                    {result.bmi}
                  </p>
                  <p className={`text-xl font-bold ${result.color}`}>
                    {result.category}
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-center">Healthy Weight Range</h3>
                  <p className="text-center text-slate-600 dark:text-slate-400">
                    For your height, a normal weight range would be from <strong className="text-indigo-600 dark:text-indigo-400">{result.healthyWeightRange[0]} kg</strong> to <strong className="text-indigo-600 dark:text-indigo-400">{result.healthyWeightRange[1]} kg</strong>.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm">Standard BMI Categories:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between"><span className="text-blue-500">Underweight</span> <span>&lt; 18.5</span></div>
                    <div className="flex justify-between"><span className="text-green-500">Normal</span> <span>18.5 - 24.9</span></div>
                    <div className="flex justify-between"><span className="text-yellow-500">Overweight</span> <span>25 - 29.9</span></div>
                    <div className="flex justify-between"><span className="text-red-500">Obesity</span> <span>≥ 30</span></div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}


      
  

        <ToolSEO 
          title="BMI Calculator"
          howToUse={[
            "Enter your height in your preferred unit (cm, inches, or feet).",
            "Enter your weight in your preferred unit (kg or lbs).",
            "Click calculate to see your accurate Body Mass Index (BMI) and health category."
          ]}
          features={[
            "Instant conversion between Metric and Imperial units",
            "Calculates your ideal healthy weight range",
            "Provides WHO standard health category classification",
            "Safe, private, and 100% client-side calculation"
          ]}
          faqs={[
            { question: "What is a healthy BMI?", answer: "A healthy BMI typically falls between 18.5 and 24.9 according to the World Health Organization (WHO)." },
            { question: "Is BMI accurate for everyone?", answer: "BMI is a general indicator, but it doesn't distinguish between muscle and fat. Athletes or pregnant women may have a high BMI without being unhealthy." }
          ]}
        />
      </section>

      <aside className="w-full lg:w-80 order-2 lg:order-1 flex-shrink-0 mt-8 lg:mt-0">
        <RelatedTools currentTool="Calculator" />
      </aside>

    </motion.div>
  );
}