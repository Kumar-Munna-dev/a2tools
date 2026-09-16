import { Metadata } from 'next';

export function getSeoMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `https://a2tool.com${path}`;
  
  return {
    title: `${title} - Free Online Tool | A2Tools`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | A2Tools`,
      description,
      url,
      siteName: 'A2Tools',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | A2Tools`,
      description,
    },
  };
}
