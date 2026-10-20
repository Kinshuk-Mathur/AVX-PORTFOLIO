import { ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '../lib/content';
import { isDirectVideo } from '../lib/content';
import { Modal } from './Modal';

export function ProjectDetails({ project, onClose, onPlay }: { project: Project; onClose: () => void; onPlay: (project: Project) => void }) {
  return <Modal title={`AVX / ${project.category}`} onClose={onClose} className="project-modal">
    <div className="project-detail">
      <span className="mono accent">{project.status === 'demo' ? 'SELF-INITIATED STUDIO PROJECT' : 'SELECTED WORK'}</span>
      <h2>{project.title}</h2>
      {project.thumbnail && <img className="detail-cover" src={project.thumbnail} alt={`${project.title} project preview`} />}
      <div className="detail-body"><div><h3>The idea</h3><p>{project.description}</p>
        {project.highlights && <><h3>The details</h3><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></>}
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
        <a className="text-link" href="#contact" onClick={onClose}>Have something in mind? ↗</a>
      </div>
      {project.gallery.filter(image => image.src !== project.thumbnail).map(image => <img key={image.src} className="detail-gallery" src={image.src} alt={image.alt} loading="lazy" />)}
    </div>
  </Modal>;
}
