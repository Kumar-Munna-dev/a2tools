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
    Hash,
    Palette,
    Ruler,
    Shield,
} from "lucide-react";

// 🧩 All Utility Tools (Sidebar Data)
const toolsData = [
    {
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
        title: "QR Code Generator & Scanner",
        description: "Create and scan QR codes with customizations.",
        icon: <QrCode className="w-5 h-5" />,
        href: "/tools/utilityTools/qr-code-generator",
    },
    {
        title: "Unit Converter",
        description: "Convert between various units of measurement.",
        icon: <Ruler className="w-5 h-5" />,
        href: "/tools/utilityTools/unit-converter",
    },
    {
        title: "Color Converter & Picker",
        description: "Convert HEX, RGB, HSL and pick colors.",
        icon: <Palette className="w-5 h-5" />,
        href: "/tools/utilityTools/color-converter-picker",
    },
    {
        title: "JSON Formatter & Validator",
        description: "Format, validate, and beautify JSON data.",
        icon: <Code className="w-5 h-5" />,
        href: "/tools/utilityTools/json-formatter",
    },
    {
        title: "File Compressor (ZIP)",
        description: "Create a ZIP file from multiple files.",
        icon: <FileArchive className="w-5 h-5" />,
        href: "/tools/utilityTools/file-compressor",
    },
    {
        title: "File Converter",
        description: "Convert between document formats like TXT, DOCX, PDF.",
        icon: <FileText className="w-5 h-5" />,
        href: "/tools/utilityTools/file-converter",
    },
    {
        title: "Text Encryption/Decryption",
        description: "Securely encrypt and decrypt text.",
        icon: <Shield className="w-5 h-5" />,
        href: "/tools/utilityTools/text-encrypt-decrypt",
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
        <div className="flex min-h-screen h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* 🖥️ Sidebar (Hidden on mobile) */}
            <aside
                className="hidden md:flex flex-col w-72 h-screen bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-inner"
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
                        ⚙️ All Utility Tools
                    </h2>
                </div>

                {/* Scrollable Tool List */}
                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    style={{
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE 10+
                    }}
                >
                    <style jsx>{`
            div::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>

                    {toolsData.map((tool, i) => (
                        <Link
                            key={i}
                            href={tool.href}
                            className={`block p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${pathname === tool.href
                                    ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white"
                                    : "bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                {tool.icon}
                                <h3
                                    className={`text-base font-semibold ${pathname === tool.href
                                            ? "text-white"
                                            : "text-gray-800 dark:text-gray-100"
                                        }`}
                                >
                                    {tool.title}
                                </h3>
                            </div>
                            <p
                                className={`text-xs ${pathname === tool.href
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

            <main
                className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 scroll-smooth"
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

                {children}
            </main>

        </div>
    );
}
