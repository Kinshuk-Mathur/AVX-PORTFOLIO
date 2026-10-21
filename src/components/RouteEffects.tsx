import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../data/routes.json';
import { allProjects } from '../data/projects';
import { legacySectionTarget } from '../lib/routes';

export function RouteEffects() {
  const location = useLocation();
  const navigate = useNavigate();
  const first = useRef(true);
  useLayoutEffect(() => {
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      navigate(`${location.pathname.replace(/\/+$/, '')}${location.search}${location.hash}`, { replace: true });
      return;
    }
    // Preserve older shared section and project links.
    const legacy = legacySectionTarget(location.hash);
    if (legacy && legacy !== `${location.pathname}${location.hash}`) {
      navigate(legacy, { replace: true });
      return;
    }
    const route = routes.find(item => item.path === location.pathname);
    const project = location.pathname.startsWith('/work/') ? allProjects.find(item => `/work/${item.slug}` === location.pathname) : undefined;
    const title = project ? `${project.title} — AVX Studios` : route?.title ?? 'Page not found — AVX Studios';
    const description = project?.description ?? route?.description ?? 'Explore AVX Studios.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${new URL(canonical.href).origin}${location.pathname}`;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (canonical && ogUrl) ogUrl.setAttribute('content', canonical.href);
    if (!first.current) document.getElementById('main')?.focus({ preventScroll: true });
    first.current = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.search, location.hash, navigate]);
  return null;
}
