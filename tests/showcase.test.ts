import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { allProjects, publishedProjects, videoSamples } from '../src/data/projects';
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

  it('shows only the two approved external websites in the website collection', () => {
    const websites = allProjects.filter(project => project.category === 'Websites');
    expect(websites.map(project => project.id)).toEqual(['kapalini', 'brewease']);
    expect(websites.every(project => project.websiteUrl?.startsWith('https://'))).toBe(true);
  });
  it('includes the two approved live websites with deployable screenshots', () => {
    expect(publishedProjects.map(project => project.websiteUrl)).toEqual(['https://kapalini.com/', 'https://brewease.in/']);
    for (const project of publishedProjects) {
      expect(project.category).toBe('Websites');
      expect(project.status).toBe('published');
      expect(existsSync(join('public', project.thumbnail!))).toBe(true);
    }
  });

});
