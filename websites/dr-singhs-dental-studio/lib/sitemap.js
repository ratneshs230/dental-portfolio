/**
 * Sitemap Generator
 */

export function generateSitemap(baseUrl, pages) {
  const urls = pages.map(page => ({
    loc: baseUrl + page.path,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: page.changefreq || 'weekly',
    priority: page.priority || 0.8
  }))

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

export const defaultPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  { path: '/contact', priority: 0.8 },
  { path: '/book-appointment', priority: 0.9 }
]
