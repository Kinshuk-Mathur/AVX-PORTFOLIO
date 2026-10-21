import { lazy, Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../lib/content';
import { useNearViewport } from '../../hooks/useNearViewport';
import { CarouselBoundary } from './CarouselBoundary';

const DepthCarousel = lazy(() => import('../../vendor/carousels/DepthCarousel'));

export function WebsiteShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const { ref, near } = useNearViewport();
  const screens = useMemo(() => projects.map(project => ({
    image: project.thumbnail || '/media/og-avx.png', alt: `${project.title} website preview`,
    title: project.title, label: project.status === 'demo' ? 'AVX / Studio website' : 'Website design & development',
    url: project.websiteUrl, project,
  })), [projects]);
  if (!screens.length) return <p className="work-empty">New website stories are taking shape.</p>;
  const current = screens[active] ?? screens[0];
  const fallback = <img className="website-fallback" src={current.image} alt={current.alt} loading="lazy" />;
  return <div className="website-showcase" ref={ref}>
    <div className="showcase-label"><span><i />02 / DIGITAL EXPERIENCES</span><span>DESIGNED TO BE EXPLORED.</span></div>
    <div className="website-stage">
      <div className="website-stage-type" aria-hidden="true">BEYOND<br /><span>THE FRAME.</span></div>
      {near ? <CarouselBoundary fallback={fallback}><Suspense fallback={fallback}>
        <DepthCarousel items={screens} cardWidth={690} cardHeight={440} radius={8} tint="#120f17" depth={200} spread={125} tilt={15} visibleCards={3} falloff={0.16} blur={0} duration={650} autoplay={false} onChange={index => setActive(index)} />
      </Suspense></CarouselBoundary> : fallback}
    </div>
    <div className="website-caption"><div><span className="mono accent">{current.label}</span><h3>{current.title}</h3><p>{current.project.description}</p></div>
      <div className="website-actions">{current.url && (current.url.startsWith('/') ? <Link className="button button-white" to={current.url}>Explore this page <ArrowUpRight size={18} /></Link> : <a className="button button-white" href={current.url} target="_blank" rel="noopener noreferrer">Visit Website <ArrowUpRight size={18} /></a>)}<Link to={`/work/${current.project.slug}`} className="text-link">View project <ArrowUpRight size={17} /></Link></div>
    </div>
  </div>;
}
