import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo, SectionLabel } from './UI';

export function BrandStatement() {
  return <section className="statement section-pad page-gutter" aria-label="Our creative philosophy">
    <SectionLabel>THE AVX EFFECT</SectionLabel>
    <p className="statement-type" aria-label="We don't just make content. We make it felt.">
      <span>{['WE', 'DON’T', 'JUST'].map(word => <span className="statement-word" key={word}>{word} </span>)}</span>
      <span>{['MAKE', 'CONTENT.'].map(word => <span className="statement-word" key={word}>{word} </span>)}</span>
      <span className="statement-last">{['WE', 'MAKE', 'IT', 'FELT.'].map(word => <span className={`statement-word ${word === 'FELT.' ? 'accent' : ''}`} key={word}>{word} </span>)}</span>
    </p>
    <div className="statement-foot"><span>MORE THAN SOMETHING YOU SEE.</span><ArrowUpRight size={36} strokeWidth={1} /><span>SOMETHING YOU REMEMBER.</span></div>
  </section>;
}

const steps = [
  ['Discover', 'Understand the idea, audience, and creative direction.'],
  ['Conceptualize', 'Develop a clear vision, structure, and creative plan.'],
  ['Create', 'Bring the project to life through editing, design, and development.'],
  ['Refine & Deliver', 'Polish the details and deliver the final experience.'],
];

export function Process() {
  return <section className="process section-pad page-gutter" aria-labelledby="process-title">
    <SectionLabel number="04">HOW WE GET THERE</SectionLabel>
    <div className="heading-row" data-reveal><h2 id="process-title" className="display-heading">FROM IDEA<br />TO IMPACT<span className="accent">.</span></h2><p>Good chemistry.<br />A clear process.<br /><span className="muted">Something extraordinary.</span></p></div>
    <div className="process-steps">
      <span className="process-track" aria-hidden="true"><span className="process-progress" /></span>
      <ol>{steps.map(([title, description], index) => <li key={title} data-reveal><span className="process-number">0{index + 1}<i /></span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </div>
  </section>;
}

export function About({ primary = false }: { primary?: boolean } = {}) {
  const Heading = primary ? 'h1' : 'h2';
  return <section className="about section-pad page-gutter" id="about" aria-labelledby="about-title">
    <SectionLabel number="05">MEET THE STUDIO</SectionLabel>
    <div className="about-grid">
      <div className="about-identity" data-mask><Logo /></div>
      <div className="about-copy" data-reveal><Heading className="display-heading" id="about-title">CREATIVITY IS<br />OUR LANGUAGE<span className="accent">.</span></Heading>
        <p>AVX Studios is a creative production studio built around a simple idea: great visuals create lasting experiences.</p>
        <p className="muted">We work across video editing, motion graphics, and modern web development to help creators and brands express their ideas with clarity and impact.</p>
        <Link className="text-link" to="/contact">Good things start with a conversation <ArrowUpRight size={18} /></Link>
      </div>
    </div>
    <span className="atmosphere-end" data-atmosphere-end aria-hidden="true" />
    <div className="values">
      {[
        ['01', 'ART', 'The creative thinking behind every idea.'],
        ['02', 'VISUAL', 'The craft that makes it stand out.'],
        ['03', 'EXPERIENCE', 'The feeling people remember.'],
      ].map(([number, title, description]) => <div className="value" key={title} data-reveal><span className="mono">{number}</span><div><h3>{title}<span className="accent">.</span></h3><p>{description}</p></div></div>)}
    </div>
  </section>;
}
