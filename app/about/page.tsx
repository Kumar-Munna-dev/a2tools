import { ArrowRight, CheckCircle, Users, Target, Sparkles } from "lucide-react";

export const metadata = {
  title: "About | A2Tool",
  description:
    "A2Tool offers easy browser-based PDF, image, text, and file utilities for simple, fast workflows.",
};

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            About A2Tool
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">Simple online tools for every task.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            A2Tool delivers clean, reliable utilities for PDFs, images, text, and files. Everything works instantly in your browser with no sign-up and no clutter.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
            >
              Browse tools <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Contact support
            </a>
          </div>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: "Focus",
              desc: "Tools that keep every task simple and fast.",
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "Quality",
              desc: "Reliable results without unnecessary complexity.",
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Friendly",
              desc: "A clean interface built for everyone.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">
                {item.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold">Why people choose A2Tool</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "No signup required",
              "Fast browser-based processing",
              "Clear, friendly interface",
              "Covering PDF, image, text, and file tools",
            ].map((item, index) => (
              <li
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
