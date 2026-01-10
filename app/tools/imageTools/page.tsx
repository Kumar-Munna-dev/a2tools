 

import Head from "next/head";
import { imageTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";

export default function ImageTools() {
  return (
    <>
      {/* 🧠 SEO Metadata */}
      <Head>
        <title>Best Free Image Tools - a2tool.com 2025</title>
        <meta
          name="description"
          content="Explore the best free online image tools in 2025 at a2tool.com, including compressors, resizers, background removers, and more. No signups required for easy image editing."
        />
        <meta
          name="keywords"
          content="free image tools, online image editors, image compressor, image resizer, background remover, image converter, a2tool.com, 2025 tools"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Free Image Tools - a2tool.com 2025" />
        <meta
          property="og:description"
          content="Discover top free online image tools for 2025 at a2tool.com, including compressors, resizers, background removers, and more with no signups needed."
        />
        <meta property="og:image" content="https://a2tool.com/og-image-tools.jpg" />
        <meta property="og:url" content="https://a2tool.com/tools/imageTools" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Free Image Tools - a2tool.com 2025" />
        <meta
          name="twitter:description"
          content="Get access to the best free online image tools in 2025 at a2tool.com for editing, compressing, and converting images with no signups!"
        />
        <meta name="twitter:image" content="https://a2tool.com/og-image-tools.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Best Free Image Tools",
              description:
                "A collection of free online image tools for 2025 at a2tool.com, including compressors, resizers, background removers, and converters.",
              url: "https://a2tool.com/tools/imageTools",
              publisher: {
                "@type": "Organization",
                name: "a2tool.com",
                url: "https://a2tool.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://a2tool.com/tools/imageTools{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      {/* 🌈 Page Layout */}
      <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
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
