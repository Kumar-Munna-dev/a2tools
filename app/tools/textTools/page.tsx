 

import { textTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";

export default function TextTools() {
  return (
    <div className="min-h-screen bg-linear-to-brrom-indigo-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 🏷️ Header */}
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          ✍️ Text Tools
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed mb-12">
          Enhance your text productivity with our <span className="font-semibold text-blue-600">free online tools</span> — from word counting and case conversion to grammar checking and speech utilities.
        </p>

        {/* 🧩 Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {textTools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
