"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Compass } from "lucide-react";
import ToolCard from "../components/ToolCard";
import {
  textTools,
  imageTools,
  utilityTools,
  calculatorTools,
} from "../data/toolsData";

function ToolGallery() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Catch search query from the URL (e.g., from the Header search bar)
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) setSearchQuery(query);
  }, [searchParams]);

  const sections = [
    {
      id: "text",
      title: "Text Tools",
      tools: textTools,
      description: "Format, analyze, and convert text instantly with our suite of writing utilities.",
    },
    {
      id: "image",
      title: "Image Tools",
      tools: imageTools,
      description: "Edit, resize, crop, and optimize your images without uploading them to a server.",
    },
    {
      id: "utility",
      title: "Utility Tools",
      tools: utilityTools,
      description: "Everyday helpers for developers, creators, and professionals.",
    },
    {
      id: "calculator",
      title: "Calculators",
      tools: calculatorTools,
      description: "Free online calculators for quick math, loans, and everyday finances.",
    },
  ];

  const query = searchQuery.toLowerCase().trim();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* HERO SECTION */}
      <section className="bg-white dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 pt-16 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            All Available Tools
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Explore our full collection of free online tools. Fast, secure, and running entirely in your browser with guaranteed privacy.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 relative max-w-xl mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-indigo-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all tools..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all shadow-sm group-hover:shadow-md text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </section>

      {/* TOOLS DIRECTORY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {sections.map((section) => {
            const filteredTools = section.tools.filter(
              (tool) =>
                tool.title.toLowerCase().includes(query) ||
                (tool.description && tool.description.toLowerCase().includes(query))
            );

            if (filteredTools.length === 0) return null;

            return (
              <section key={section.id} className="scroll-mt-24" id={section.id}>
                <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {section.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredTools.map((tool, idx) => (
                    <ToolCard
                      key={`${tool.title}-${idx}`}
                      title={tool.title}
                      description={tool.description ?? "Click to open tool"}
                      icon={
                        React.isValidElement(tool.icon) 
                          ? tool.icon 
                          : typeof tool.icon === "function" 
                            ? React.createElement(tool.icon as React.ElementType, { className: "w-6 h-6" }) 
                            : tool.icon
                      }
                      href={tool.href || (tool as any).path || "#"}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {/* EMPTY STATE */}
          {sections.every(
            (s) =>
              s.tools.filter(
                (t) =>
                  t.title.toLowerCase().includes(query) ||
                  (t.description && t.description.toLowerCase().includes(query))
              ).length === 0
          ) && (
            <div className="text-center py-20">
              <Compass className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">No tools found</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                We couldn't find any tools matching "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 px-6 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ToolPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading tools...</div>}>
      <ToolGallery />
    </Suspense>
  );
}
