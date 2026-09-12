import React from 'react';
import { educationData } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle2 } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="py-20 md:py-28 relative bg-slate-950/40">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education <span className="gradient-text">& Learning Journey</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Academic milestones shaping analytical problem solving and software engineering principles.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {educationData.map((item, index) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-[#080c14] border-2 border-emerald-500/60 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Content Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 space-y-4">
                
                {/* Degree & Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                    {item.degree}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold font-mono">
                      {item.status}
                    </span>
                    {item.grade && (
                      <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold font-mono">
                        {item.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Institution, Location, & Timeline */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
                  <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.institution}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Coursework Highlights */}
                {item.highlights && (
                  <div className="pt-3 border-t border-slate-800/70">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Subjects & Coursework:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
