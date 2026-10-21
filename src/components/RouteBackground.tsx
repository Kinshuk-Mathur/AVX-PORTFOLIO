import { lazy, Suspense, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useMediaQuery';
import { GrainientSurface } from './GrainientSurface';
import { CarouselBoundary } from './showcase/CarouselBoundary';

const ShapeWaves = lazy(() => import('../vendor/shape-waves/ShapeWaves'));

function WebsiteBackground() {
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  return <div className="shape-surface" data-background-state={reduced || failed ? 'static' : 'animated'}>
    {!reduced && !failed && <CarouselBoundary fallback={null}><Suspense fallback={null}>
      <ShapeWaves shapes="mixed" color="#ff002c" hoverColor="#ffffff" backgroundColor="#000000"
        cellSize={12} dotSize={0.75} speed={0.6} brightness={0.38} glow={0.15}
        scale={1.1} fade={0.25} interactive intro onError={error => {
          if (import.meta.env.DEV) console.warn('[AVX Shape Waves]', error.message);
          setFailed(true);
        }} />
    </Suspense></CarouselBoundary>}
    <div className="shape-shade" />
  </div>;
}

// One GPU atmosphere at a time, shared by the layout across route transitions.
export function RouteBackground() {
  const { pathname } = useLocation();
  const websites = pathname === '/websites';
  return <div className={`route-atmosphere ${websites ? 'route-waves' : 'route-grainient'}`} aria-hidden="true">
    {websites ? <WebsiteBackground /> : <GrainientSurface />}
  </div>;
}
