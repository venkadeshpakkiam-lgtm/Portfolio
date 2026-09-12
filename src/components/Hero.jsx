import React, { useRef } from 'react';
import defaultProfilePhoto from '../assets/profile.jpg';
import { personalInfo } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { LinkedinIcon } from './SocialIcons';
import { 
  Camera, 
  Trash2, 
  Upload, 
  MapPin, 
  Mail, 
  ArrowDown, 
  FileDown, 
  Eye, 
  Sparkles, 
  Code, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2 
} from 'lucide-react';

export const Hero = () => {
  const { 
    profilePhoto, 
    updateProfilePhoto, 
    removeProfilePhoto, 
    openResumeModal, 
    showToast,
    customResume,
    resumeDownloadUrl,
    resumeFileName
  } = usePortfolio();
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      showToast('error', 'File Too Large', 'Please select an image smaller than 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        updateProfilePhoto(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute top-10 left-10 w-[300px] h-[200px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Intro Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-wide shadow-sm shadow-emerald-500/10 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Hi, I'm <br className="hidden sm:inline" />
                <span className="gradient-text">{personalInfo.name}</span>
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-lg sm:text-xl font-medium text-slate-300">
                <span className="text-emerald-400">{personalInfo.roleTitle}</span>
                <span className="text-slate-600 hidden sm:inline">&bull;</span>
                <span className="text-cyan-400">{personalInfo.roleSubtitle}</span>
              </div>
            </div>

            {/* Location & Quick Bio */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {personalInfo.careerObjective}
            </p>

            {/* Location & Contact Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.location}</span>
              </div>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn Profile</span>
              </a>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.email}</span>
              </a>
            </div>

            {/* Action Buttons Group */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Explore Projects */}
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {/* Get in Touch */}
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/40 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Get in Touch</span>
                <Mail className="w-4 h-4 text-emerald-400" />
              </a>

              {/* Download Resume (Active File) */}
              <a
                href={resumeDownloadUrl}
                download={resumeFileName}
                className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group"
                title={`Download ${resumeFileName}`}
              >
                <FileDown className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Resume ({customResume ? customResume.fileExtension : 'PDF'})</span>
              </a>

              {/* Preview Resume Modal */}
              <button
                onClick={openResumeModal}
                className="p-3 rounded-xl text-slate-400 hover:text-cyan-400 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                title="Interactive Resume Preview"
                aria-label="Preview Resume"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Profile Photo Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              
              {/* Outer Glowing Rings */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-60 blur-xl group-hover:opacity-85 group-hover:blur-2xl transition duration-500"></div>
              
              {/* Avatar Container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-1.5 bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-500 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative flex items-center justify-center border-4 border-slate-900">
                  
                  {/* Use localStorage photo > default static photo > initials fallback */}
                  {profilePhoto || defaultProfilePhoto ? (
                    <img
                      src={profilePhoto || defaultProfilePhoto}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Default Initials Avatar */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0d172e] to-slate-950 text-center select-none p-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center mb-2 shadow-inner">
                        <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-heading">
                          {personalInfo.initials}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-300 font-heading">{personalInfo.name}</span>
                      <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5">CSE &bull; 2023-2027</span>
                    </div>
                  )}

                  {/* Interactive Upload Overlay */}
                  <div 
                    onClick={handleTriggerUpload}
                    className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer text-white p-4"
                  >
                    <div className="p-3 rounded-full bg-emerald-500/30 border border-emerald-400/50 mb-1.5 text-emerald-300">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold">Change Photo</span>
                    <span className="text-[10px] text-slate-300">JPG, PNG, WebP</span>
                  </div>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                id="hero-avatar-upload"
              />

              {/* Floating Badge on Avatar */}
              <div className="absolute -bottom-2 right-4 sm:right-6 bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">Verified Student</span>
              </div>
            </div>

            {/* Avatar Actions Bar */}
            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={handleTriggerUpload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 transition-colors shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profilePhoto ? 'Change Photo' : 'Upload Photo'}</span>
              </button>

              {profilePhoto && (
                <button
                  onClick={removeProfilePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-colors shadow-sm"
                  title="Remove custom photo and reset to VM initials"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-500 mt-2 text-center">
              Photos persist in your browser storage (localStorage)
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="glass-card p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-heading">2023–2027</div>
              <div className="text-xs text-slate-400">B.E. Computer Science</div>
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-heading">2+ Core</div>
              <div className="text-xs text-slate-400">Software Projects</div>
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-heading">4+ Badges</div>
              <div className="text-xs text-slate-400">Certifications & Training</div>
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-heading">100%</div>
              <div className="text-xs text-slate-400">Passion & Agility</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
