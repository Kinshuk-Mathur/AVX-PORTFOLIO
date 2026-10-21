import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Download } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { site } from '../data/site';
import { formatInquiry, inquiryServices, readInquiry } from '../lib/inquiry';
import { MagneticLink, SectionLabel } from './UI';

export function Contact({ primary = false }: { primary?: boolean } = {}) {
  const Heading = primary ? 'h1' : 'h2';
  const form = useRef<HTMLFormElement>(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(false);
  const [params] = useSearchParams();
  const requestedService = params.get('service');
  const initialService = inquiryServices.find(service => service === requestedService) ?? '';
  const netlify = site.netlifyForms && import.meta.env.PROD;
  const mode = netlify ? 'netlify' : site.contactEmail ? 'email' : 'brief';
  const downloadBrief = (text: string) => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AVX-project-brief.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setFeedback('');
    setError(false);
    try {
      if (data.get('company')) throw new Error('Unable to submit this form. Please try again.');
      const inquiry = readInquiry(data);
      // A real native POST reaches Netlify. No client-side fabricated success state.
      if (mode === 'netlify') return;
      event.preventDefault();
      const brief = formatInquiry(inquiry);
      if (mode === 'email') {
        window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(`Project inquiry — ${inquiry.service}`)}&body=${encodeURIComponent(brief)}`;
        setFeedback('Your email draft is ready to open. Send it from your email app to complete your inquiry.');
      } else {
        downloadBrief(brief);
        setFeedback('Your project brief has been downloaded. Nothing has been sent to AVX.');
      }
    } catch (caught) {
      event.preventDefault();
      setError(true);
      setFeedback(caught instanceof Error ? caught.message : 'Please check your details and try again.');
    }
  };

  return <section className="contact section-pad page-gutter" id="contact" aria-labelledby="contact-title">
    <div className="contact-content">
      <SectionLabel number="06">LET’S CREATE TOGETHER</SectionLabel>
      <div className="contact-heading" data-reveal><Heading className="display-heading" id="contact-title">HAVE SOMETHING<br />IN MIND<span className="accent">?</span></Heading>
        <p className="contact-bigline">LET’S MAKE IT REAL<span className="accent">.</span><ArrowUpRight strokeWidth={1.2} /></p></div>
      <span className="atmosphere-end" data-atmosphere-end aria-hidden="true" />
      <div className="contact-grid">
        <div className="contact-intro" data-reveal><p>A video, a website, custom software, or a brand collaboration. Tell us what you’re imagining.</p>
          <MagneticLink href="#inquiry" className="button-white">Start a Project</MagneticLink>
          {site.contactEmail && <a href={`mailto:${site.contactEmail}`} className="contact-email">{site.contactEmail}<ArrowUpRight size={17} /></a>}
          <div className="contact-note"><span className="status-dot" /><p>{mode === 'brief' ? 'A good project starts with a good brief.' : 'Your next idea deserves a conversation.'}</p></div>
        </div>
        <form ref={form} id="inquiry" name="avx-inquiry" method="POST" action="/thank-you/" onSubmit={submit} className="inquiry-form" aria-label="Project inquiry">
          <input type="hidden" name="form-name" value="avx-inquiry" />
          <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="form-row">
            <label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="How should we call you?" required maxLength={100} /></label>
            <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label>
          </div>
          <div className="form-row"><label>What are we creating? <span>*</span><select name="service" required defaultValue={initialService} key={initialService}><option value="" disabled>Select a service</option>{inquiryServices.map(service => <option key={service}>{service}</option>)}</select></label>
            <label>Budget <small>(optional)</small><input name="budget" placeholder="A range is absolutely fine" maxLength={100} /></label></div>
          <label>A little about your idea <span>*</span><textarea name="details" rows={3} placeholder="The idea, the ambition, the details. We’re listening." required minLength={10} maxLength={3000} /></label>
          <p id="submission-note" className="submission-note">{mode === 'netlify'
            ? 'Your name, email, and project details will be sent securely to AVX via Netlify Forms. Please don’t include sensitive information.'
            : mode === 'email' ? 'This opens a draft in your email app. Review it and press send there.'
              : 'Direct inquiries are not connected yet. Prepare and download your brief here; this form does not send your details.'}</p>
          <button type="submit" className="form-submit" aria-describedby="submission-note">{mode === 'brief' ? 'Download Project Brief' : mode === 'email' ? 'Create Email Inquiry' : 'Send Project Inquiry'}{mode === 'brief' ? <Download size={19} /> : <ArrowUpRight size={22} />}</button>
          {feedback && <div className={`form-feedback ${error ? 'is-error' : ''}`} role={error ? 'alert' : 'status'}>{!error && <Check size={18} />}<p>{feedback}</p></div>}
        </form>
      </div>
    </div>
  </section>;
}
