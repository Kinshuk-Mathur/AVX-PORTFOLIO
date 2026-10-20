import { Link, useParams } from 'react-router-dom';
import { allProjects } from '../data/projects';
import { ProjectContent } from '../components/ProjectDetails';
import { usePlayer } from '../components/PlayerProvider';
import { NotFoundPage } from './StudioPages';

export function ProjectPage() {
  const { slug } = useParams();
  const project = allProjects.find(item => item.slug === slug);
  const play = usePlayer();
  if (!project) return <NotFoundPage />;
  return <article className="project-page interior-page page-gutter section-pad">
    <Link to="/work" className="text-link">← Back to all work</Link>
    <ProjectContent project={project} onPlay={value => {
      if (value.fullVideoUrl) play({ title: value.title, src: value.fullVideoUrl, poster: value.thumbnail });
    }} />
  </article>;
}
