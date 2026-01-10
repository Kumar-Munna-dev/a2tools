"use client";

import Head from "next/head";
import { calculatorTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";

export default function CalculatorTools() {
  return (
    <>      {/* 🌈 Page Layout */}
      <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-100 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* 🧮 Header */}
          <h1 className="text-4xl font-extrabold text-center mb-6 mt-10 bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            🧮 Calculator Tools
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed mb-12">
            Perform quick and precise calculations using our{" "}
            <span className="font-semibold text-indigo-600">free online calculators</span> — 
            from financial and GST to health and scientific computations.
          </p>

          {/* 🧩 Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculatorTools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
