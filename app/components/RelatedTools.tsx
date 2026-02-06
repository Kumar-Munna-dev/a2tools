"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  textTools,
  imageTools,
  utilityTools,
  calculatorTools,
  ToolItem,
} from "../data/toolsData";

export default function RelatedTools({ currentTool }: { currentTool: string }) {
  const toolsByCategory: Record<string, ToolItem[]> = {
    All: [...textTools, ...imageTools, ...utilityTools, ...calculatorTools],
    Text: textTools,
    Image: imageTools,
    Calculator: calculatorTools,
    Utility: utilityTools,
  };

  const [selectedCategory] = useState(
    toolsByCategory[currentTool] ? currentTool : "All"
  );

  // ✅ Pick random 5 tools ONCE when component mounts
  const [randomFive] = useState(() => {
    const shuffled = [...toolsByCategory[selectedCategory]].sort(
      () => Math.random() - 0.5
    );
    return shuffled.slice(0, 5);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="dark:text-slate-100 text-xl sm:text-2xl font-bold pb-5 text-center">
        🔗 Related Tools
      </h2>

      <div className="w-80 grid grid-cols-1 gap-4">
        {randomFive.map((tool: ToolItem, i: number) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="dark:bg-slate-950 backdrop-blur-lg p-4 rounded-2xl shadow-md border border-slate-400 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              {tool.icon}
              <h3 className="font-semibold dark:text-slate-100 text-lg">
                {tool.title}
              </h3>
            </div>

            <p className="text-sm dark:text-slate-400 mb-3 line-clamp-2">
              {tool.description}
            </p>

            <Link
              href={tool.href}
              className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open Tool →
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}