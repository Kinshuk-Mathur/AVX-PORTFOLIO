import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { navigation, site } from '../data/site';
import { safeUrl } from '../lib/content';
import { Logo } from './UI';

export function Footer() {
  return <footer className="footer page-gutter">
    <div className="footer-main"><Link to="/home" aria-label="AVX Studios home"><Logo /></Link><p>Art. Visual. Experience.</p>
      <nav aria-label="Footer navigation">{navigation.map(link => <Link to={link.href} key={link.href}>{link.label}</Link>)}</nav>
      <a href="#top" className="back-top" aria-label="Back to top"><ArrowUp size={23} /></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} AVX Studios</span>
      <div><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}<ArrowUpRight size={13} /></a>{site.socials.filter(social => safeUrl(social.url)).map(social => <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={13} /></a>)}</div>
      <span>THOUGHTFULLY CRAFTED. FRAME BY FRAME.</span></div>
  </footer>;
}
