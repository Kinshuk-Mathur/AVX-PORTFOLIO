import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProjects } from '../data/projects';
import type { ProjectCategory } from '../lib/content';
import { SectionLabel } from './UI';
import { VideoShowcase } from './showcase/VideoShowcase';
import { WebsiteShowcase } from './showcase/WebsiteShowcase';

const filters = ['All Work', 'Video Editing', 'Websites'] as const;
type Filter = 'All Work' | ProjectCategory;

export function SelectedWork({ primary = false }: { primary?: boolean } = {}) {
  const [filter, setFilter] = useState<Filter>('All Work');
  const Heading = primary ? 'h1' : 'h2';
  const videos = allProjects.filter(project => project.category === 'Video Editing');
  const websites = allProjects.filter(project => project.category === 'Websites');
  const count = (filter !== 'Websites' ? videos.length : 0) + (filter !== 'Video Editing' ? websites.length : 0);
  return <section className="selected-work section-pad page-gutter" id="work" aria-labelledby="work-title">
    <SectionLabel number="02">THE WORK</SectionLabel>
    <div className="work-heading" data-reveal><Heading id="work-title" className="display-heading">SELECTED<br />WORK<span className="accent">.</span></Heading>
      <div className="work-intro"><p>A few things we’ve brought to life.<br /><span className="muted">Every frame. Every interaction.</span></p>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map(value => <button key={value} aria-pressed={filter === value} className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)}>{value}</button>)}
        </div>
      </div>
    </div>
    <p className="collection-caption"><span className="status-dot" />FROM THE STUDIO <span>Studio demos & editing samples. A look at the craft.</span></p>
    <p role="status" className="sr-only">{count} projects shown for {filter}.</p>
    {filter !== 'Websites' && <VideoShowcase projects={videos} />}
    {filter !== 'Video Editing' && <WebsiteShowcase projects={websites} />}
    <div className="work-end"><span>YOUR NEXT PROJECT COULD BE HERE.</span><Link to="/contact" className="text-link">Let’s make something worth showing ↗</Link></div>
  </section>;
}
