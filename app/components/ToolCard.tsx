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
        group block p-6 rounded-2xl
        bg-white dark:bg-slate-900/80
        border border-slate-200 dark:border-slate-800
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg
        hover:border-indigo-500/30 dark:hover:border-indigo-400/30
      "
    >
      {/* ICON */}
      <div
        className="
          mb-5 flex h-12 w-12 items-center justify-center rounded-xl
          bg-indigo-50/50 text-indigo-600
          transition-colors duration-300
          group-hover:bg-indigo-100 group-hover:text-indigo-700
          dark:bg-indigo-500/10 dark:text-indigo-400
          dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300
        "
      >
        {icon}
      </div>

      {/* TITLE */}
      <h3
        className="
          mb-2 text-lg font-bold text-slate-900 dark:text-slate-100
          transition-colors duration-300
          group-hover:text-indigo-600 dark:group-hover:text-indigo-400
        "
      >
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p
        className="
          text-sm leading-relaxed text-slate-500 dark:text-slate-400
          line-clamp-3
        "
      >
        {description}
      </p>
    </Link>
  );
}
