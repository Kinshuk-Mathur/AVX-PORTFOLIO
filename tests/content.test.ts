import { describe, expect, it } from 'vitest';
import { formatTime, isDirectVideo, safeUrl, validateProjects, type Project } from '../src/lib/content';
import { formatInquiry, readInquiry } from '../src/lib/inquiry';
import { allProjects, publishedProjects } from '../src/data/projects';

describe('portfolio content boundary', () => {
  it('does not publish demonstration work as client projects', () => {
    expect(publishedProjects.every(project => project.status === 'published')).toBe(true);
    expect(allProjects.length).toBeGreaterThan(0);
  });
  it.each(['javascript:alert(1)', '//evil.test/path', 'data:text/html,hi', '/\\evil.test', 'https://user:pass@example.com', ' https://example.com', '/bad\npath'])('rejects unsafe URL %s', url => {
    expect(safeUrl(url)).toBeUndefined();
  });
  it('supports local assets, encoded spaces, and external HTTPS links', () => {
    expect(safeUrl('/media/video%20demo.mp4')).toBe('/media/video%20demo.mp4');
    expect(safeUrl('https://example.com/film')).toBe('https://example.com/film');
  });
  it('renders image-only or metadata-light content safely', () => {
    const project: Project = { id: 'one', slug: 'one', title: 'A real project', category: 'Websites', description: '', services: [], featured: false, gallery: [], status: 'published', thumbnail: 'javascript:bad' };
    expect(validateProjects([project])[0].thumbnail).toBeUndefined();
    expect(() => validateProjects([project, project])).toThrow(/duplicate/);
  });
  it('distinguishes hosted video files from external watch pages', () => {
    expect(isDirectVideo('https://example.com/film.mp4?token=abc')).toBe(true);
    expect(isDirectVideo('https://youtube.com/watch?v=abc')).toBe(false);
  });
  it('handles unknown durations without invalid controls', () => {
    expect(formatTime(Number.NaN)).toBe('0:00');
    expect(formatTime(Infinity)).toBe('0:00');
    expect(formatTime(73.8)).toBe('1:13');
  });
});

describe('inquiry validation and honest fallback', () => {
  const valid = () => {
    const data = new FormData();
    Object.entries({ name: 'A creator', email: 'creator@example.com', service: 'Video Editing', details: 'I would like to create a short studio film.' }).forEach(([key, value]) => data.set(key, value));
    return data;
  };
  it('formats a valid, optional-budget-free email or download', () => {
    const text = formatInquiry(readInquiry(valid()));
    expect(text).toContain('Video Editing');
    expect(text).toContain('creator@example.com');
    expect(text).not.toContain('Budget:');
  });
  it('rejects invalid services, email addresses, and empty project details', () => {
    for (const [key, value] of [['service','Other'],['email','invalid'],['details','  ']]) {
      const data = valid();
      data.set(key, value);
      expect(() => readInquiry(data)).toThrow();
    }
  });
});
