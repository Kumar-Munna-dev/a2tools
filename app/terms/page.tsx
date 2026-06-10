import { ArrowRight, AlertCircle, Clock, FileText, Mail, Shield } from "lucide-react";

export const metadata = {
  title: "Terms of Service | A2Tool",
  description:
    "Read the simple Terms of Service for A2Tool and understand how our browser-based PDF, image, text, and file tools are meant to be used.",
};

export const dynamic = "force-static";

export default function TermsPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Terms of Service
          </p>
          <h1 className="text-4xl font-bold">Easy, fair terms for A2Tool.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            By using A2Tool, you agree to keep the experience safe, fair, and respectful. These simple terms explain what is expected.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: November 5, 2025</p>
        </div>

        <div className="mt-14 space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <FileText className="h-6 w-6 text-cyan-600" />
              <h2 className="text-2xl font-semibold">Use the site responsibly</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              A2Tool is built to help you work with PDFs, images, text, and files. Use it for legal and respectful purposes.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Shield className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold">Permitted use</h2>
            </div>
            <ul className="list-disc space-y-3 pl-6 text-slate-700 dark:text-slate-300">
              <li>Use A2Tool for personal or business tasks.</li>
              <li>All tools run locally in your browser without extra installation.</li>
              <li>Files are processed locally and are not uploaded unless explicitly stated.</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-semibold">What not to do</h2>
            </div>
            <ul className="list-disc space-y-3 pl-6 text-slate-700 dark:text-slate-300">
              <li>Do not process illegal, harmful, or copyrighted content without permission.</li>
              <li>Do not overload the site with bots or automation.</li>
              <li>Do not reverse engineer, copy, or redistribute the platform.</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Clock className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold">Privacy note</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Files are processed in your browser and are not stored by A2Tool. See our Privacy Policy for full details.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Mail className="h-6 w-6 text-cyan-600" />
              <h2 className="text-2xl font-semibold">Questions?</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Email us at{' '}
              <a href="mailto:support@a2tool.com" className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">
                support@a2tool.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
          >
            Back to A2Tool <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
