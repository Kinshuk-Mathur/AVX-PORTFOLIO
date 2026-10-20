import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { allProjects, videoSamples, websiteScreens } from '../src/data/projects';
import { validateProjects } from '../src/lib/content';

describe('deployable showcase collection', () => {
  it('has unique project links and valid metadata for every supplied sample', () => {
    expect(() => validateProjects(allProjects)).not.toThrow();
    expect(videoSamples).toHaveLength(8);
    for (const sample of videoSamples) {
      expect(sample.duration).toBeGreaterThan(0);
      expect(sample.width).toBeGreaterThan(0);
      expect(sample.height).toBeGreaterThan(0);
      expect(allProjects.find(project => project.id === sample.id)?.status).toBe('demo');
    }
  });

  it('ships optimized posters, silent previews and playable MP4s without source MOV dependencies', () => {
    for (const sample of videoSamples) {
      for (const asset of [sample.thumbnail, sample.previewVideo, sample.fullVideoUrl]) {
        expect(asset.startsWith('/media/showcase/')).toBe(true);
        expect(existsSync(join('public', asset))).toBe(true);
      }
      expect(readFileSync(join('public', sample.fullVideoUrl)).subarray(4, 8).toString()).toBe('ftyp');
    }
  });

  it('uses real screenshots for the AVX website and valid internal page targets', () => {
    for (const screen of websiteScreens) {
      expect(existsSync(join('public', screen.image))).toBe(true);
      expect(['/home', '/about', '/services']).toContain(screen.url);
    }
  });
});
