"use client";

import Head from "next/head";
import { imageTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Image Tools – Compress, Resize, Convert & Edit Images Online',
    template: '%s | A2Tool',
  },
  description:
    'Free online Image Tools to compress, resize, convert, edit, watermark, and optimize images easily.',
  keywords: [
    'image tools',
    'image compressor',
    'image resizer',
    'image converter',
    'online image editor',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/',
  },
};
export default function ImageTools() {
  return (
    <>
      {/* 🌈 Page Layout */}
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* 🏷️ Header */}
          <h1 className="text-4xl font-extrabold text-center mb-6 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
            🖼️ Image Tools
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed mb-12">
            Enhance, compress, and convert your images using our{" "}
            <span className="font-semibold text-purple-600">free smart tools</span>. 
            Everything runs right in your browser — no upload, no signups, just instant results.
          </p>

          {/* 🧩 Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {imageTools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
