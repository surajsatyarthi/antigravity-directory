import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/settings/',
        '/submit/',
        '/api/',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://antigravity.directory'}/sitemap.xml`,
  };
}
