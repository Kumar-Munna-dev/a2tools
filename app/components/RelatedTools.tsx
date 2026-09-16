"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

import {
  textTools,
  imageTools,
  utilityTools,
  calculatorTools,
  ToolItem,
} from "../data/toolsData";

export default function RelatedTools({ currentTool }: { currentTool: string }) {
  const pathname = usePathname();

  const toolsByCategory: Record<string, ToolItem[]> = {
    All: [...textTools, ...imageTools, ...utilityTools, ...calculatorTools],
    Text: textTools,
    Image: imageTools,
    Calculator: calculatorTools,
    Utility: utilityTools,
  };

  const selectedCategory = toolsByCategory[currentTool] ? currentTool : "All";

  const [randomFive, setRandomFive] = useState<ToolItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadRelatedTools = () => {
    // Filter out the currently active tool page
    const availableTools = toolsByCategory[selectedCategory].filter(
      (tool) => tool.href !== pathname
    );
    // Shuffle and pick 5
    const shuffled = [...availableTools].sort(() => Math.random() - 0.5);
    setRandomFive(shuffled.slice(0, 5));
  };

  useEffect(() => {
    loadRelatedTools();
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, selectedCategory]);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between pb-5 px-1">
        <h2 className="dark:text-slate-100 text-xl sm:text-2xl font-bold">
          🔗 Related Tools
        </h2>
        <button
          onClick={loadRelatedTools}
          className="p-2 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-colors"
          title="Show different tools"
          aria-label="Refresh related tools"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {randomFive.map((tool: ToolItem, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={tool.href}
              className="group block p-5 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-indigo-500/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-400/40"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-indigo-600 bg-slate-50 transition-colors group-hover:bg-indigo-50 dark:text-indigo-400 dark:bg-slate-800 dark:group-hover:bg-indigo-500/20">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                  {tool.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}