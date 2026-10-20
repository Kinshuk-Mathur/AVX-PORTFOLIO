export type ProjectCategory = 'Video Editing' | 'Websites';
export type Project = {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  thumbnail?: string;
  previewVideo?: string;
  fullVideoUrl?: string;
  websiteUrl?: string;
  client?: string;
  year?: number;
  services: string[];
  featured: boolean;
  gallery: { src: string; alt: string }[];
  highlights?: string[];
  status: 'published' | 'demo';
};

/** Allow first-party assets and HTTPS URLs, never executable or protocol-relative URLs. */
export function safeUrl(value: string | undefined): string | undefined {
  if (!value || value.trim() !== value || /[\s\\<>"\u0000-\u001f]/.test(value)) return;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password) return url.href;
  } catch { /* Invalid URLs are treated as absent media. */ }
}

export function validateProjects(projects: Project[]): Project[] {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  return projects.map(project => {
    if (!project.id || ids.has(project.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) {
      throw new Error(`Invalid or duplicate portfolio identifier: ${project.id}`);
    }
    if (!project.title.trim() || !['Video Editing', 'Websites'].includes(project.category)) {
      throw new Error(`Invalid portfolio content: ${project.id}`);
    }
    ids.add(project.id);
    slugs.add(project.slug);
    return {
      ...project,
      thumbnail: safeUrl(project.thumbnail),
      previewVideo: safeUrl(project.previewVideo),
      fullVideoUrl: safeUrl(project.fullVideoUrl),
      websiteUrl: safeUrl(project.websiteUrl),
      gallery: project.gallery.filter(image => safeUrl(image.src) && image.alt.trim()),
    };
  });
}

export const isDirectVideo = (url: string) => /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(url);

export function formatTime(seconds: number) {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}
