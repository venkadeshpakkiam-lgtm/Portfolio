import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ToastContainer } from './components/Toast';

export function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans relative">
        {/* Background Grid Accent */}
        <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-20"></div>

        {/* Floating Navigation Header */}
        <Navbar />

        {/* Main Single Page Sections */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals & Toast Feedbacks */}
        <ProjectModal />
        <ResumeModal />
        <ToastContainer />
      </div>
    </PortfolioProvider>
  );
}

export default App;
