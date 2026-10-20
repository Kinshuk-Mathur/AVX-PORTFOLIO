const email = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? '';

export const site = {
  name: 'AVX Studios',
  contactEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '',
  netlifyForms: import.meta.env.VITE_NETLIFY_FORMS_ENABLED === 'true',
  // Add verified public social URLs here. No invented profiles.
  socials: [] as { label: string; url: string }[],
};

export const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
