import { ArrowRight, CheckCircle, Cookie, Eye, FileLock, Mail, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | A2Tool",
  description:
    "A2Tool privacy policy explains how browser-based file processing works and how local settings are protected.",
};

export const dynamic = "force-static";

export default function PrivacyPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Privacy Policy
          </p>
          <h1 className="text-4xl font-bold">We respect your privacy.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            A2Tool runs in the browser and does not upload or store files. This page explains how we handle local settings, analytics, and external links.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: November 5, 2025</p>
        </div>

        <div className="mt-14 space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Shield className="h-6 w-6 text-teal-600" />
              <h2 className="text-2xl font-semibold">Browser-only processing</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Your files stay in your browser. A2Tool performs conversions, compression, and edits locally, so we never collect or store file content.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <FileLock className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">What we keep</h2>
            </div>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                Theme preference and tool settings are stored locally in your browser.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                Anonymous usage data may help improve the product.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                No personal or file content is collected without your consent.
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Cookie className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-semibold">Local storage only</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              A2Tool uses only essential browser storage for theme choices and preferences. There are no tracking cookies or profiling scripts.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Eye className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold">Anonymous analytics</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              We may collect anonymous site usage data like tool popularity and load times. This data helps improve A2Tool without identifying users.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Mail className="h-6 w-6 text-cyan-600" />
              <h2 className="text-2xl font-semibold">Need help?</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Email us at{' '}
              <a href="mailto:privacy@a2tool.com" className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">
                privacy@a2tool.com
              </a>
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
