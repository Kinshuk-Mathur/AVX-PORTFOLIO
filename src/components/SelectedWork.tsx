import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { demonstrationProjects, publishedProjects } from '../data/projects';
import type { Project, ProjectCategory } from '../lib/content';
import { useReducedMotion } from '../hooks/useMediaQuery';
import { ProjectCard } from './ProjectCard';
import { SectionLabel } from './UI';

const filters = ['All Work', 'Video Editing', 'Websites'] as const;
type Filter = 'All Work' | ProjectCategory;

export function SelectedWork({ onOpen }: { onOpen: (project: Project) => void }) {
  const [filter, setFilter] = useState<Filter>('All Work');
  const reduce = useReducedMotion();
  const collection = publishedProjects.length ? publishedProjects : demonstrationProjects;
  const filtered = collection.filter(project => filter === 'All Work' || project.category === filter);
  return <section className="selected-work section-pad page-gutter" id="work" aria-labelledby="work-title">
    <SectionLabel number="02">THE WORK</SectionLabel>
    <div className="work-heading" data-reveal><h2 id="work-title" className="display-heading">SELECTED<br />WORK<span className="accent">.</span></h2>
      <div className="work-intro"><p>A few things we’ve brought to life.<br /><span className="muted">Every frame. Every interaction.</span></p>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map(value => <button key={value} aria-pressed={filter === value} className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)}>{value}</button>)}
        </div>
      </div>
    </div>
    {!publishedProjects.length && <p className="collection-caption"><span className="status-dot" />FROM THE STUDIO <span>Self-initiated work & experiments. Client stories coming soon.</span></p>}
    <p role="status" className="sr-only">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'} shown for {filter}.</p>
    <div className="project-grid">
      <AnimatePresence mode="popLayout">
        {filtered.map(project => <motion.div key={project.id} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduce ? 0 : 0.35 }} className={`project-slot ${project.featured ? 'is-featured' : ''}`}>
          <ProjectCard project={project} onOpen={onOpen} />
        </motion.div>)}
      </AnimatePresence>
      {filtered.length === 0 && <div className="work-empty"><p>New {filter.toLowerCase()} stories are taking shape.</p><a className="text-link" href="#contact">Let’s create the next one ↗</a></div>}
    </div>
    <div className="work-end"><span>YOUR NEXT PROJECT COULD BE HERE.</span><a href="#contact" className="text-link">Let’s make something worth showing ↗</a></div>
  </section>;
}
