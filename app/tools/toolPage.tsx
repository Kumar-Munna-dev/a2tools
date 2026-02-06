import Head from "next/head";
import ToolCard from "../components/ToolCard";
import {
  textTools,
  imageTools,
  utilityTools,
  calculatorTools,
} from "../data/toolsData";

export default function ToolPage() {
  return (
    <>      <main className="mt-20 max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center dark:text-slate-50 mb-6">
        All Available Tools
      </h1>
      <p className="dark:text-slate-100 text-center dark:bg-slate-950 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
        Explore our full collection of free online tools — fast, secure, and ready to use in your browser.
      </p>

      <Section title="Text Tools" tools={textTools} />
      <Section title="Image Tools" tools={imageTools} />
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
      <h2 className="text-2xl font-semibold mb-6  dark:text-slate-100">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  );
}
