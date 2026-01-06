"use client";

import Head from "next/head";
import { pdfTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";

export default function PDFTools() {
  return (
    <>
      {/* 🧠 SEO & Meta Tags */}
      <Head>
        <title>Best Free PDF Tools - a2tool.com 2025</title>
        <meta
          name="description"
          content="Explore the best free online PDF tools in 2025 at a2tool.com, including PDF to Word, Word to PDF, merge, split, and e-signature tools. No signups required for easy PDF management."
        />
        <meta
          name="keywords"
          content="free PDF tools, online PDF editors, PDF to Word, Word to PDF, PDF merge, PDF split, e-signature, a2tool.com, 2025 tools"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Free PDF Tools - a2tool.com 2025" />
        <meta
          property="og:description"
          content="Discover top free online PDF tools for 2025 at a2tool.com, including converters, editors, merge, split, and e-signature tools with no signups needed."
        />
        <meta property="og:image" content="https://a2tool.com/og-pdf-tools.jpg" />
        <meta property="og:url" content="https://a2tool.com/tools/pdfTools" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Free PDF Tools - a2tool.com 2025" />
        <meta
          name="twitter:description"
          content="Get access to the best free online PDF tools in 2025 at a2tool.com for converting, editing, and signing PDFs with no signups!"
        />
        <meta name="twitter:image" content="https://a2tool.com/og-pdf-tools.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Best Free PDF Tools",
              description:
                "A collection of free online PDF tools for 2025 at a2tool.com, including PDF to Word, Word to PDF, merge, split, and e-signature tools.",
              url: "https://a2tool.com/tools/pdfTools",
              publisher: {
                "@type": "Organization",
                name: "a2tool.com",
                url: "https://a2tool.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://a2tool.com/tools/pdfTools{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      {/* 🌈 Main Layout */}
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* 🏷️ Header */}
          <h1 className="text-4xl font-extrabold mb-6 text-center bg-linear-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            📄 PDF Tools
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed mb-12">
            Simplify your document workflow with our{" "}
            <span className="font-semibold text-blue-600">free PDF utilities</span> — 
            convert, edit, merge, split, and sign PDFs easily, all in your browser.
          </p>

          {/* 🧩 Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
