import { readFile, writeFile } from 'node:fs/promises';

// Netlify provides URL automatically. SITE_URL can override it for a custom domain.
const candidate = process.env.SITE_URL || process.env.URL;
if (candidate) {
  const parsed = new URL(candidate);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('SITE_URL must be a public HTTPS URL.');
  const origin = parsed.origin;
  const html = await readFile('dist/index.html', 'utf8');
  await writeFile('dist/index.html', html.replace('</head>', `<link rel="canonical" href="${origin}/"><meta property="og:url" content="${origin}/"></head>`).replace('content="/media/og-avx.png"', `content="${origin}/media/og-avx.png"`));
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /netlify-forms.html\nDisallow: /thank-you/\nSitemap: ${origin}/sitemap.xml\n`);
} else {
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nDisallow: /netlify-forms.html\nDisallow: /thank-you/\n');
  console.info('SEO: set SITE_URL (or deploy on Netlify) to generate absolute social metadata and sitemap.');
}
