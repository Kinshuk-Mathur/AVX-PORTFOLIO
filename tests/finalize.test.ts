import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const script = resolve('scripts/finalize.mjs');
const fixtures: string[] = [];

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), 'avx-build-'));
  fixtures.push(directory);
  for (const name of ['media', 'SHOCASE-VIDEOS', 'thank-you']) {
    mkdirSync(join(directory, 'public', name), { recursive: true });
  }
  for (const name of ['netlify-forms.html', '404.html']) {
    writeFileSync(join(directory, 'public', name), '<html></html>');
  }
  return directory;
}

function finalize(directory: string) {
  execFileSync(process.execPath, [script], { cwd: directory, stdio: 'pipe' });
}

afterEach(() => {
  for (const directory of fixtures.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('production asset finalization', () => {
  it('succeeds in a fresh checkout without the optional projects directory', () => {
    const directory = fixture();
    expect(() => finalize(directory)).not.toThrow();
    expect(readFileSync(join(directory, 'dist', '404.html'), 'utf8')).toBe('<html></html>');
  });

  it('copies project assets when present', () => {
    const directory = fixture();
    mkdirSync(join(directory, 'public', 'projects', 'approved-project'), { recursive: true });
    writeFileSync(join(directory, 'public', 'projects', 'approved-project', 'caption.txt'), 'Approved work');
    finalize(directory);
    expect(readFileSync(join(directory, 'dist', 'projects', 'approved-project', 'caption.txt'), 'utf8')).toBe('Approved work');
  });

  it('still fails when required production assets are missing', () => {
    const directory = fixture();
    rmSync(join(directory, 'public', 'media'), { recursive: true });
    expect(() => finalize(directory)).toThrow();
  });

  it('excludes camera and editing source videos from deployment', () => {
    const directory = fixture();
    writeFileSync(join(directory, 'public', 'SHOCASE-VIDEOS', 'source.mov'), 'original footage');
    finalize(directory);
    expect(() => readFileSync(join(directory, 'dist', 'SHOCASE-VIDEOS', 'source.mov'))).toThrow();
  });
});
