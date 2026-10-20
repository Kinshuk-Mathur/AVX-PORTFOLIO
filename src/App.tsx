import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Showreel } from './components/Showreel';
import { SelectedWork } from './components/SelectedWork';
import { Services } from './components/Services';
import { About, BrandStatement, Process } from './components/Studio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetails } from './components/ProjectDetails';
import { Modal } from './components/Modal';
import { allProjects, showreel } from './data/projects';
import type { Project } from './lib/content';
import { useScrollMotion } from './hooks/useScrollMotion';

const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
type Film = { title: string; src: string; poster?: string };

function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [film, setFilm] = useState<Film | null>(null);
  const [unknownProject, setUnknownProject] = useState(false);
  useScrollMotion(root);

  useEffect(() => {
    const readHash = () => {
      const slug = window.location.hash.startsWith('#project/') ? window.location.hash.slice(9) : '';
      const found = allProjects.find(item => item.slug === slug);
      setProject(found ?? null);
      setUnknownProject(Boolean(slug && !found));
      if (!slug) setFilm(null);
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);

  const closeProject = () => {
    setProject(null);
    setUnknownProject(false);
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#work`);
  };
  const openProject = (value: Project) => { window.location.hash = `project/${value.slug}`; };
  const playProject = (value: Project) => {
    if (value.fullVideoUrl) setFilm({ title: value.title, src: value.fullVideoUrl, poster: value.thumbnail });
  };

  return <div ref={root}>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main" tabIndex={-1}>
      <Hero />
      <div className="discipline-strip" aria-label="Our disciplines"><span>VIDEO EDITING</span><i>✳</i><span>MOTION DESIGN</span><i>✳</i><span>WEB EXPERIENCES</span><i>✳</i><span>CREATIVE PRODUCTION</span></div>
      <Showreel onPlay={() => setFilm({ title: showreel.title, src: showreel.video, poster: showreel.poster })} />
      <SelectedWork onOpen={openProject} />
      <Services />
      <BrandStatement />
      <Process />
      <About />
      <Contact />
    </main>
    <Footer />
    {project && !film && <ProjectDetails project={project} onClose={closeProject} onPlay={playProject} />}
    {film && <Suspense fallback={<Modal title="Loading player" onClose={() => setFilm(null)}><p className="loading-player">Preparing your film…</p></Modal>}><VideoPlayer {...film} onClose={() => setFilm(null)} /></Suspense>}
    {unknownProject && <Modal title="Project not found" onClose={closeProject}><div className="project-detail"><h2>This story isn’t here.</h2><p>This project link is no longer available. Explore our selected work instead.</p><button className="button button-white" onClick={closeProject}>Back to Work ↗</button></div></Modal>}
  </div>;
}

export default function App() {
  if (window.location.pathname !== '/') return <main className="not-found"><span className="mono accent">AVX STUDIOS / 404</span><h1>OUT OF<br />FRAME<span className="accent">.</span></h1><p>The page you’re looking for isn’t here.</p><a href="/" className="button button-white">Back to the studio ↗</a></main>;
  return <MotionConfig reducedMotion="user"><Portfolio /></MotionConfig>;
}
