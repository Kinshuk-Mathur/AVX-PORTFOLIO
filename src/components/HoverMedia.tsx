import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';

let activePreview: HTMLVideoElement | null = null;

export function HoverMedia({ poster, preview, alt, className = '' }: { poster?: string; preview?: string; alt: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failedImage, setFailedImage] = useState(false);
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  const stop = () => {
    video.current?.pause();
    setPlaying(false);
  };
  useEffect(() => {
    const element = root.current;
    const media = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); });
    observer.observe(element);
    const onHidden = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', onHidden);
    document.addEventListener('avx:overlay-open', stop);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onHidden);
      document.removeEventListener('avx:overlay-open', stop);
      media?.pause();
      if (activePreview === media) activePreview = null;
    };
  }, []);
  useEffect(() => { if (reduce) stop(); }, [reduce]);

  const play = () => {
    if (!fine || reduce || !preview) return;
    setLoaded(true);
    const media = video.current;
    if (!media) return;
    if (activePreview && activePreview !== media) activePreview.pause();
    activePreview = media;
    // Set only on intent: the original video is never requested by this preview.
    if (!media.getAttribute('src')) media.src = preview;
    media.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return <div ref={root} className={`hover-media ${className}`} onPointerEnter={play} onPointerLeave={stop}>
    {poster && !failedImage
      ? <img src={poster} alt={alt} loading="lazy" decoding="async" onError={() => setFailedImage(true)} />
      : <div className="media-placeholder" role="img" aria-label={alt}><span>AVX<span className="accent">.</span></span><small>ART. VISUAL. EXPERIENCE.</small></div>}
    {preview && <video ref={video} className={playing ? 'is-playing' : ''} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
      data-loaded={loaded} onPause={() => setPlaying(false)} onError={stop} />}
  </div>;
}
