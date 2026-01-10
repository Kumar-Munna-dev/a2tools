 

import Head from "next/head";
import { calculatorTools } from "@/app/data/toolsData";
import ToolCard from "@/app/components/ToolCard";

export default function CalculatorTools() {
  return (
    <>
      {/* 🧠 SEO + Open Graph */}
      <Head>
        <title>Best Free Calculator Tools - a2tool.com 2025</title>
        <meta
          name="description"
          content="Explore the best free online calculator tools in 2025 at a2tool.com, including Basic, Scientific, GST, EMI, Age, and BMI calculators. No signups required for accurate calculations."
        />
        <meta
          name="keywords"
          content="free calculator tools, online calculators, scientific calculator, GST calculator, EMI calculator, age calculator, BMI calculator, a2tool.com, 2025 tools"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Free Calculator Tools - a2tool.com 2025" />
        <meta
          property="og:description"
          content="Discover top free online calculator tools for 2025 at a2tool.com, including Basic, Scientific, GST, EMI, Age, and BMI calculators with no signups needed."
        />
        <meta property="og:image" content="https://a2tool.com/og-calculator-tools.jpg" />
        <meta property="og:url" content="https://a2tool.com/tools/calculatorTools" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Free Calculator Tools - a2tool.com 2025" />
        <meta
          name="twitter:description"
          content="Get access to the best free online calculators in 2025 at a2tool.com for scientific, financial, and health needs with no signups!"
        />
        <meta name="twitter:image" content="https://a2tool.com/og-calculator-tools.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Best Free Calculator Tools",
              description:
                "A collection of free online calculator tools for 2025 at a2tool.com, including Basic, Scientific, GST, EMI, Age, and BMI calculators.",
              url: "https://a2tool.com/tools/calculatorTools",
              publisher: {
                "@type": "Organization",
                name: "a2tool.com",
                url: "https://a2tool.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://a2tool.com/tools/calculatorTools{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      {/* 🌈 Page Layout */}
      <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-100 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* 🧮 Header */}
          <h1 className="text-4xl font-extrabold text-center mb-6 mt-10 bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            🧮 Calculator Tools
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed mb-12">
            Perform quick and precise calculations using our{" "}
            <span className="font-semibold text-indigo-600">free online calculators</span> — 
            from financial and GST to health and scientific computations.
          </p>

          {/* 🧩 Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculatorTools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
