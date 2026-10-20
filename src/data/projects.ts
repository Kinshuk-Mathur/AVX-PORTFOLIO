import { validateProjects, type Project } from '../lib/content';
import videos from './video-manifest.json';

// Only approved commissioned projects belong here. Supplied samples stay separate.
export const publishedProjects: Project[] = validateProjects([]);
export const videoSamples = videos;
export const websiteScreens = [
  { image: '/media/website-home.webp', alt: 'AVX Studios home page with Art. Visual. Experience. typography', title: 'The first impression.', label: 'AVX / Home', url: '/home' },
  { image: '/media/website-about.webp', alt: 'AVX Studios About page and the original studio identity', title: 'The thinking behind it.', label: 'AVX / About', url: '/about' },
  { image: '/media/website-services.webp', alt: 'AVX Studios Services page with video and website design panels', title: 'Craft, in every detail.', label: 'AVX / Services', url: '/services' },
];

export const demonstrationProjects: Project[] = validateProjects([
  ...videos.map(video => ({
    id: video.id, slug: video.id, title: video.title, category: 'Video Editing' as const,
    description: video.description, thumbnail: video.thumbnail, previewVideo: video.previewVideo,
    fullVideoUrl: video.fullVideoUrl, services: video.services, featured: true, gallery: [], status: 'demo' as const,
  })),
  {
    id: 'avx-web-experience', slug: 'avx-web-experience', title: 'A studio. An experience.', category: 'Websites',
    description: 'Our own corner of the internet. An AVX studio project bringing oversized typography, responsive layouts, and interactive motion together. Three views of one connected website: the studio you are visiting.',
    thumbnail: websiteScreens[0].image, websiteUrl: '/home',
    services: ['Art direction', 'Web design', 'React development', 'Interaction design'],
    featured: true, gallery: websiteScreens.map(({ image, alt }) => ({ src: image, alt })),
    highlights: ['An interactive Grainient surface', 'Dedicated pages with accessible navigation', 'Video and website carousels, tuned for each medium'], status: 'demo',
  },
]);

export const allProjects = validateProjects([...publishedProjects, ...demonstrationProjects]);
const firstVideo = videos[0];
export const showreel = {
  title: 'AVX / Motion study', label: 'Studio demo · 00:14', isDemo: true,
  poster: firstVideo.thumbnail, preview: firstVideo.previewVideo, video: firstVideo.fullVideoUrl,
};
