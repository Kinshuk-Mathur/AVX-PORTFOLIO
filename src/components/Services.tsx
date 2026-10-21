import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services, type Service } from '../data/services';
import { Modal } from './Modal';
import { SectionLabel } from './UI';
import { ServiceCard } from './ServiceCard';

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null);
  return <section id="services" className="capabilities-section section-pad page-gutter" aria-labelledby="services-title">
    <SectionLabel number="02">WHAT WE BRING TO THE TABLE</SectionLabel>
    <div className="capabilities-heading" data-reveal><span className="capabilities-pill">OUR SERVICES</span>
      <h2 id="services-title">Big ideas.<br className="mobile-break" /> <span>Meet your makers.</span></h2>
      <p>From the first cut to the next big collaboration.<br />A creative partner, from idea to impact.</p>
    </div>
    <div className="capabilities-grid">
      {services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} onSelect={setSelected} />)}
    </div>
    <div className="capabilities-end"><p>One idea. The right mix of creative, digital, and connection.</p><Link to="/contact" className="text-link">Find your starting point <ArrowUpRight size={18} /></Link></div>
    {selected && <Modal title={selected.title} className="service-modal" onClose={() => setSelected(null)}>
      <div className="service-detail"><span className="mono accent">{selected.eyebrow}</span><h2>{selected.title}</h2><p>{selected.description}</p>
        <ul>{selected.capabilities.map(item => <li key={item}>{item}</li>)}</ul>
        <div className="service-detail-actions"><Link to={`/contact?service=${encodeURIComponent(selected.inquiry)}`} onClick={() => setSelected(null)} className="button button-white">Let’s make it happen <ArrowUpRight size={18} /></Link>
          {selected.workPath && <Link to={selected.workPath} onClick={() => setSelected(null)} className="text-link">Explore the work <ArrowUpRight size={18} /></Link>}</div>
      </div>
    </Modal>}
  </section>;
}
