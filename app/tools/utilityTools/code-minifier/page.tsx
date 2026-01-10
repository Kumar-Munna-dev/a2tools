import type { Metadata } from 'next';
import MinifierTool from './MinifierTool';

export const metadata: Metadata = {
  title: {
    default: 'Code Minifier – Minify HTML, CSS & JavaScript Online',
    template: '%s | A2Tool',
  },
  description:
    'Free Code Minifier tool to minify HTML, CSS, and JavaScript. Reduce file size, improve performance, and optimize code online.',
  keywords: [
    'code minifier',
    'minify html',
    'minify css',
    'minify javascript',
    'js minifier',
    'css minifier',
    'html minifier',
    'online code minifier',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/utilityTools/code-minifier/',
  },
  openGraph: {
    title: 'Code Minifier – Minify HTML, CSS & JS',
    description:
      'Minify HTML, CSS, and JavaScript instantly using A2Tool Code Minifier.',
    url: 'https://a2tool.com/tools/utilityTools/code-minifier/',
    siteName: 'A2Tool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Minifier Tool',
      },
    ],
    type: 'website',
  },
};

export default function Page () {
  return <MinifierTool />;
}
