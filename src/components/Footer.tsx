import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { navigation, site } from '../data/site';
import { safeUrl } from '../lib/content';
import { Logo } from './UI';

export function Footer() {
  return <footer className="footer page-gutter">
    <div className="footer-main"><a href="#home" aria-label="AVX Studios home"><Logo /></a><p>Art. Visual. Experience.</p>
      <nav aria-label="Footer navigation">{navigation.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
      <a href="#home" className="back-top" aria-label="Back to top"><ArrowUp size={23} /></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} AVX Studios</span>
      <div>{site.socials.filter(social => safeUrl(social.url)).map(social => <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={13} /></a>)}</div>
      <span>THOUGHTFULLY CRAFTED. FRAME BY FRAME.</span></div>
  </footer>;
}
