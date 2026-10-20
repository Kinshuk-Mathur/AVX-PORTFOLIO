import { lazy, Suspense, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '../../lib/content';
import { formatTime, isDirectVideo } from '../../lib/content';
import { videoSamples } from '../../data/projects';
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery';
import { useNearViewport } from '../../hooks/useNearViewport';
import { usePlayer } from '../PlayerProvider';
import { HoverMedia } from '../HoverMedia';
import { CarouselBoundary } from './CarouselBoundary';

const FlexCarousel = lazy(() => import('../../vendor/carousels/FlexCarousel'));

export function VideoShowcase({ projects }: { projects: Project[] }) {
  const play = usePlayer();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const compact = useMediaQuery('(max-width: 767px)');
  const { ref, near } = useNearViewport();
  const [unavailable, setUnavailable] = useState(false);
  const [active, setActive] = useState(0);
  const [selection, setSelection] = useState<{ index: number }>();
  const items = useMemo(() => projects.map(project => ({
    src: project.thumbnail || '/media/og-avx.png', alt: `${project.title} video still`, title: project.title,
  })), [projects]);
  if (!projects.length) return <p className="work-empty">New video stories are taking shape.</p>;
  const current = projects[active] ?? projects[0];
  const sample = videoSamples.find(video => video.id === current.id);
  const open = (project: Project) => {
    if (project.fullVideoUrl && isDirectVideo(project.fullVideoUrl)) {
      play({ title: project.title, src: project.fullVideoUrl, poster: project.thumbnail });
    } else {
      navigate(`/work/${project.slug}`);
    }
  };
  const fallback = <div className="film-fallback" aria-label="Video showcase">
    {projects.map(project => <button key={project.id} onClick={() => open(project)} aria-label={`Play ${project.title}`}>
      <img src={project.thumbnail || '/media/og-avx.png'} alt={`${project.title} video still`} loading="lazy" />
      <span><Play size={15} />{project.title}</span>
    </button>)}
  </div>;
  const select = (index: number) => { setSelection({ index }); };
  return <div className="video-showcase" ref={ref}>
    <div className="showcase-label"><span><i />01 / FILMS & MOTION</span><span>DRAG. DISCOVER. PRESS PLAY.</span></div>
    <div className={`flex-stage ${reduced || unavailable ? 'is-fallback' : ''}`}>
      {near && !reduced && !unavailable ? <CarouselBoundary fallback={fallback}><Suspense fallback={fallback}>
        <FlexCarousel items={items} preset="liquid" intro="rise" cardHeight={compact ? 0.5 : 0.62} gap={18} radius={5}
          bend={0.28} dispersion={0} liquid={0.08} squeeze={0.1} followCursor={false}
          focusOnClick={false} captions={false} autoplay={false} captureWheel={false} selection={selection}
          onChange={index => setActive(index)} onSelect={index => open(projects[index])} onUnavailable={() => setUnavailable(true)} />
      </Suspense></CarouselBoundary> : fallback}
    </div>
    <div className="film-caption">
      <div><span className="mono accent">{sample?.subtitle || current.category}</span><h3>{current.title}</h3><span className="film-duration">{sample ? formatTime(sample.duration) : 'Video project'} <i> / </i>{String(active + 1).padStart(2, '0')}—{String(projects.length).padStart(2, '0')}</span></div>
      <div className="film-actions">
        {!reduced && !unavailable && <div className="carousel-arrows"><button className="icon-button" aria-label="Previous video" onClick={() => select((active - 1 + projects.length) % projects.length)}><ArrowLeft size={20} /></button><button className="icon-button" aria-label="Next video" onClick={() => select((active + 1) % projects.length)}><ArrowRight size={20} /></button></div>}
        <button className="button button-white" onClick={() => open(current)}>{current.fullVideoUrl && isDirectVideo(current.fullVideoUrl) ? 'Play Film' : 'View Project'} <Play size={16} /></button>
        <Link className="text-link" to={`/work/${current.slug}`} aria-label={`View details for ${current.title}`}><ArrowUpRight size={22} /><span className="sr-only">Project details</span></Link>
      </div>
    </div>
    <details className="film-index"><summary>Browse all {projects.length} films <span>+</span></summary>
      <div className="film-index-grid">{projects.map((project, index) => <div className="film-index-item" key={project.id}>
        <button onClick={() => open(project)} aria-label={`Play ${project.title}`}><HoverMedia poster={project.thumbnail} preview={project.previewVideo} alt={`${project.title} video still`} /><span className="film-index-play"><Play size={20} /></span></button>
        <Link to={`/work/${project.slug}`}><span className="mono">{String(index + 1).padStart(2, '0')}</span>{project.title}<ArrowUpRight size={16} /></Link>
      </div>)}</div>
    </details>
  </div>;
}
