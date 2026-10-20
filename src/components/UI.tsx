import { useRef, type PropsWithChildren, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';

export function Logo({ className = '' }: { className?: string }) {
  return <img className={`logo ${className}`} src="/media/avx-logo.webp" alt="AVX Studios" width="600" height="233" />;
}

export function SectionLabel({ number, children }: PropsWithChildren<{ number?: string }>) {
  return <div className="section-label"><span className="red-line" />{children}{number && <span className="section-number">/{number}</span>}</div>;
}

export function MagneticLink({ children, href, className = '' }: PropsWithChildren<{ href: string; className?: string }>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useMediaQuery('(pointer: fine)');
  const reduce = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });
  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!fine || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  };
  return <motion.a ref={ref} href={href} className={`button ${className}`} style={{ x: sx, y: sy }}
    onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}
    onBlur={() => { x.set(0); y.set(0); }}>
    <span>{children}</span><ArrowUpRight size={18} aria-hidden="true" />
  </motion.a>;
}
