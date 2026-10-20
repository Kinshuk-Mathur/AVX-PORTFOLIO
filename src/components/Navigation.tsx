import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu } from 'lucide-react';
import { navigation } from '../data/site';
import { Logo } from './UI';
import { Modal } from './Modal';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const wide = window.matchMedia('(min-width: 768px)');
    const onWide = () => { if (wide.matches) setOpen(false); };
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('scroll', onScroll);
      wide.removeEventListener('change', onWide);
    };
  }, []);
  return <>
    <header className={`navigation ${scrolled || pathname !== '/home' ? 'navigation-scrolled' : ''}`}>
      <Link to="/home" aria-label="AVX Studios home" className="logo-link"><Logo /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(link => <NavLink key={link.href} to={link.href}>{link.label}<span /></NavLink>)}
      </nav>
      <Link to="/contact" className="nav-cta">Let’s Talk <span><ArrowUpRight size={17} /></span></Link>
      <button className="mobile-toggle icon-button" aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
    </header>
    {open && <Modal title="AVX Studios / Navigation" className="menu-modal" onClose={() => setOpen(false)}>
      <nav aria-label="Mobile navigation" className="mobile-nav">
        {navigation.map((link, index) => <NavLink key={link.href} to={link.href} onClick={() => setOpen(false)}>
          <span className="mono">0{index + 1}</span>{link.label}<ArrowUpRight /></NavLink>)}
      </nav>
      <p className="menu-signoff">ART. VISUAL. EXPERIENCE.</p>
    </Modal>}
  </>;
}
