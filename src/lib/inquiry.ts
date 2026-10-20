export type Inquiry = { name: string; email: string; service: string; details: string; budget: string };
export const inquiryServices = ['Video Editing', 'Website Development', 'Both'] as const;

export function readInquiry(data: FormData): Inquiry {
  const read = (key: string) => String(data.get(key) ?? '').trim();
  const inquiry = { name: read('name'), email: read('email'), service: read('service'), details: read('details'), budget: read('budget') };
  if (!inquiry.name || inquiry.name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) ||
    !inquiryServices.some(service => service === inquiry.service) || inquiry.details.length < 10 || inquiry.details.length > 3000) {
    throw new Error('Please enter your name, a valid email, a service, and at least 10 characters about your project.');
  }
  return inquiry;
}

export function formatInquiry(inquiry: Inquiry) {
  return `AVX STUDIOS — PROJECT INQUIRY\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nService: ${inquiry.service}\n${inquiry.budget ? `Budget: ${inquiry.budget}\n` : ''}\nTHE IDEA\n${inquiry.details}\n`;
}
