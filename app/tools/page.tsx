import Head from "next/head";
import ToolCard from "../components/ToolCard";
import {
  textTools,
  imageTools,
  pdfTools,
  utilityTools,
  calculatorTools,
} from "../data/toolsData";

export default function ToolPage() {
  return (
    <>
      <Head>
        <title>All Free Online Tools - a2tool.com 2025</title>
        <meta
          name="description"
          content="Explore free online tools at a2tool.com — text, image, PDF, utility, and calculator tools for 2025. No signups required."
        />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          All Available Tools
        </h1>
        <p className="text-gray-600 text-center bg-blue-50 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
          Explore our full collection of free online tools — fast, secure, and ready to use in your browser.
        </p>

        <Section title="Text Tools" tools={textTools} />
        <Section title="Image Tools" tools={imageTools} />
        <Section title="PDF Tools" tools={pdfTools} />
        <Section title="Utility Tools" tools={utilityTools} />
        <Section title="Calculator Tools" tools={calculatorTools} />
      </main>
    </>
  );
}

function Section({ title, tools }: { title: string; tools: any[] }) {
  if (!Array.isArray(tools)) {
    console.error(`${title} tools is not an array`, tools);
    return null;
  }

  return (
    <section className="min-h-screenmt-12">
      <h2 className="bg-#f5ebef text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  );
}
