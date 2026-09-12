import React from 'react';
import { personalInfo, softSkillsData } from '../data/portfolioData';
import { LinkedinIcon } from './SocialIcons';
import { 
  User, 
  Target, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  Users, 
  Clock, 
  Lightbulb, 
  Zap, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const iconMap = {
  Users: Users,
  Award: Award,
  Clock: Clock,
  Lightbulb: Lightbulb,
  Zap: Zap,
};

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="gradient-text">Venkadesh M</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            An enthusiastic engineer passionate about building reliable software, modern web interfaces, and intelligent tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Career Objective & Personal Info Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Career Objective Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                  Career Objective
                </h3>
              </div>

              <blockquote className="text-slate-300 text-sm sm:text-base leading-relaxed italic border-l-2 border-emerald-500/40 pl-4 py-1">
                "{personalInfo.careerObjective}"
              </blockquote>

              <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Passionate about clean code & scalable architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Proactive collaborator & fast self-directed learner</span>
                </div>
              </div>
            </div>

            {/* Quick Details Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">{personalInfo.location}</div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Email</div>
                  <a 
                    href={`mailto:${personalInfo.email}`} 
                    className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors truncate block mt-0.5"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Mobile</div>
                  <a 
                    href={`tel:${personalInfo.phoneFormatted.replace(/\s+/g, '')}`} 
                    className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors mt-0.5 block"
                  >
                    {personalInfo.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                  <LinkedinIcon className="w-4 h-4 text-teal-400" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">LinkedIn</div>
                  <a 
                    href={personalInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors flex items-center gap-1 mt-0.5 truncate"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400 shrink-0" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Soft Skills & Professional Strengths */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Soft Skills Card */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white font-heading mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Soft Skills & Professional Attributes</span>
              </h3>

              <div className="space-y-3">
                {softSkillsData.map((skill) => {
                  const Icon = iconMap[skill.icon] || Award;
                  return (
                    <div 
                      key={skill.name}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-200">{skill.name}</h4>
                        <p className="text-[11px] text-slate-400">{skill.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
