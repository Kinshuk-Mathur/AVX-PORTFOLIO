import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Static route entry documents preserve metadata on direct loads and social shares.
const routes = JSON.parse(await readFile(new URL('../src/data/routes.json', import.meta.url), 'utf8'));
const candidate = process.env.SITE_URL || process.env.URL;
let origin;
if (candidate) {
  const parsed = new URL(candidate);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('SITE_URL must be a public HTTPS URL.');
  origin = parsed.origin;
}
const template = await readFile('dist/index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
await mkdir('dist/pages', { recursive: true });
for (const route of routes) {
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(route.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(route.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(route.description)}`);
  if (origin) html = html.replace('</head>', `<link rel="canonical" href="${origin}${route.path}"><meta property="og:url" content="${origin}${route.path}"></head>`)
    .replace('content="/media/og-avx.png"', `content="${origin}/media/og-avx.png"`);
  await writeFile(`dist/pages${route.path}.html`, html);
  if (route.path === '/home') await writeFile('dist/index.html', html);
}
// Exact page rewrites keep missing assets and unknown URLs as real 404 responses.
await writeFile('dist/_redirects', [
  '/ /home 301',
  ...routes.flatMap(route => [`${route.path}/ ${route.path} 301!`, `${route.path} /pages${route.path}.html 200`]),
  '/work/* /index.html 200',
].join('\n') + '\n');
if (origin) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${origin}${route.path}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /pages/\nDisallow: /netlify-forms.html\nDisallow: /thank-you/\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
if (!origin) console.info('SEO: set SITE_URL (or deploy on Netlify) for canonical URLs and sitemap.');
