import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useScrollMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let lenis: Lenis | undefined;
      let tick: ((time: number) => void) | undefined;
      if (window.matchMedia('(pointer: fine)').matches) {
        lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -88 },
          prevent: () => Boolean(document.querySelector('dialog[open]')),
        });
        lenis.on('scroll', ScrollTrigger.update);
        tick = time => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
      }
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, {
            y: 32, opacity: 0, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
            clearProps: 'transform,opacity',
          });
        });
        gsap.utils.toArray<HTMLElement>('[data-mask]').forEach(element => {
          gsap.from(element, {
            clipPath: 'inset(12% 0 12% 0)', scale: 0.97, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
            clearProps: 'transform,clipPath',
          });
        });
        gsap.fromTo('.statement-word', { opacity: 0.22 }, {
          opacity: 1, stagger: 0.18, ease: 'none',
          scrollTrigger: { trigger: '.statement', start: 'top 78%', end: 'bottom 64%', scrub: 0.5 },
        });
        gsap.fromTo('.process-progress', { scaleX: 0 }, {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: '.process-steps', start: 'top 84%', end: 'bottom 40%', scrub: 0.4 },
        });
      }, root);
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => {
        context.revert();
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    });
    return () => media.revert();
  }, [root]);
}
