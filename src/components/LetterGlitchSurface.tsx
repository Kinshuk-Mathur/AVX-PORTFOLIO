import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useMediaQuery';
import { CarouselBoundary } from './showcase/CarouselBoundary';

const LetterGlitch = lazy(() => import('../vendor/letter-glitch/LetterGlitch'));
const colors = ['#ffffff', '#ff0000'];
const fallbackLine = 'AVX <> ART / VISUAL / EXPERIENCE 01 {} '.repeat(6);

export function LetterGlitchSurface() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const lose = () => setAvailable(false);
    element.addEventListener('webglcontextlost', lose, true);
    return () => element.removeEventListener('webglcontextlost', lose, true);
  }, []);

  return <div ref={root} className="letter-surface" aria-hidden="true">
    <div className="letter-fallback">{Array.from({ length: 48 }, (_, index) => <span key={index}>{fallbackLine}</span>)}</div>
    {!reduced && available && <CarouselBoundary fallback={null}><Suspense fallback={null}>
      <LetterGlitch glitchColors={colors} backgroundColor="#000000" baseOpacity={0.16}
        glitchAmount={0.5} speed={1} flow={0.5} clickEffect="tear" centerFade={0.25}
        edgeFade={0.1} dpr={Math.min(window.devicePixelRatio || 1, 1.5)} />
    </Suspense></CarouselBoundary>}
    <div className="letter-shade" />
  </div>;
}
