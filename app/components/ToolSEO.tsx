import React from 'react';
import { FAQItem } from './SeoMeta';

interface ToolSEOProps {
  title?: string;
  howToUse?: string[];
  features?: string[];
  faqs?: FAQItem[];
}

export default function ToolSEO({ 
  title = "Tool",
  howToUse,
  features,
  faqs
}: ToolSEOProps) {
  if (!howToUse && !features && !faqs) return null;

  return (
    <article className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 mt-8 space-y-10 text-left">
      
      {howToUse && howToUse.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">How to Use the {title}</h2>
          <ol className="list-decimal pl-5 space-y-3 text-slate-600 dark:text-slate-400">
            {howToUse.map((step, idx) => (
              <li key={idx} className="pl-2">{step}</li>
            ))}
          </ol>
        </section>
      )}

      {features && features.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Key Features</h2>
          <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-400">
            {features.map((feature, idx) => (
              <li key={idx} className="pl-2">{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
