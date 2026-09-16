import React from 'react';
import RelatedTools from '@/app/components/RelatedTools';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FAQItem } from './SeoMeta';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  toolType: string;
  // New SEO Props
  categoryPath?: string;
  categoryName?: string;
  howToUse?: string[];
  features?: string[];
  faqs?: FAQItem[];
}

export default function ToolLayout({ 
  title, 
  description, 
  children, 
  toolType,
  categoryPath,
  categoryName,
  howToUse,
  features,
  faqs
}: ToolLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 sm:mt-8 flex flex-col lg:flex-row items-center lg:items-start gap-8 px-4 sm:px-6 max-w-7xl mx-auto dark:bg-slate-950 dark:text-slate-100"
    >
      {/* Main Tool Content */}
      <div className="flex flex-col gap-6 w-full lg:w-2/3 order-1">
        
        {/* Breadcrumbs */}
        <nav className="flex text-xs text-slate-500 dark:text-slate-400 mb-2">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li>
              <Link href="/tools" className="hover:text-indigo-600 transition">Tools</Link>
            </li>
            {categoryPath && categoryName && (
              <>
                <li><ChevronRight size={12} /></li>
                <li>
                  <Link href={categoryPath} className="hover:text-indigo-600 transition">{categoryName}</Link>
                </li>
              </>
            )}
            <li><ChevronRight size={12} /></li>
            <li className="font-semibold text-slate-700 dark:text-slate-300">{title}</li>
          </ol>
        </nav>

        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-slate-100">{title}</h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 sm:p-6 mb-4">
          {children}
        </div>

        {/* --- SEO Content Blocks --- */}
        { (howToUse || features || faqs) && (
          <article className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 space-y-10">
            
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
        )}
      </div>
      
      {/* Sidebar: Related Tools */}
      <div className="w-full lg:w-1/3 order-2">
        <div className="sticky top-20">
          <RelatedTools currentTool={toolType} />
        </div>
      </div>
    </motion.div>
  );
}
