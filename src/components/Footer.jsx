import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ArrowUp, Mail, Phone, Heart, Code2 } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080f] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1.5px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-xs">
                  VM
                </div>
              </div>
              <span className="font-heading font-bold text-lg text-white">
                {personalInfo.name}
              </span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Computer Science Engineering Student & Aspiring Software Developer based in Tenkasi, Tamil Nadu, India. Passionate about building robust web applications and securing modern software systems.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${personalInfo.phoneFormatted.replace(/\s+/g, '')}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition-colors">Home / Hero</a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">About & Objective</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-emerald-400 transition-colors">Technical Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects Showcase</a>
              </li>
              <li>
                <a href="#education" className="hover:text-emerald-400 transition-colors">Education Timeline</a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-emerald-400 transition-colors">Certifications</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Form</a>
              </li>
            </ul>
          </div>

          {/* Resources & Back to top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Resources
              </h4>
              <ul className="space-y-2 text-xs text-slate-400 mt-2">
                <li>
                  <a
                    href="/resume.pdf"
                    download="Venkadesh_M_Resume.pdf"
                    className="hover:text-emerald-400 transition-colors font-medium"
                  >
                    Download Resume PDF
                  </a>
                </li>
                <li>
                  <span className="text-slate-500">JP College of Engineering (2023–2027)</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all text-xs font-semibold shadow-sm"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with modern React &amp; Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
