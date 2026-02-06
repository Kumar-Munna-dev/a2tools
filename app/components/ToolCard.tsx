"use client";

import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

export default function ToolCard({
  title,
  description,
  icon,
  href = "#",
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="
        group block p-6 rounded-2xl border        
        shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-md
        hover:border-indigo-500/40
        dark:border-slate-800 dark:bg-slate-900
        dark:hover:border-indigo-400/40
        
      "
    >
      {/* ICON */}
      <div
        className="
          mb-4 flex h-12 w-12 items-center justify-center rounded-xl
           text-indigo-600
          transition-colors
          group-hover:bg-indigo-100
          dark:text-indigo-400
          dark:group-hover:bg-indigo-500/20
          dark:bg-slate-600
        "
      >
        {icon}
      </div>

      {/* TITLE */}
      <h3
        className="
          mb-1 text-lg font-semibold
          transition-colors
          group-hover:text-indigo-600
          dark:text-slate-100
          dark:group-hover:text-indigo-400
        "
      >
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p
        className="
          text-sm leading-relaxed
          text-slate-600
          dark:text-slate-400
        "
      >
        {description}
      </p>
    </Link>
  );
}
