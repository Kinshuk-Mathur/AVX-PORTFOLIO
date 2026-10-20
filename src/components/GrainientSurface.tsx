import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useMediaQuery';

const Grainient = lazy(() => import('../vendor/grainient/Grainient'));
const colors = ['#120f17', '#6e313a', '#ff002c', '#ffffff', '#000000'];

class SurfaceBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function GrainientSurface({ restrained = false }: { restrained?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(!restrained);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { rootMargin: '80px' });
    observer.observe(element);
    const lose = () => setAvailable(false);
    element.addEventListener('webglcontextlost', lose, true);
    return () => {
      observer.disconnect();
      element.removeEventListener('webglcontextlost', lose, true);
    };
  }, []);

  return (
    <div ref={root} className={`grainient-surface ${restrained ? 'grainient-restrained' : ''}`} aria-hidden="true">
      {!reduce && available && visible && (
        <SurfaceBoundary><Suspense fallback={null}>
          <Grainient colors={colors} angle={55} flow={0.8} silk={0.35} grainAmount={0.08}
            speed={restrained ? 0.25 : 0.6} interactive clickSwirl intro={!restrained}
            dpr={Math.min(window.devicePixelRatio || 1, 1.5)} contrast={1.12} />
        </Suspense></SurfaceBoundary>
      )}
      <div className="grainient-shade" />
    </div>
  );
}
