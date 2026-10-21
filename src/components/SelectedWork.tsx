import { Link, NavLink } from 'react-router-dom';
import { allProjects } from '../data/projects';
import type { ProjectCategory } from '../lib/content';
import { SectionLabel } from './UI';
import { VideoShowcase } from './showcase/VideoShowcase';
import { WebsiteShowcase } from './showcase/WebsiteShowcase';
import { workCategories } from '../lib/routes';

export function SelectedWork({ category }: { category: ProjectCategory }) {
  const projects = allProjects.filter(project => project.category === category);
  const video = category === 'Video Editing';
  return <section className="selected-work section-pad page-gutter" id="work" aria-labelledby="work-title">
    <SectionLabel number="02">THE WORK</SectionLabel>
    <div className="work-heading" data-reveal><h1 id="work-title" className="display-heading">SELECTED<br />WORK<span className="accent">.</span></h1>
      <div className="work-intro"><p>A few things we’ve brought to life.<br /><span className="muted">Every frame. Every interaction.</span></p>
        <nav className="work-filters" aria-label="Work categories">
          {workCategories.map(({ label, path }) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'is-active' : ''}>{label}</NavLink>)}
        </nav>
      </div>
    </div>
    <span className="atmosphere-end" data-atmosphere-end aria-hidden="true" />
    <p className="collection-caption"><span className="status-dot" />{video ? 'FROM THE STUDIO' : 'LIVE ON THE WEB'} <span>{video ? 'Studio demos & editing samples. A look at the craft.' : 'Brand websites, brought to life. Explore them live.'}</span></p>
    {video ? <VideoShowcase projects={projects} /> : <WebsiteShowcase projects={projects} />}
    <div className="work-end"><span>YOUR NEXT PROJECT COULD BE HERE.</span><Link to="/contact" className="text-link">Let’s make something worth showing ↗</Link></div>
  </section>;
}
