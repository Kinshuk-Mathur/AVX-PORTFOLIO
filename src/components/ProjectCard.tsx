import { useRef, type PointerEvent } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import type { Project } from '../lib/content';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';
import { HoverMedia } from './HoverMedia';

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 170, damping: 25 });
  const ry = useSpring(y, { stiffness: 170, damping: 25 });
  const reduce = useReducedMotion();
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const website = project.category === 'Websites';
  function move(event: PointerEvent<HTMLButtonElement>) {
    if (!website || reduce || !fine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(-(event.clientY - rect.top - rect.height / 2) / rect.height * 5);
    y.set((event.clientX - rect.left - rect.width / 2) / rect.width * 5);
  }
  return <article className={`project-card ${website ? 'project-web' : 'project-video'}`}>
    <button ref={ref} className="project-visual" aria-label={`View project: ${project.title}`} onClick={() => onOpen(project)}
      onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <motion.div className={website ? 'browser-frame' : 'video-frame'} style={website ? { rotateX: rx, rotateY: ry } : {}}>
        {website && <div className="browser-toolbar"><span className="browser-dots"><i /><i /><i /></span><span>AVX / DIGITAL EXPERIENCE</span><ArrowUpRight size={12} /></div>}
        <HoverMedia poster={project.thumbnail} preview={project.previewVideo} alt={website ? 'AVX Studios website preview' : 'AVX animated interface motion study'} />
      </motion.div>
      <span className="project-badge">{project.status === 'demo' ? 'STUDIO PROJECT' : project.category.toUpperCase()}</span>
      <span className="project-open">{website ? <ArrowUpRight size={23} /> : <Play size={19} fill="currentColor" />}</span>
      <span className="project-hover-label">{website ? 'EXPLORE THE EXPERIENCE' : 'VIEW THE FILM'} ↗</span>
    </button>
    <div className="project-meta"><div><span className="mono accent">{project.category}</span><h3><button onClick={() => onOpen(project)}>{project.title}</button></h3></div><ArrowUpRight size={25} aria-hidden="true" /></div>
  </article>;
}
