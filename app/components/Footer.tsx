"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Info,
  Wrench,
  Mail,
  PlusCircle,
  FileText,
  Image as ImageIcon,
  Calculator,
  QrCode,
  Shield,
  FileLock,
} from "lucide-react";

/* -------------------- DATA -------------------- */
const QUICK_LINKS = [
  { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  { label: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
  { label: "Tools", href: "/tools", icon: <Wrench className="w-4 h-4" /> },
  { label: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> },
  {
    label: "Request Tool",
    href: "/request-tool",
    icon: <PlusCircle className="w-4 h-4" />,
  },
];

const POPULAR_TOOLS = [
  {
    label: "Speech to Text",
    href: "/tools/textTools/speech-to-text",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: "Image Watermark",
    href: "/tools/imageTools/watermark-tool",
    icon: <ImageIcon className="w-4 h-4" />,
  },
  {
    label: "EMI Calculator",
    href: "/tools/calculatorTools/emi-calculator",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: "QR Generator",
    href: "/tools/utilityTools/qr-code-generator",
    icon: <QrCode className="w-4 h-4" />,
  },
];

/* -------------------- FOOTER -------------------- */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full h-min dark:bg-slate-950 dark:text-slate-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-slate-300 dark:ring-slate-700">
                <Image
                  src="/favicon.ico"
                  alt="A2Tool Logo"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <span className="text-xl font-bold dark:text-indigo-400">
                A2Tool
              </span>
            </Link>

            <p className="text-sm dark:text-slate-400">
              Secure, fast & browser-based tools for text, image, PDF and
              productivity. Built for speed & privacy.
            </p>

            <p className="text-xs text-slate-400">
              © {year} A2Tool. All rights reserved.
            </p>
          </div>
 
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-lg">
              <Shield className="w-5 h-5 text-indigo-500" />
              Quick Links
            </h4>

            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm hover:text-indigo-600 transition"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-lg">
              <Calculator className="w-5 h-5 text-indigo-500" />
              Popular Tools
            </h4>

            <ul className="space-y-2">
              {POPULAR_TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="flex items-center gap-2 text-sm hover:text-indigo-600 transition"
                  >
                    {tool.icon}
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>
            Made with <span className="text-red-500">♥</span> for developers &
            creators
          </p>

          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              <FileLock className="w-3 h-3" />
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="flex items-center gap-1 hover:text-indigo-600 transition"
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
