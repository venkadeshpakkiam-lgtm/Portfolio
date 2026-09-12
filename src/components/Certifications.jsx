import React from 'react';
import { certificationsData } from '../data/portfolioData';
import { Award, CheckCircle2, ShieldCheck, Sparkles, Building2, Tag } from 'lucide-react';

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 md:py-28 relative">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & <span className="gradient-text">Internships</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Formal recognitions, industry programs, and technical skill certifications acquired during academic progression.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header row with badge and verification icon */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold font-mono">
                    {cert.badge}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{cert.period}</span>
                  </div>
                </div>

                {/* Title and Organization */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{cert.organization}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {cert.description}
                </p>

              </div>

              {/* Skill Tags */}
              <div className="pt-5 mt-5 border-t border-slate-800/70">
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      <Tag className="w-3 h-3 text-cyan-400" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
