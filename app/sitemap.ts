import { MetadataRoute } from 'next';
import { utilityTools, textTools, calculatorTools, imageTools } from './data/toolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const allTools = [
    ...utilityTools,
    ...textTools,
    ...calculatorTools,
    ...imageTools,
  ];

  const toolRoutes: MetadataRoute.Sitemap = allTools.map((tool) => ({
    url: `https://a2tool.com${tool.href}/`,
    lastModified,
  }));

  const mainRoutes: MetadataRoute.Sitemap = [
    { url: 'https://a2tool.com/', lastModified },
    { url: 'https://a2tool.com/tools/', lastModified },
    { url: 'https://a2tool.com/about/', lastModified },
    { url: 'https://a2tool.com/contact/', lastModified },
    { url: 'https://a2tool.com/privacy-policy/', lastModified },
    { url: 'https://a2tool.com/terms/', lastModified },
    { url: 'https://a2tool.com/tools/utilityTools/', lastModified },
    { url: 'https://a2tool.com/tools/textTools/', lastModified },
    { url: 'https://a2tool.com/tools/calculatorTools/', lastModified },
    { url: 'https://a2tool.com/tools/imageTools/', lastModified },
  ];

  return [...mainRoutes, ...toolRoutes];
}
