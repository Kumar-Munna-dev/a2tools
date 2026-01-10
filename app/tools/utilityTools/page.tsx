 

import Head from "next/head";
import { utilityTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";

export default function UtilityTools() {
    const newLocal = "min-h-screen bg-linear-to-br from-indigo-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all";
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Best Free Utility Tools - a2tool.com 2025</title>
        <meta
          name="description"
          content="Explore the best free online utility tools in 2025 at a2tool.com, including password generators, QR code tools, converters, and more. No signups required for versatile utilities."
        />
        <meta
          name="keywords"
          content="free utility tools, online utilities, password generator, QR code generator, unit converter, currency converter, a2tool.com, 2025 tools"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Free Utility Tools - a2tool.com 2025" />
        <meta
          property="og:description"
          content="Discover top free online utility tools for 2025 at a2tool.com, including password generators, QR code tools, converters, and more with no signups needed."
        />
        <meta property="og:image" content="https://a2tool.com/og-utility-tools.jpg" />
        <meta property="og:url" content="https://a2tool.com/tools/utilityTools" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Free Utility Tools - a2tool.com 2025" />
        <meta
          name="twitter:description"
          content="Get access to the best free online utility tools in 2025 at a2tool.com for passwords, QR codes, conversions, and more with no signups!"
        />
        <meta name="twitter:image" content="https://a2tool.com/og-utility-tools.jpg" />

        {/* ✅ Structured Data (SEO Schema) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Best Free Utility Tools",
              description:
                "A collection of free online utility tools for 2025 at a2tool.com, including password generators, QR code tools, converters, and more.",
              url: "https://a2tool.com/tools/utilityTools",
              publisher: {
                "@type": "Organization",
                name: "a2tool.com",
                url: "https://a2tool.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://a2tool.com/tools/utilityTools{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      {/* 🌈 Main Page Content */}
      <div className={newLocal}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <h1 className="text-4xl font-extrabold mb-8 text-center bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            ⚙️ Utility Tools Collection
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed mb-12">
            Discover the best <span className="font-semibold text-blue-600">free online utility tools</span> for everyday use — 
            built for speed, precision, and modern web standards.
          </p>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {utilityTools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
