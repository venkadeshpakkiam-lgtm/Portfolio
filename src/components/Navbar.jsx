import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, FileDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const navLinks = [
  { name: 'Home', href: '#home' }, { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' }, { name: 'Projects', href: '#projects' },
  { name: 'Contact me', href: '#contact' },
];

export const Navbar = () => {
  const { resumeDownloadUrl, resumeFileName } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleHashChange = () => setActiveSection(window.location.hash.slice(1) || 'home');
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    window.location.hash = href.slice(1);
  };

  return (
    <header className="portfolio-nav fixed top-0 z-40 bg-transparent py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#contact" onClick={(event) => handleNavClick(event, '#contact')} className="flex items-center gap-2 px-2 py-2.5 text-xs font-bold text-[#f28a3d] transition-colors hover:text-[#ff9d52] active:text-[#c65a1d] sm:px-3">Hire Me <ArrowUpRight className="h-4 w-4" /></a>
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => <a key={link.name} href={link.href} onClick={(event) => handleNavClick(event, link.href)} className={`nav-link ${activeSection === link.href.slice(1) ? 'nav-link-active' : ''}`}>{link.name}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={resumeDownloadUrl} download={resumeFileName} className="flex items-center gap-1.5 border border-[#4a4a4a] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#d0d0d0] transition-colors hover:border-[#ff6a00] hover:text-[#ff7a00]" title="Download Resume" aria-label="Download Resume">Resume <FileDown className="h-3.5 w-3.5" /></a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="border border-[#3a3a3a] p-2 text-[#ff6a00] lg:hidden" aria-label="Toggle Navigation Menu">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileMenuOpen && <div className="mx-4 mt-4 border border-[#303030] bg-[#151515] p-4 lg:hidden"><nav className="flex flex-col gap-1">{navLinks.map((link) => <a key={link.name} href={link.href} onClick={(event) => handleNavClick(event, link.href)} className={`px-3 py-3 text-sm ${activeSection === link.href.slice(1) ? 'text-[#ff6a00]' : 'text-[#b3b3b3]'}`}>{link.name}</a>)}</nav><a href="#contact" onClick={(event) => handleNavClick(event, '#contact')} className="mt-3 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[#f28a3d] transition-colors hover:text-[#ff9d52] active:text-[#c65a1d]">Hire Me <ArrowUpRight className="h-4 w-4" /></a></div>}
    </header>
  );
};