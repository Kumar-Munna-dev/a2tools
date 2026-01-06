"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileArchive,
  Lock,
  QrCode,
  Code,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Palette,
  Ruler,
  Shield,
} from "lucide-react";

const toolsData = [
  { title: "Password Generator", description: "Generate secure passwords instantly.", icon: <Lock className="w-5 h-5" />, href: "/tools/utilityTools/password-generator" },
  { title: "EMI Calculator", description: "Calculate your monthly loan payments.", icon: <DollarSign className="w-5 h-5" />, href: "/tools/utilityTools/emi-calculator" },
  { title: "QR Code Generator", description: "Create & scan QR codes easily.", icon: <QrCode className="w-5 h-5" />, href: "/tools/utilityTools/qr-code-generator" },
  { title: "Unit Converter", description: "Convert between various units.", icon: <Ruler className="w-5 h-5" />, href: "/tools/utilityTools/unit-converter" },
  { title: "Color Converter", description: "Pick, convert & preview colors.", icon: <Palette className="w-5 h-5" />, href: "/tools/utilityTools/color-converter-picker" },
  { title: "JSON Formatter", description: "Format & validate JSON data.", icon: <Code className="w-5 h-5" />, href: "/tools/utilityTools/json-formatter" },
  { title: "File Compressor", description: "Compress files into a ZIP archive.", icon: <FileArchive className="w-5 h-5" />, href: "/tools/utilityTools/file-compressor" },
  { title: "File Converter", description: "Convert PDF, DOCX, TXT formats.", icon: <FileText className="w-5 h-5" />, href: "/tools/utilityTools/file-converter" },
  { title: "Encrypt / Decrypt", description: "Securely encrypt or decrypt text.", icon: <Shield className="w-5 h-5" />, href: "/tools/utilityTools/text-encrypt-decrypt" },
  { title: "Stopwatch & Timer", description: "Track time or set a countdown.", icon: <Clock className="w-5 h-5" />, href: "/tools/utilityTools/stopwatch-timer" },
  { title: "Date & Time Tools", description: "Work with dates and timezones.", icon: <Calendar className="w-5 h-5" />, href: "/tools/utilityTools/date-time-tools" },
];

export default function UtilityToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showSidebar =
    pathname.startsWith("/tools/utilityTools/") &&
    pathname.split("/").length > 3;

  if (!showSidebar) return <>{children}</>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-linear-to-br from-indigo-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      {/* 🧭 Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-xl">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-center bg-linear-to-rrom-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            ⚙️ Utility Tools
          </h2>
        </div>

        {/* Scrollable Sidebar Content */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {toolsData.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className={`group relative block p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-700/50 backdrop-blur-md shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] ${
                pathname === tool.href
                  ? "bg-linear-to-rrom-blue-500 to-indigo-500 text-white border-none shadow-lg"
                  : ""
              }`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-linear-to-br from-blue-400 via-indigo-400 to-cyan-300 blur-xl transition duration-300" />
              <div className="relative flex items-center gap-3 mb-1">
                <div className="p-2 rounded-lg bg-linear-to-r from-indigo-500 to-blue-500 text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3
                  className={`text-sm font-semibold ${
                    pathname === tool.href
                      ? "text-white"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {tool.title}
                </h3>
              </div>
              <p
                className={`text-xs ${
                  pathname === tool.href
                    ? "text-white/90"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </aside>

      {/* 🧱 Main Content */}
      <main
        className="flex-1 min-h-screen overflow-y-auto p-4 sm:p-6 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          main::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Tool Page Content */}
        <div className="pb-12">{children}</div>

        {/* 📱 Mobile Bottom Tools */}
        <div className="md:hidden mt-10 pb-10 pt-6 border-t border-gray-300 dark:border-gray-700">
          <h3 className="text-xl font-bold text-center bg-linear-to-rrom-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6">
            ⚙️ All Tools
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
            {toolsData.map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className={`group p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/60 backdrop-blur-md text-center shadow-md transition-all hover:shadow-lg hover:scale-[1.03] ${
                  pathname === tool.href
                    ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white border-none"
                    : ""
                }`}
              >
                <div className="flex justify-center mb-2">{tool.icon}</div>
                <h4
                  className={`text-sm font-semibold ${
                    pathname === tool.href
                      ? "text-white"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {tool.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
