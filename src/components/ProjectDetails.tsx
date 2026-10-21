import { ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '../lib/content';
import { isDirectVideo } from '../lib/content';
import { Link } from 'react-router-dom';

export function ProjectContent({ project, onPlay }: { project: Project; onPlay: (project: Project) => void }) {
  return <div className="project-detail">
      <span className="mono accent">{project.status === 'demo' ? 'STUDIO DEMO / EDITING SAMPLE' : 'SELECTED WORK'}</span>
      <h1>{project.title}</h1>
      {project.thumbnail && <img className="detail-cover" src={project.thumbnail} alt={`${project.title} project preview`} />}
      <div className="detail-body"><div><h2>The idea</h2><p>{project.description}</p>
        {project.highlights && <><h2>The details</h2><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></>}
      </div><dl><dt>Services</dt><dd>{project.services.join(' / ') || project.category}</dd>
        {project.client && <><dt>Client</dt><dd>{project.client}</dd></>}
        {project.year && <><dt>Year</dt><dd>{project.year}</dd></>}
        <dt>Project</dt><dd>{project.status === 'demo' ? 'Studio experiment' : 'Published work'}</dd>
      </dl></div>
      <div className="detail-actions">
        {project.fullVideoUrl && (isDirectVideo(project.fullVideoUrl)
          ? <button className="button button-white" onClick={() => onPlay(project)}>Play Film <Play size={17} /></button>
          : <a className="button button-white" href={project.fullVideoUrl} target="_blank" rel="noopener noreferrer">Watch Project <ArrowUpRight size={18} /></a>)}
        {project.websiteUrl && <a className="button button-white" href={project.websiteUrl} target="_blank" rel="noopener noreferrer">Visit Website <ArrowUpRight size={18} /></a>}
        <Link className="text-link" to="/contact">Have something in mind? ↗</Link>
      </div>
      {project.gallery.filter(image => image.src !== project.thumbnail).map(image => <img key={image.src} className="detail-gallery" src={image.src} alt={image.alt} loading="lazy" />)}
    </div>;
}
