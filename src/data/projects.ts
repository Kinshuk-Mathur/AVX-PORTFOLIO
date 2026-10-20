import { validateProjects, type Project } from '../lib/content';

// Add only approved, real client or studio projects to this collection.
export const publishedProjects: Project[] = validateProjects([]);

// Studio experiments are intentionally separate from commissioned portfolio work.
// The supplied MP4 was approved by the owner for use as a clearly labeled studio demo.
export const demonstrationProjects: Project[] = validateProjects([
  {
    id: 'avx-motion-study',
    slug: 'avx-motion-study',
    title: 'Ideas, set in motion.',
    category: 'Video Editing',
    description: 'A short AVX studio demo exploring animated interfaces, graphic transitions, and the rhythm of a digital product story. An in-house experiment, not a commissioned client project.',
    thumbnail: '/media/avx-demo-poster.webp',
    previewVideo: '/media/avx-demo-preview.mp4',
    fullVideoUrl: '/SHOCASE-VIDEOS/AVX%20SAAS%20V1.mp4',
    services: ['Motion graphics', 'Product storytelling', 'Video editing'],
    featured: true,
    gallery: [],
    highlights: ['Animated interface sequences', 'Graphic transitions and pacing', 'A compact, 14-second visual study'],
    status: 'demo',
  },
  {
    id: 'avx-web-experience',
    slug: 'avx-web-experience',
    title: 'A studio. An experience.',
    category: 'Websites',
    description: 'Our own corner of the internet. An AVX studio project bringing oversized typography, responsive layouts, and interactive motion together. Explore the design direction and the website you are visiting.',
    thumbnail: '/media/avx-website.webp',
    websiteUrl: '/#home',
    services: ['Art direction', 'Web design', 'React development', 'Interaction design'],
    featured: true,
    gallery: [{ src: '/media/avx-website.webp', alt: 'The AVX Studios website, with oversized white typography on an atmospheric red and black background' }],
    highlights: ['An interactive Grainient surface', 'Accessible, responsive compositions', 'A carefully coordinated motion system'],
    status: 'demo',
  },
]);

export const allProjects = validateProjects([...publishedProjects, ...demonstrationProjects]);

// Add an approved showreel here when ready. The demo remains clearly labeled meanwhile.
export const showreel = {
  title: 'AVX / Motion study',
  label: 'Studio demo · 00:14',
  isDemo: true,
  poster: '/media/avx-demo-poster.webp',
  preview: '/media/avx-demo-preview.mp4',
  video: '/SHOCASE-VIDEOS/AVX%20SAAS%20V1.mp4',
};
