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
    expect(redirects).toContain('/work/* /index.html 200');
    expect(redirects.split('\n').some(line => line.startsWith('/* '))).toBe(false);
  });
  it('rejects unsafe canonical origins', () => {
    expect(() => build('http://avx-test.example')).toThrow();
    expect(() => build('https://user:secret@avx-test.example')).toThrow();
  });
});
