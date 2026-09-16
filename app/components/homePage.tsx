"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";
import ToolCard from "./ToolCard";

import {
  textTools,
  imageTools,
  utilityTools,
  calculatorTools,
} from "../data/toolsData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredTools = useMemo(() => {
    const tools = toolsByCategory[selectedCategory] || [];
    if (!searchQuery.trim()) return tools;
    const lowerQuery = searchQuery.toLowerCase();
    return tools.filter((tool: any) =>
      tool.title.toLowerCase().includes(lowerQuery) ||
      (tool.description && tool.description.toLowerCase().includes(lowerQuery))
    );
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* MAIN WRAPPER */}
      <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">

        <div className="relative z-10">

          {/* HERO SECTION FIXED */}
          <header className="text-center py-20 lg:py-28 px-6 bg-white dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-3xl mx-auto">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                The Ultimate All-in-One Toolkit
              </h1>

              <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed text-slate-600 dark:text-slate-400">
                Fast, secure and powerful tools for everyday tasks — text,
                image, PDF, utilities & calculations. No login required.
              </p>

              <Link
                href="/tools"
                className="mt-8 inline-block bg-indigo-600 text-white dark:bg-indigo-500 px-8 py-3.5 rounded-xl text-lg font-semibold shadow-sm hover:shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore All Tools →
              </Link>
            </div>

            {/* CATEGORY BUTTONS */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {["All", "Text", "Image", "Calculator", "Utility"].map(
                (label) => (
                  <button
                    key={label}
                    onClick={() => setSelectedCategory(label)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === label
                        ? "bg-indigo-600 text-white shadow-md dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>

            {/* SEARCH BAR FOR TOOLS */}
            <div className="mt-8 max-w-xl mx-auto relative group">
              <input 
                type="search"
                placeholder="Search for a tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all duration-300 text-slate-900 dark:text-slate-100 shadow-sm group-hover:shadow-md focus:shadow-md"
              />
            </div>
          </header>

          {/* TOOLS SECTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-10">
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
