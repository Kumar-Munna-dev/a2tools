"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import ToolCard from "./ToolCard";

import {
  textTools,
  imageTools,
  utilityTools,
  calculatorTools,
} from "../data/toolsData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toolsByCategory: any = {
    All: [
      ...textTools,
      ...imageTools,
      ...utilityTools,
      ...calculatorTools,
    ],
    Text: textTools,
    Image: imageTools,
    Calculator: calculatorTools,
    Utility: utilityTools,
  };

  const filteredTools = toolsByCategory[selectedCategory];

  return (
    <>
      {/* FIXED BACKGROUND */}
      <main className="min-h-screen border-b rounded-2xl">

        <div className="relative z-10">

          {/* HERO SECTION FIXED */}
          <header className="text-center py-24 px-6 border-b dark:border-slate-800 rounded-2xl">
            <div className="max-w-3xl mx-auto">

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight dark:text-slate-100">
                The Ultimate All-in-One Toolkit
              </h1>

              <p className="mt-5 text-lg max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
                Fast, secure and powerful tools for everyday tasks — text,
                image, PDF, utilities & calculations. No login required.
              </p>

              <Link
                href="/tools"
                className="mt-8 inline-block bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
              >
                Explore All Tools →
              </Link>
            </div>

            {/* CATEGORY BUTTONS */}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {["All", "Text", "Image", "Calculator", "Utility"].map(
                (label) => (
                  <button
                    key={label}
                    onClick={() => setSelectedCategory(label)}
                    className={`px-5 py-2.5 rounded-full border dark:border-slate-800 text-sm font-semibold transition-all shadow-sm ${selectedCategory === label
                      ? "bg-indigo-600 dark:bg-indigo-500 text-white"
                      : "dark:text-slate-100  transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 dark:bg-slate-600"
                      }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </header>

          {/* TOOLS SECTION */}
          <section className="max-w-7xl mx-auto px-6 py-6">

            <h2 className="text-3xl font-bold dark:text-slate-100 text-center mb-12 ">
              {selectedCategory === "All"
                ? "Popular Tools"
                : `${selectedCategory} Tools`}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredTools.map((tool: any, index: number) => (
                <ToolCard
                  key={tool.title + index}   // ← now always unique
                  title={tool.title}
                  description={tool.description ?? "Click to open tool"}
                  icon={
                    typeof tool.icon === "function"
                      ? <tool.icon className="w-6 h-6" />
                      : tool.icon
                  }
                  href={tool.href || tool.path || "#"}
                />
              ))}

            </div>

          </section>

        </div>
      </main>
    </>
  );
}
