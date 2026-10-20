import { MagneticLink, SectionLabel } from './UI';

export function PageCTA() {
  return <section className="page-cta page-gutter section-pad">
    <SectionLabel>THE NEXT GOOD THING STARTS HERE</SectionLabel>
    <div className="heading-row"><h2>YOUR IDEA.<br /><span className="accent">OUR NEXT MOVE.</span></h2>
      <MagneticLink href="/contact" className="button-white">Start a Project</MagneticLink>
    </div>
  </section>;
}
