"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";


const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchRef.current?.value.trim();
    if (query) window.location.href = `/tools?search=${encodeURIComponent(query)}`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 relative">
            <Image src="/favicon.ico" alt="logo" fill className="rounded-lg object-contain" />
          </div>
          <span className="text-xl font-bold text-blue-600 dark:text-cyan-400">A2Tool</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
                  className="text-md font-bold text-slate-900 dark:text-slate-400 hover:text-indigo-400 hover:text-lg"
            >
              {item.label}
            </Link>
          ))}

          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-gray-400" />
            <input
              ref={searchRef}
              type="search"
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-2xl dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800 outline-none"
            />
          </form>

          {/*<ThemeToggle />*/}
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded-lg text-blue-600 dark:text-cyan-400"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
        {open && (
        <div className="md:hidden bg-white/90 dark:bg-slate-950/90">
          <div className="p-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                    className="block text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-cyan-400"
              >
                {item.label}
              </Link>
            ))}

            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-gray-400" />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search..."
                    className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-full dark:bg-slate-950 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </form>

            {/*<ThemeToggle />*/}
          </div>
        </div>
      )}
    </header>
  );
}
