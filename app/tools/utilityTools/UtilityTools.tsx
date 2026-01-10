 

import Head from "next/head";
import { utilityTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";

export default function UtilityTools() {
    const newLocal = "min-h-screen bg-linear-to-br from-indigo-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all";
  return (
    <>
      {/* 🌈 Main Page Content */}
      <div className={newLocal}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <h1 className="text-4xl font-extrabold mb-8 text-center bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Utility Tools – Free Online Tools
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed mb-12">
            Discover the best <span className="font-semibold text-blue-600">free online utility tools</span> for everyday use — 
            built for speed, precision, and modern web standards.
          </p>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {utilityTools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
