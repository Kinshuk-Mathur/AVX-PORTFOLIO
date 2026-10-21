import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import type { Service } from '../data/services';

export function ServiceCard({ service, index, onSelect }: {
  service: Service;
  index: number;
  onSelect: (service: Service) => void;
}) {
  const card = useRef<HTMLElement>(null);
  const summary = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const element = card.current;
    const details = summary.current;
    if (!element || !details) return;
    // Measure only on resize/font changes. Hover never changes the card layout.
    const measure = () => {
      element.style.setProperty('--cap-reveal-distance', `${details.offsetHeight}px`);
      const radius = Math.hypot(element.clientWidth - 43, element.clientHeight - 43);
      element.style.setProperty('--cap-fill-size', `${Math.ceil(radius * 2 + 4)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(details);
    return () => observer.disconnect();
  }, []);

  return <article ref={card} className={`cap-card cap-${service.id}`} data-reveal>
    <button className="cap-card-trigger" onClick={() => onSelect(service)} aria-label={`Explore ${service.title}`} aria-haspopup="dialog">
      <span className="cap-index mono">0{index + 1} / AVX</span>
      <span className="cap-expand"><Maximize2 size={20} strokeWidth={1.5} /></span>
      <span className="cap-copy">
        <span className="mono cap-eyebrow">{service.eyebrow}</span>
        <span className="cap-title">{service.title}</span>
        <span ref={summary} className="cap-summary"><span>{service.capabilities.map(capability => <span key={capability}>{capability}</span>)}</span></span>
      </span>
      <span className="cap-discover">Explore service <ArrowUpRight size={17} /></span>
    </button>
  </article>;
}
