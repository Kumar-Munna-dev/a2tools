"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Image as ImageIcon,
  Calculator,
  QrCode,
  Shield,
  FileLock,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
  { label: "Request Tool", href: "/request-tool" },
] as const;

const POPULAR_TOOLS = [
  {
    label: "Word Counter",
    href: "/tools/word-counter",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: "Image Compressor",
    href: "/tools/image-compressor",
    icon: <ImageIcon className="w-4 h-4" />,
  },
  {
    label: "PDF Converter",
    href: "/tools/pdf-converter",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: "QR Generator",
    href: "/tools/utilityTools/qr-code-generator",
    icon: <QrCode className="w-4 h-4" />,
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative 
        bg-linear-to-br from-[#f7f7f7] via-[#ffffff] to-[#ffffff] dark:via-gray-800 dark:to-gray-900 
        text-gray-700 dark:text-gray-300 
        border-t border-gray-200 dark:border-gray-700 
        backdrop-blur-xl shadow-inner
      "
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 via-cyan-400/10 to-indigo-400/10 blur-2xl opacity-50" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND INFO */}
          <div>
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                <Image
                  src="/favicon.ico"
                  alt="A2Tool Logo"
                  fill
                  sizes="40px"
                  priority
                  className="object-contain p-1 group-hover:scale-110 transition-transform"
                />
              </div>

              <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                A2Tool
              </h3>
            </Link>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Secure, fast, and 100% browser-based tools for text, image, PDF, utilities
              & productivity — built for speed and privacy.
            </p>

            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              © {currentYear} A2Tool. All rights reserved.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 mb-4">
              <Shield className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* POPULAR TOOLS */}
          <div>
            <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 mb-4">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              Popular Tools
            </h4>
            <ul className="space-y-2">
              {POPULAR_TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition"
                  >
                    <span className="text-blue-600 dark:text-cyan-400">{tool.icon}</span>
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>
            Made with <span className="text-red-500">♥</span> for developers & creators.
          </p>

          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition flex items-center gap-1"
            >
              <FileLock className="w-3 h-3" />
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
