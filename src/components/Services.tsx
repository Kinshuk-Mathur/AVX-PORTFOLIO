import { ArrowUpRight, Braces, Film } from 'lucide-react';
import { SectionLabel } from './UI';

const videoSkills = ['Reels & Shorts', 'YouTube Videos', 'Vlogs', 'Motion Graphics', 'Creator Content', 'Video Clipping'];
const webSkills = ['Creative Landing Pages', 'Business Websites', 'Portfolio Websites', 'E-commerce Websites', 'Interactive Web Experiences'];

export function Services() {
  return <section id="services" className="services section-pad page-gutter" aria-labelledby="services-title">
    <SectionLabel number="03">OUR CAPABILITIES</SectionLabel>
    <div className="heading-row service-heading" data-reveal><h2 className="display-heading" id="services-title">WHAT WE DO<span className="accent">.</span></h2><p>From the first idea<br />to the final frame.</p></div>
    <div className="service-panels">
      <article className="service-panel service-motion" data-reveal>
        <div className="service-art motion-art" aria-hidden="true"><div className="motion-type"><span>MAKE</span><span>IT <i>MOVE.</i></span></div>
          <div className="edit-timeline"><span /><span /><span /><span /><i /></div>
        </div>
        <div className="service-top"><span>01 / VIDEO & MOTION</span><Film size={21} strokeWidth={1.3} /></div>
        <div className="service-content"><h3>Made to<br />move you.</h3><h4>Video Editing & Motion</h4>
          <p>Scroll-stopping visuals, seamless edits, and storytelling designed to keep people watching.</p>
          <ul className="capabilities">{videoSkills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          <a href="#contact" className="service-link">Let’s talk video <ArrowUpRight size={21} /></a>
        </div>
      </article>
      <article className="service-panel service-digital" data-reveal>
        <div className="service-art web-art" aria-hidden="true"><div className="wire-window"><div className="wire-bar"><i /><i /><i /></div><div className="wire-type">BEYOND<br /><span>THE SCREEN.</span></div><div className="wire-lines"><i /><i /><i /></div><ArrowUpRight size={55} strokeWidth={1} /></div></div>
        <div className="service-top"><span>02 / DESIGN & DEVELOPMENT</span><Braces size={22} strokeWidth={1.3} /></div>
        <div className="service-content"><h3>Built to<br />stand apart.</h3><h4>Website Design & Development</h4>
          <p>Modern digital experiences that combine beautiful design, thoughtful interaction, and reliable development.</p>
          <ul className="capabilities">{webSkills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          <a href="#contact" className="service-link">Let’s talk websites <ArrowUpRight size={21} /></a>
        </div>
      </article>
    </div>
  </section>;
}
