"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8 overflow-hidden rounded-lg">
            <Image
              src="/favicon.ico"
              alt="A2Tool Logo"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
        <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            A2Tool
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  text-sm lg:text-base font-bold transition-colors
                  ${isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-4 flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded-lg text-indigo-600 dark:text-indigo-400"
          onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-16 left-0 w-full border-b shadow-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-6"
          >
            <div className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`
                      block text-base font-medium transition-colors
                      ${isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    {/* Spacer to prevent content from hiding under the fixed header */}
   
    </>
  );
}
