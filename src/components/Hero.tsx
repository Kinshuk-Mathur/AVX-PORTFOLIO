import { Link } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { MagneticLink } from './UI';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-eyebrow', { opacity: 0, y: 8, duration: 0.6 }, 0.08)
          .from('.hero-line > span', { yPercent: 110, rotate: 2, duration: 1.05, stagger: 0.13 }, 0.2)
          .from('.hero-aside, .hero-bottom', { opacity: 0, y: 16, duration: 0.8, stagger: 0.15 }, 0.8);
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return <section className="hero" id="home" ref={root} aria-labelledby="hero-title">
    <div className="hero-content page-gutter">
      <div className="hero-eyebrow"><span className="status-dot" />AVX STUDIOS — CREATIVE PRODUCTION<span className="hero-edition">INDEPENDENT BY DESIGN.</span></div>
      <div className="hero-main">
        <h1 id="hero-title" aria-label="Art. Visual. Experience.">
          {['ART', 'VISUAL', 'EXPERIENCE'].map(word => <span className="hero-line" key={word} aria-hidden="true"><span>{word}<i>.</i></span></span>)}
        </h1>
        <div className="hero-aside">
          <ArrowUpRight className="hero-arrow" strokeWidth={1} aria-hidden="true" />
          <p>We turn ideas into visuals worth remembering. From captivating video edits to digital experiences that stand apart.</p>
          <span className="mono">VIDEO. MOTION. DIGITAL.</span>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-actions"><MagneticLink href="/video-editing" className="button-white">Explore Our Work</MagneticLink><Link to="/contact" className="text-link">Start a Project <ArrowUpRight size={17} /></Link></div>
        <a className="scroll-cue mono" href="#showreel"><span>SCROLL TO EXPLORE</span><ArrowDown size={20} /></a>
      </div>
    </div>
    <div className="hero-bottom-line" data-atmosphere-end />
  </section>;
}
