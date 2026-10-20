import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Showreel } from '../components/Showreel';
import { SelectedWork } from '../components/SelectedWork';
import { Services } from '../components/Services';
import { About, BrandStatement, Process } from '../components/Studio';
import { Contact } from '../components/Contact';
import { PageCTA } from '../components/PageCTA';
import { usePlayer } from '../components/PlayerProvider';
import { showreel } from '../data/projects';

export function HomePage() {
  const play = usePlayer();
  return <>
    <Hero />
    <div className="discipline-strip" aria-label="Our disciplines"><span>VIDEO EDITING</span><i>✳</i><span>MOTION DESIGN</span><i>✳</i><span>WEB EXPERIENCES</span><i>✳</i><span>CREATIVE PRODUCTION</span></div>
    <Showreel onPlay={() => play({ title: showreel.title, src: showreel.video, poster: showreel.poster })} />
    <SelectedWork />
    <div className="studio-teaser page-gutter section-pad"><span className="mono accent">THE MINDS BEHIND THE MOTION</span><h2>A creative studio.<br />A different perspective.</h2><p>We bring art, visual craft, and digital experiences together.</p><Link className="text-link" to="/about">Get to know AVX ↗</Link><Link className="text-link" to="/services">Explore our services ↗</Link></div>
    <PageCTA />
  </>;
}

export function WorkPage() {
  return <div className="interior-page"><SelectedWork primary /><PageCTA /></div>;
}
export function ServicesPage() {
  return <div className="interior-page"><Services primary /><Process /><PageCTA /></div>;
}
export function AboutPage() {
  return <div className="interior-page"><About primary /><BrandStatement /><PageCTA /></div>;
}
export function ContactPage() {
  return <div className="interior-page"><Contact primary /></div>;
}
export function NotFoundPage() {
  return <div className="not-found"><span className="mono accent">AVX STUDIOS / 404</span><h1>OUT OF<br />FRAME<span className="accent">.</span></h1><p>The page you’re looking for isn’t here.</p><Link to="/home" className="button button-white">Back to the studio ↗</Link></div>;
}
