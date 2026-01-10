 

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { File, Archive, Lock, QrCode, Code, Table } from "lucide-react";

interface RelatedTool {
  name: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
}

const toolsData: RelatedTool[] = [
  {
    name: "File Compressor (ZIP)",
    description: "Compress multiple files into a ZIP archive quickly and securely.",
    path: "/tools/utilityTools/file-compressor",
    icon: <Archive className="h-6 w-6 text-blue-600" />,
    category: "file",
  },
  {
    name: "File Converter",
    description: "Convert between TXT, DOCX, and PDF formats instantly.",
    path: "/tools/utilityTools/file-converter",
    icon: <File className="h-6 w-6 text-indigo-600" />,
    category: "file",
  },
  {
    name: "Text Encrypt / Decrypt",
    description: "Securely encrypt and decrypt text locally in your browser.",
    path: "/tools/utilityTools/text-encrypt-decrypt",
    icon: <Lock className="h-6 w-6 text-purple-600" />,
    category: "text",
  },
  {
    name: "QR Code Generator",
    description: "Create and download custom QR codes instantly.",
    path: "/tools/utilityTools/qr-generator",
    icon: <QrCode className="h-6 w-6 text-green-600" />,
    category: "utility",
  },
  {
    name: "JSON Formatter & Validator",
    description: "Validate and beautify JSON data for readability.",
    path: "/tools/utilityTools/json-formatter",
    icon: <Code className="h-6 w-6 text-orange-600" />,
    category: "dev",
  },
  {
    name: "Unit Converter",
    description: "Convert values between length, mass, temperature, and more.",
    path: "/tools/utilityTools/unit-converter",
    icon: <Table className="h-6 w-6 text-cyan-600" />,
    category: "utility",
  },
];

export default function RelatedTools({ currentTool }: { currentTool: string }) {
  const related = toolsData.filter((t) => t.path !== currentTool);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=""
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 pb-5 text-center">
        🔗 Related Tools
      </h2>

      <div className="w-80 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
        {related.map((tool, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-lg p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              {tool.icon}
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                {tool.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {tool.description}
            </p>
            <Link
              href={tool.path}
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
