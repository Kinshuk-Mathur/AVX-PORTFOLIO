import { Play, ArrowUpRight } from 'lucide-react';
import { showreel } from '../data/projects';
import { SectionLabel } from './UI';
import { HoverMedia } from './HoverMedia';

export function Showreel({ onPlay }: { onPlay: () => void }) {
  return <section id="showreel" className="showreel section-pad page-gutter" aria-labelledby="showreel-title">
    <div className="showreel-heading" data-reveal>
      <SectionLabel number="01">IN MOTION</SectionLabel>
      <div className="heading-row"><h2 id="showreel-title">GOOD WORK SPEAKS.<br /><span className="muted">GREAT WORK MOVES.</span></h2>
        <p>A little movement.<br />A lasting impression.<ArrowUpRight size={25} aria-hidden="true" /></p></div>
    </div>
    <button className="showreel-frame" onClick={onPlay} aria-label="Play AVX studio demo" data-mask>
      <HoverMedia poster={showreel.poster} preview={showreel.preview} alt="A frame from AVX's animated interface studio demo" />
      <span className="frame-top"><span><i className="status-dot" />AVX / MOTION STUDY</span><span>01 — 00:14</span></span>
      <span className="play-ring"><Play size={29} fill="currentColor" strokeWidth={1} /><span>PLAY FILM</span></span>
      <span className="frame-bottom"><span>A FEEL FOR<br /><strong>WHAT’S NEXT.</strong></span><span className="film-label">{showreel.label}<ArrowUpRight size={19} /></span></span>
    </button>
    <div className="showreel-note"><span>AN AVX STUDIO EXPERIMENT</span><p>A glimpse of our motion language. The full studio showreel is on its way.</p></div>
  </section>;
}
