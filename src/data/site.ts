const email = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'avxstudios27@gmail.com';

export const site = {
  name: 'AVX Studios',
  contactEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : 'avxstudios27@gmail.com',
  netlifyForms: import.meta.env.VITE_NETLIFY_FORMS_ENABLED === 'true',
  // Add verified public social URLs here. No invented profiles.
  socials: [] as { label: string; url: string }[],
};

export const navigation = [
  { label: 'Home', href: '/home' },
  { label: 'Work', href: '/video-editing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
