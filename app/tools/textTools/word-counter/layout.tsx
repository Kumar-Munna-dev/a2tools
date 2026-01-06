"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  File, Archive, Lock, QrCode, Code, Table, Calendar, Clock, DollarSign,
  FileArchive, FileText, Hash, Palette, Ruler, Shield,
  KeyRound,
  LinkIcon
} from "lucide-react";

// 🧩 All Utility Tools (Desktop Only Sidebar)
const toolsData: any[] =  [{
    title: "Password Generator",
    description: "Generate strong, secure passwords with strength meter.",
    icon: <Lock className="w-5 h-5" />,
    href: "/tools/utilityTools/password-generator",
  },
  {
    title: "EMI Calculator",
    description: "Calculate monthly loan installments easily and accurately.",
    icon: <DollarSign className="w-5 h-5" />,
    href: "/tools/utilityTools/emi-calculator",
  },
  {
    title: "Password Strength Checker",
    description: "Test the strength of your password.",
    icon: <KeyRound className="w-5 h-5" />,
    href: "/tools/utilityTools/password-strength-checker",
  },
  {
    title: "QR Code Generator & Scanner",
    description: "Create and scan QR codes with customizations.",
    icon: <QrCode className="w-5 h-5" />,
    href: "/tools/utilityTools/qr-code-generator",
  },
  {
    title: "URL Shortener",
    description: "Shorten long URLs with history.",
    icon: <LinkIcon className="w-5 h-5" />,
    href: "/tools/utilityTools/url-shortener",
  },
  {
    title: "Online Notepad",
    description: "Quick and simple auto-saving online notepad.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/utilityTools/online-notepad",
  },
  {
    title: "Unit Converter",
    description: "Convert between various units of measurement.",
    icon: <Ruler className="w-5 h-5" />,
    href: "/tools/utilityTools/unit-converter",
  },
  {
    title: "Currency Converter",
    description: "Real-time exchange rate conversions.",
    icon: <DollarSign className="w-5 h-5" />,
    href: "/tools/utilityTools/currency-converter",
  },
  {
    title: "Stopwatch & Timer",
    description: "Measure time or set a countdown.",
    icon: <Clock className="w-5 h-5" />,
    href: "/tools/utilityTools/stopwatch-timer",
  },
  {
    title: "Date & Time Tools",
    description: "Calculate date differences and check timezones.",
    icon: <Calendar className="w-5 h-5" />,
    href: "/tools/utilityTools/date-time-tools",
  },
  {
    title: "Epoch/Timestamp Converter",
    description: "Convert UNIX timestamps to human-readable dates.",
    icon: <Hash className="w-5 h-5" />,
    href: "/tools/utilityTools/epoch-converter",
  }];

export default function UtilityToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Show sidebar only for actual tool pages (not home or tool listing)
  const showSidebar =
    pathname.startsWith("/tools/utilityTools/") &&
    pathname.split("/").length > 3;

  if (!showSidebar) return <>{children}</>;

  return (
    <div className="flex w-fullflex min-h-screen mt-15 bg-linear-to-br from-indigo-50 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 🖥️ Desktop Sidebar Only */}
      <aside
        className="hidden md:flex flex-col w-80 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md
        border-r border-gray-200 dark:border-gray-700 p-5 overflow-y-auto shadow-inner scroll-smooth"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5 text-center">
          ⚙️ All Utility Tools
        </h2>

        <div className="grid gap-4 pb-6">
          {toolsData.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className={`block p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] ${
                pathname === tool.href
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  : "bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                {tool.icon}
                <h3
                  className={`text-base font-semibold ${
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

      {/* 🧱 Main Tool Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
    </div>
  );
}