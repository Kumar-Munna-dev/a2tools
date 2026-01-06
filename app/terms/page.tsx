// app/terms/page.tsx
import { FileText, Shield, Clock, AlertCircle, ArrowRight, Mail } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
//  SEO Metadata
// ──────────────────────────────────────────────────────────────
export const metadata = {
  title: 'Terms of Service | A2Tool – PDF, Image & Text Utilities',
  description:
    'Read the official Terms of Service for A2Tool. Learn about usage rules, PDF conversion, image editing, text processing, privacy, and user responsibilities.',
};

// Force static generation
export const dynamic = 'force-static';

export default function TermsPage() {
  return (
    <>
      {/* ==== HERO SECTION ==== */}
      <section className="relative bg-linear-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Terms of Service
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-up animation-delay-200">
            Last updated: <strong>November 5, 2025</strong>
          </p>
          <p className="text-lg text-blue-200 animate-slide-up animation-delay-400">
            By using A2Tool, you agree to these terms. Please read them carefully.
          </p>
        </div>
      </section>

      {/* ==== MAIN CONTENT ==== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-lg max-w-none text-gray-700 space-y-12">

            {/* 1. Acceptance */}
            <div className="animate-fade-in animation-delay-600">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <FileText className="w-7 h-7 text-cyan-600" />
                1. Acceptance of Terms
              </h2>
              <p>
                Welcome to <strong>A2Tool</strong> (“we,” “us,” or “our”), a web‑based platform
                offering <strong>PDF conversion, image editing, text processing, and utility tools</strong>.
                By accessing or using our website and services, you agree to be bound by these Terms of Service.
              </p>
              <p className="mt-3">
                If you do not agree, you must not use A2Tool.
              </p>
            </div>

            {/* 2. Use of Service */}
            <div className="animate-slide-up animation-delay-800">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <Shield className="w-7 h-7 text-green-600" />
                2. Permitted Use
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may use A2Tool for personal and commercial purposes.</li>
                <li>
                  All tools (PDF merge, split, compress, image resize, convert, watermark, text extraction, etc.) run in your browser.
                </li>
                <li>No software installation required.</li>
                <li>Files are processed locally and never uploaded to our servers unless explicitly stated.</li>
              </ul>
            </div>

            {/* 3. Prohibited Activities */}
            <div className="animate-fade-in animation-delay-1000">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <AlertCircle className="w-7 h-7 text-red-600" />
                3. Prohibited Activities
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use A2Tool to process illegal, harmful, or copyrighted content without permission.</li>
                <li>Attempt to reverse‑engineer, copy, or distribute the platform.</li>
                <li>Overload the service with automated scripts or bots.</li>
                <li>Upload malware, viruses, or malicious code.</li>
              </ul>
            </div>

            {/* 4. Privacy & Data */}
            <div className="animate-slide-up animation-delay-1200">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <Clock className="w-7 h-7 text-indigo-600" />
                4. Privacy & Data Processing
              </h2>
              <p>
                A2Tool processes files <strong>100% in your browser</strong>. We do not store, log, or transmit your files.
                No data leaves your device.
              </p>
              <p className="mt-3">
                For analytics, we may collect anonymized usage data (e.g., tool usage count). See our{' '}
                <a href="/privacy" className="text-cyan-600 hover:underline font-medium">
                  Privacy Policy
                </a>{' '}
                for details.
              </p>
            </div>

            {/* 5. Intellectual Property */}
            <div className="animate-fade-in animation-delay-1400">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <Shield className="w-7 h-7 text-purple-600" />
                5. Intellectual Property
              </h2>
              <p>
                A2Tool and its original content, features, and functionality are owned by us and protected by
                international copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            {/* 6. Limitation of Liability */}
            <div className="animate-slide-up animation-delay-1600">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <AlertCircle className="w-7 h-7 text-orange-600" />
                6. Limitation of Liability
              </h2>
              <p>
                A2Tool is provided “as is” without warranties. We are not liable for any damages arising from
                use or inability to use the service, including data loss or processing errors.
              </p>
            </div>

            {/* 7. Changes to Terms */}
            <div className="animate-fade-in animation-delay-1800">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
                <FileText className="w-7 h-7 text-teal-600" />
                7. Changes to Terms
              </h2>
              <p>
                We may update these terms at any time. Changes will be posted on this page with an updated
                “Last updated” date. Continued use after changes constitutes acceptance.
              </p>
            </div>

            {/* 8. Contact */}
            <div className="animate-slide-up animation-delay-2000 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
                Questions?
              </h2>
              <p>
                Contact us at{' '}
                <a href="mailto:support@a2tool.com" className="text-cyan-600 hover:underline font-medium">
                  support@a2tool.com
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