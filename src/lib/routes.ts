export const workCategories = [
  { label: 'Video Editing', path: '/video-editing' },
  { label: 'Websites', path: '/websites' },
] as const;

export function isWorkPath(pathname: string) {
  return workCategories.some(item => item.path === pathname) || pathname === '/work' || pathname.startsWith('/work/');
}

export function legacySectionTarget(hash: string): string | undefined {
  const section = hash.replace(/^#/, '');
  if (section.startsWith('project/')) return `/work/${section.slice(8)}`;
  if (section === 'services') return '/home#services';
  if (section === 'work') return '/video-editing';
  if (['about', 'contact', 'home'].includes(section)) return `/${section}`;
}
