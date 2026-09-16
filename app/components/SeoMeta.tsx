import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SeoMetaProps {
  title: string;
  description: string;
  url: string;
  toolType?: "SoftwareApplication" | "WebApplication";
  category?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
}

export default function SeoMeta({ 
  title, 
  description, 
  url, 
  toolType = "WebApplication", 
  category = "UtilitiesApplication",
  breadcrumbs,
  faqs
}: SeoMetaProps) {
  
  const schemas: any[] = [];

  // Main Application Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": toolType,
    "name": title,
    "description": description,
    "url": url,
    "applicationCategory": category,
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  });

  // Breadcrumbs Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.item
      }))
    });
  }

  // FAQ Schema
  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
