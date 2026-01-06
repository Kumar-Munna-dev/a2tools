// app/privacy/page.tsx
import { Shield, Eye, Cookie, FileLock, ArrowRight, CheckCircle, Mail } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
//  SEO Metadata
// ──────────────────────────────────────────────────────────────
export const metadata = {
  title: 'Privacy Policy | A2Tool – Secure PDF, Image & Text Utilities',
  description:
    'A2Tool processes all files in your browser. No data is uploaded or stored. Learn about our privacy practices, analytics, cookies, and your rights.',
};

// Force static generation
export const dynamic = 'force-static';

export default function PrivacyPage() {
  return (
    <>
      {/* ==== HERO SECTION ==== */}
      <section className="relative bg-linear-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-up animation-delay-200">
            Your privacy is our priority. We don’t store your files.
          </p>
          <p className="text-lg text-blue-200 animate-slide-up animation-delay-400">
            Last updated: <strong>November 5, 2025</strong>
          </p>
        </div>
      </section>

      {/* ==== MAIN CONTENT ==== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-lg max-w-none text-gray-700 space-y-12">

            {/* 1. Introduction */}
            <div className="animate-fade-in animation-delay-600">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <Shield className="w-7 h-7 text-green-600" />
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>A2Tool</strong>, a privacy‑first web platform offering{' '}
                <strong>PDF conversion, image editing, text utilities, and more</strong>. This Privacy Policy
                explains how we collect, use, and protect your information.
              </p>
              <p className="mt-3">
                <strong>We do not upload, store, or share your files.</strong> All processing happens in your browser.
              </p>
            </div>

            {/* 2. Data Processing */}
            <div className="animate-slide-up animation-delay-800">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <FileLock className="w-7 h-7 text-blue-600" />
                2. In‑Browser Processing
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>PDF merge, split, compress</strong> – done locally.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Image resize, convert, watermark</strong> – processed in memory.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Text extraction, formatting, regex</strong> – runs in your browser only.
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 italic">
                No file ever leaves your device. We cannot access your data.
              </p>
            </div>

            {/* 3. Analytics */}
            <div className="animate-fade-in animation-delay-1000">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <Eye className="w-7 h-7 text-indigo-600" />
                3. Anonymous Usage Analytics
              </h2>
              <p>
                We collect <strong>anonymous, aggregated data</strong> to improve A2Tool, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Which tools are used most (e.g., PDF merge vs. image resize)</li>
                <li>Browser type and screen size (for UI improvements)</li>
                <li>Page load performance</li>
              </ul>
              <p className="mt-4">
                We use <strong>no third‑party trackers</strong>. Analytics are powered by lightweight, self‑hosted scripts.
              </p>
            </div>

            {/* 4. Cookies */}
            <div className="animate-slide-up animation-delay-1200">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <Cookie className="w-7 h-7 text-orange-600" />
                4. Cookies & Local Storage
              </h2>
              <p>
                A2Tool uses <strong>only essential local storage</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Remember your theme preference (light/dark)</li>
                <li>Cache recent tool settings (optional)</li>
                <li>No tracking cookies, no ads, no profiling</li>
              </ul>
              <p className="mt-4">
                You can clear this data anytime via your browser settings.
              </p>
            </div>

            {/* 5. Third-Party Links */}
            <div className="animate-fade-in animation-delay-1400">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <ArrowRight className="w-7 h-7 text-purple-600" />
                5. Third‑Party Links
              </h2>
              <p>
                A2Tool may link to external sites (e.g., documentation, GitHub). We are not responsible for their privacy practices.
              </p>
            </div>

            {/* 6. Your Rights */}
            <div className="animate-slide-up animation-delay-1600">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <Shield className="w-7 h-7 text-teal-600" />
                6. Your Privacy Rights
              </h2>
              <p>Since we don’t collect personal data, you have full control:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Delete local storage → clears all A2Tool settings</li>
                <li>Disable JavaScript → tools still work (core features)</li>
                <li>Use in private/incognito mode → zero persistence</li>
              </ul>
            </div>

            {/* 7. Changes */}
            <div className="animate-fade-in animation-delay-1800">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <FileLock className="w-7 h-7 text-cyan-600" />
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy. Changes will be posted here with a new “Last updated” date.
                Continued use of A2Tool after changes means you accept the updated policy.
              </p>
            </div>

            {/* 8. Contact */}
            <div className="animate-slide-up animation-delay-2000 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
                Contact Us
              </h2>
              <p>
                Questions about privacy? Email us at{' '}
                <a href="mailto:privacy@a2tool.com" className="text-cyan-600 hover:underline font-medium">
                  privacy@a2tool.com
                </a>
              </p>
            </div>
          </article>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-in animation-delay-2200">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-700 transition-colors"
            >
              Back to A2Tool <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}