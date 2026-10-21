import type { inquiryServices } from '../lib/inquiry';

type InquiryService = (typeof inquiryServices)[number];
export type Service = {
  id: 'editing' | 'websites' | 'clipping' | 'software' | 'partnerships';
  title: string;
  eyebrow: string;
  description: string;
  capabilities: string[];
  inquiry: InquiryService;
  workPath?: string;
};

export const services: Service[] = [
  {
    id: 'editing', title: 'Video Editing', eyebrow: 'MAKE EVERY FRAME COUNT',
    description: 'Shape your footage into a story people stay for. Thoughtful pacing, sharp sound, and motion that gives every frame a purpose.',
    capabilities: ['YouTube & vlogs', 'Reels & Shorts', 'Motion graphics', 'Sound & colour', 'Animated typography'],
    inquiry: 'Video Editing', workPath: '/video-editing',
  },
  {
    id: 'websites', title: 'Website Building', eyebrow: 'A BETTER FIRST IMPRESSION',
    description: 'Give your brand a home that feels unmistakably yours. We bring design, interaction, and development together in one considered experience.',
    capabilities: ['Brand & business websites', 'Creative landing pages', 'E-commerce', 'Portfolios', 'Responsive development'],
    inquiry: 'Website Development', workPath: '/websites',
  },
  {
    id: 'clipping', title: 'Content Clipping', eyebrow: 'MORE FROM EVERY MOMENT',
    description: 'Turn long-form conversations and recordings into focused, platform-ready clips. Find the hook, keep the context, and make the moment land.',
    capabilities: ['Podcast clips', 'Stream highlights', 'Vertical reframing', 'Captions & hooks'],
    inquiry: 'Content Clipping', workPath: '/video-editing',
  },
  {
    id: 'software', title: 'Custom Web Software', eyebrow: 'BUILT AROUND YOUR BUSINESS',
    description: 'Purpose-built software for the way you work. From a focused internal tool to a customer-facing platform, we turn your workflow into a usable product.',
    capabilities: ['Dashboards & portals', 'Custom web apps', 'Workflow tools', 'Integrations'],
    inquiry: 'Custom Web Software',
  },
  {
    id: 'partnerships', title: 'Brand & Creator Partnerships', eyebrow: 'THE RIGHT PEOPLE. THE RIGHT STORY.',
    description: 'Bring brands and creators together around ideas that fit. We help shape collaborations with a shared creative direction and content made for the audience.',
    capabilities: ['Brand–creator matching', 'Collaboration concepts', 'Campaign coordination', 'Content direction'],
    inquiry: 'Brand & Creator Partnerships',
  },
];
