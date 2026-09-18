import React, { useEffect, useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ToastContainer } from './components/Toast';

export function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || 'home');

  useEffect(() => {
    const handleHashChange = () => {
      const nextPage = window.location.hash.slice(1) || 'home';
      setPage(['home', 'about', 'skills', 'projects', 'contact'].includes(nextPage) ? nextPage : 'home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'about': return <About />;
      case 'skills': return <Skills />;
      case 'projects': return <Projects />;
      case 'contact': return <Contact />;
      default: return <Hero />;
    }
  };

  return (
    <PortfolioProvider>
      <div className="portfolio-canvas min-h-screen bg-[#0d0d0d] text-slate-100 selection:bg-orange-500 selection:text-black font-sans relative">
        {/* Background Grid Accent */}
        <div className="fixed inset-0 bg-grid-pattern opacity-70 pointer-events-none -z-20"></div>

        <div className="portfolio-shell">
          <Navbar />
          <main key={page} className="page-view">{renderPage()}</main>
        </div>

        {/* Interactive Modals & Toast Feedbacks */}
        <ProjectModal />
        <ResumeModal />
        <ToastContainer />
      </div>
    </PortfolioProvider>
  );
}

export default App;
