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
        block p-6 rounded-2xl bg-white border border-gray-200
        shadow-sm hover:shadow-lg transition-all duration-300
        hover:border-blue-500 hover:-translate-y-1
      "
    >
      {/* ICON */}
      <div className="
        w-12 h-12 flex items-center justify-center
        rounded-xl bg-blue-50 text-blue-600 text-2xl mb-4
      ">
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
