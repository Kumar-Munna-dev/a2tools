import type { Metadata } from 'next';
import ImageTools from './ImageTools';
export const metadata: Metadata = {
  title: {
    default: 'Image Tools – Compress, Resize, Convert & Edit Images Online',
    template: '%s | A2Tool',
  },
  description:
    'Free online Image Tools to compress, resize, convert, edit, watermark, and optimize images easily.',
  keywords: [
    'image tools',
    'image compressor',
    'image resizer',
    'image converter',
    'online image editor',
  ],
  alternates: {
    canonical: 'https://a2tool.com/tools/imageTools/',
  },
};
export default function  Page() {
  return  <ImageTools />;
}
