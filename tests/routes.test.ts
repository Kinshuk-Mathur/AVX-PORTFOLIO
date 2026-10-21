import { describe, expect, it } from 'vitest';
import { isWorkPath, legacySectionTarget, workCategories } from '../src/lib/routes';
import { services } from '../src/data/services';
import { inquiryServices, readInquiry } from '../src/lib/inquiry';

describe('category navigation and preserved links', () => {
  it('exposes only separate video and website categories', () => {
    expect(workCategories.map(item => item.path)).toEqual(['/video-editing', '/websites']);
    for (const path of ['/video-editing', '/websites', '/work/kapalini']) expect(isWorkPath(path)).toBe(true);
    expect(isWorkPath('/home')).toBe(false);
  });
  it('preserves old shared links and maps services to its real Home anchor', () => {
    expect(legacySectionTarget('#services')).toBe('/home#services');
    expect(legacySectionTarget('#work')).toBe('/video-editing');
    expect(legacySectionTarget('#project/kapalini')).toBe('/work/kapalini');
    expect(legacySectionTarget('#inquiry')).toBeUndefined();
  });
  it('accepts an inquiry from each of the five service cards', () => {
    expect(services).toHaveLength(5);
    for (const service of services) {
      expect(inquiryServices).toContain(service.inquiry);
      const data = new FormData();
      Object.entries({ name: 'Test visitor', email: 'test@example.com', details: 'A project brief with enough detail.', service: service.inquiry }).forEach(([key, value]) => data.set(key, value));
      expect(readInquiry(data).service).toBe(service.inquiry);
    }
  });
});
