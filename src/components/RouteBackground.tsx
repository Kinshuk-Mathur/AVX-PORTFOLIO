import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GrainientSurface } from './GrainientSurface';
import { LetterGlitchSurface } from './LetterGlitchSurface';

// One GPU atmosphere, bounded by the current page’s upper section.
export function RouteBackground() {
  const { pathname } = useLocation();
  const websites = pathname === '/websites';
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const end = document.querySelector<HTMLElement>('[data-atmosphere-end]');
    const element = root.current;
    const main = document.getElementById('main');
    if (!end || !element || !main) return;
    let mounted = true;
    const measure = () => {
      if (mounted) element.style.height = `${Math.ceil(end.getBoundingClientRect().bottom + window.scrollY)}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(main);
    window.addEventListener('resize', measure, { passive: true });
    document.fonts.ready.then(measure);
    return () => {
      mounted = false;
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pathname]);
  return <div ref={root} className={`route-atmosphere ${websites ? 'route-letters' : 'route-grainient'}`} aria-hidden="true">
    {websites ? <LetterGlitchSurface /> : <GrainientSurface />}
  </div>;
}
