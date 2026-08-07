import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.diyamehra.online';

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Dynamically add the 25 blog pages
  for (let i = 1; i <= 25; i++) {
    routes.push({
      url: `${baseUrl}/blog-${i}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });
  }

  return routes;
}
