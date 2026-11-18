import { MetadataRoute } from 'next';
import { PAGES } from '@/config/pages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pay.zetawala.com';

  return PAGES.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: page.type === 'tool' ? 'weekly' : 'monthly',
    priority: page.priority,
  }));
}
