export default function robots() { return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
    ],
    sitemap: 'https://a2tool.com/sitemap.xml',
    host: 'https://a2tool.com',
  };
}
