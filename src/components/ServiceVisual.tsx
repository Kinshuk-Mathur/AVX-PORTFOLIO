import { ArrowUpRight, AudioLines, Braces, Play } from 'lucide-react';
import type { Service } from '../data/services';
import { HoverMedia } from './HoverMedia';

export function ServiceVisual({ type }: { type: Service['id'] }) {
  if (type === 'editing') return <div className="cap-visual editing-visual" aria-hidden="true">
    <HoverMedia poster="/media/showcase/avx-motion-study.webp" alt="" />
    <div className="editing-frame"><span>AVX / POST PRODUCTION</span><Play size={34} strokeWidth={1} /><span>STUDIO DEMO</span></div>
    <div className="cap-timeline"><i /><i /><i /><i /><b /></div>
  </div>;
  if (type === 'websites') return <div className="cap-visual websites-visual" aria-hidden="true">
    <span className="web-visual-word">OPEN<br />POSSIBILITIES.</span>
    <div className="cap-browser"><span><i /><i /><i />kapalini.com</span><img src="/media/kapalini.webp" alt="" loading="lazy" width="1280" height="720" /></div>
    <ArrowUpRight className="web-visual-arrow" size={80} strokeWidth={0.8} />
  </div>;
  if (type === 'clipping') return <div className="cap-visual clipping-visual" aria-hidden="true">
    <span className="clip-word">ONE TAKE.<br /><em>MORE STORIES.</em></span>
    <div className="clip-frames"><div><AudioLines /><span>LONG FORM</span></div><div><img src="/media/showcase/playlist-in-motion.webp" alt="" loading="lazy" /><Play size={20} /></div></div>
  </div>;
  if (type === 'software') return <div className="cap-visual software-visual" aria-hidden="true">
    <div className="software-window"><div><span /><span /><span /><Braces size={24} /></div><p>YOUR NEXT<br /><em>BIG BUILD.</em></p><div className="software-modules"><i /><i /><i /></div></div>
  </div>;
  return <div className="cap-visual partnership-visual" aria-hidden="true"><span>BRAND</span><i>×</i><span>CREATOR</span><ArrowUpRight strokeWidth={1} /></div>;
}
