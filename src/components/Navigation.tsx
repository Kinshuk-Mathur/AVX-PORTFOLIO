import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { navigation } from '../data/site';
import { Logo } from './UI';
import { Modal } from './Modal';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id === 'home' ? '' : `#${entry.target.id}`);
      }
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('#home, #work, #services, #about, #contact').forEach(section => observer.observe(section));
    const wide = window.matchMedia('(min-width: 768px)');
    const onWide = () => { if (wide.matches) setOpen(false); };
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('scroll', onScroll);
      wide.removeEventListener('change', onWide);
      observer.disconnect();
    };
  }, []);
  return <>
    <header className={`navigation ${scrolled ? 'navigation-scrolled' : ''}`}>
      <a href="#home" aria-label="AVX Studios home" className="logo-link"><Logo /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? 'location' : undefined}>{link.label}<span /></a>)}
      </nav>
      <a href="#contact" className="nav-cta">Let’s Talk <span><ArrowUpRight size={17} /></span></a>
      <button className="mobile-toggle icon-button" aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
    </header>
    {open && <Modal title="AVX Studios / Navigation" className="menu-modal" onClose={() => setOpen(false)}>
      <nav aria-label="Mobile navigation" className="mobile-nav">
        {navigation.map((link, index) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
          <span className="mono">0{index + 1}</span>{link.label}<ArrowUpRight /></a>)}
      </nav>
      <p className="menu-signoff">ART. VISUAL. EXPERIENCE.</p>
    </Modal>}
  </>;
}
