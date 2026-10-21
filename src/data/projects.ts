import { validateProjects, type Project } from '../lib/content';
import videos from './video-manifest.json';

// Website portfolio inclusion confirmed by AVX. Editing samples remain separate.
export const publishedProjects: Project[] = validateProjects([
  {
    id: 'kapalini', slug: 'kapalini', title: 'Kapalini', category: 'Websites',
    description: 'A warm digital home for Kapalini Shudh Desi Ghee. Product-led imagery, editorial storytelling, and a dedicated shopping experience bring the brand’s everyday food moments to the web.',
    thumbnail: '/media/kapalini.webp', websiteUrl: 'https://kapalini.com',
    services: ['Website design', 'Website development'], featured: true,
    gallery: [{ src: '/media/kapalini.webp', alt: 'Kapalini website with its traditional red and cream identity and ghee product photography' }],
    highlights: ['Product and brand storytelling', 'Dedicated shop and product pages', 'Responsive layouts across screen sizes'], status: 'published',
  },
  {
    id: 'brewease', slug: 'brewease', title: 'BrewEase', category: 'Websites',
    description: 'A digital introduction to BrewEaseStreetCafe. An animated coffee story leads into the menu, the people behind the brand, and ways to connect with the café.',
    thumbnail: '/media/brewease.webp', websiteUrl: 'https://brewease.in',
    services: ['Website design', 'Website development'], featured: true,
    gallery: [{ src: '/media/brewease.webp', alt: 'BrewEaseStreetCafe website with its animated coffee hero and warm café palette' }],
    highlights: ['Scroll-led coffee imagery', 'Coffee menu and brand story', 'Responsive navigation and community contact links'], status: 'published',
  },
]);
export const videoSamples = videos;
export const demonstrationProjects: Project[] = validateProjects([
  ...videos.map(video => ({
    id: video.id, slug: video.id, title: video.title, category: 'Video Editing' as const,
    description: video.description, thumbnail: video.thumbnail, previewVideo: video.previewVideo,
    fullVideoUrl: video.fullVideoUrl, services: video.services, featured: true, gallery: [], status: 'demo' as const,
  })),
]);

export const allProjects = validateProjects([...publishedProjects, ...demonstrationProjects]);
const firstVideo = videos[0];
export const showreel = {
  title: 'AVX / Motion study', label: 'Studio demo · 00:14', isDemo: true,
  poster: firstVideo.thumbnail, preview: firstVideo.previewVideo, video: firstVideo.fullVideoUrl,
};
