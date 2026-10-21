import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import routes from '../src/data/routes.json';

const script = resolve('scripts/seo.mjs');
const directories: string[] = [];
function build(origin = 'https://avx-test.example') {
  const directory = mkdtempSync(join(tmpdir(), 'avx-routes-'));
  directories.push(directory);
  mkdirSync(join(directory, 'dist'));
  writeFileSync(join(directory, 'dist/index.html'), readFileSync('index.html'));
  execFileSync(process.execPath, [script], { cwd: directory, env: { ...process.env, SITE_URL: origin, URL: '' }, stdio: 'pipe' });
  return directory;
}
afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true });
});
describe('Netlify page entries', () => {
  it('generates page-specific titles, canonical links and sitemap entries', () => {
    const directory = build();
    const sitemap = readFileSync(join(directory, 'dist/sitemap.xml'), 'utf8');
    for (const route of routes) {
      const html = readFileSync(join(directory, `dist/pages${route.path}.html`), 'utf8');
      expect(html).toContain(`<title>${route.title.replaceAll('&', '&amp;')}</title>`);
      expect(html).toContain(`rel="canonical" href="https://avx-test.example${route.path}"`);
      expect(sitemap).toContain(`<loc>https://avx-test.example${route.path}</loc>`);
    }
  });
  it('supports direct page and project links without swallowing missing asset URLs', () => {
    const directory = build();
    const redirects = readFileSync(join(directory, 'dist/_redirects'), 'utf8');
    expect(redirects).toContain('/ /home 301');
    expect(redirects).toContain('/about /pages/about.html 200');
    expect(redirects).toContain('/video-editing /pages/video-editing.html 200');
    expect(redirects).toContain('/websites /pages/websites.html 200');
    expect(redirects).toContain('/work /video-editing 301');
    expect(redirects).toContain('/services /home#services 301');
    expect(redirects.indexOf('/work/websites /websites 301')).toBeLessThan(redirects.indexOf('/work/*'));
    expect(routes.some(route => route.path === '/services')).toBe(false);
    expect(redirects).toContain('/work/* /index.html 200');
    expect(redirects.split('\n').some(line => line.startsWith('/* '))).toBe(false);
  });
  it('rejects unsafe canonical origins', () => {
    expect(() => build('http://avx-test.example')).toThrow();
    expect(() => build('https://user:secret@avx-test.example')).toThrow();
  });
  it('terminates direct loads and legacy links after Netlify trailing-slash normalization', () => {
    const directory = build();
    const rules = readFileSync(join(directory, 'dist/_redirects'), 'utf8')
      .trim().split('\n').map(line => line.split(/\s+/));
    // Netlify matches /page and /page/ identically, including forced redirects.
    const normalize = (path: string) => new URL(path, 'https://avx-test.example').pathname.replace(/\/+$/, '') || '/';
    const requests = [
      ...routes.map(route => [route.path, route.path]),
      ['/', '/home'], ['/work', '/video-editing'], ['/services', '/home'],
      ['/work/websites', '/websites'], ['/work/video-editing', '/video-editing'],
    ];
    for (const [request, destination] of requests) {
      for (const suffix of ['', '/', '/?utm_source=reload']) {
        let path = normalize(`${request === '/' ? '' : request}${suffix}`);
        const seen = new Set<string>();
        for (;;) {
          expect(seen.has(path), `Redirect cycle for ${request}${suffix}: ${path}`).toBe(false);
          seen.add(path);
          const rule = rules.find(([from]) => from.endsWith('*')
            ? path.startsWith(from.slice(0, -1)) : normalize(from) === path);
          expect(rule, `Missing route for ${path}`).toBeDefined();
          const [, to, status] = rule!;
          if (status.startsWith('3')) {
            path = normalize(to);
            continue;
          }
          expect(status).toBe('200');
          expect(to).toBe(`/pages${destination}.html`);
          expect(readFileSync(join(directory, 'dist', to), 'utf8')).toContain('<title>');
          break;
        }
      }
    }
  });
});
