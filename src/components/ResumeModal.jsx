import React, { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo, educationData, certificationsData, skillCategories } from '../data/portfolioData';
import { 
  X, 
  FileDown, 
  Printer, 
  ExternalLink, 
  GraduationCap,
  UploadCloud,
  FileText,
  RotateCcw,
  CheckCircle2,
  Paperclip,
  Sparkles
} from 'lucide-react';

export const ResumeModal = () => {
  const { 
    isResumeModalOpen, 
    closeResumeModal, 
    projects,
    customResume,
    uploadResume,
    resetResume,
    resumeDownloadUrl,
    resumeFileName
  } = usePortfolio();

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isResumeModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadResume(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadResume(file);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={closeResumeModal}
    >
      <div 
        className="bg-[#0b101c] border border-slate-800 rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl relative my-6 text-slate-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Resume & Curriculum Vitae
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {personalInfo.name} &bull; Software Engineering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download Action */}
            <a
              href={resumeDownloadUrl}
              download={resumeFileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/20 transition-all"
              title={`Download active file: ${resumeFileName}`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Print Action */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
              title="Print Resume Preview"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={closeResumeModal}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto pr-2 my-4 space-y-6 text-slate-300 text-xs sm:text-sm custom-scrollbar">
          
          {/* 🌟 Resume File Attachment Box (Supports ALL Formats) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Paperclip className="w-4 h-4 text-cyan-400" />
                <span>Active Resume File</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {customResume ? customResume.fileExtension : 'PDF'}
                </span>
              </div>

              {customResume && (
                <button
                  onClick={resetResume}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-400 transition-colors"
                  title="Reset to default resume"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default</span>
                </button>
              )}
            </div>

            {/* Current File Display Card */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">
                    {resumeFileName}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{customResume ? customResume.fileSize : 'Standard Document'}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-400">
                      {customResume ? `Uploaded ${customResume.uploadedAt}` : 'Default Seed File'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumeDownloadUrl}
                  download={resumeFileName}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Drag and Drop / Upload All Format Files Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-emerald-400 bg-emerald-500/10'
                  : 'border-slate-700/80 hover:border-emerald-500/50 bg-slate-950/40 hover:bg-slate-900/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-200">
                  Click to attach or drag & drop your resume file
                </p>
                <p className="text-[11px] text-slate-400">
                  Supports <strong className="text-emerald-400">all file formats</strong> (PDF, DOCX, DOC, TXT, images & more up to 8MB)
                </p>
              </div>
            </div>
          </div>

          {/* Formatted Curriculum Vitae Header */}
          <div className="text-center pb-4 border-b border-slate-800/80 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              {personalInfo.name}
            </h2>
            <p className="text-emerald-400 font-medium text-xs sm:text-sm">
              {personalInfo.roleTitle} | {personalInfo.roleSubtitle}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-slate-400 text-xs pt-1">
              <span>{personalInfo.location}</span>
              <span>&bull;</span>
              <span>{personalInfo.phoneFormatted}</span>
              <span>&bull;</span>
              <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:underline">
                {personalInfo.email}
              </a>
              <span>&bull;</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                {personalInfo.linkedinDisplay}
              </a>
            </div>
          </div>

          {/* Career Objective */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Career Objective
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {personalInfo.careerObjective}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Education
            </h4>
            <div className="space-y-3">
              {educationData.map((edu) => (
                <div key={edu.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white text-xs sm:text-sm">{edu.degree}</span>
                    <span className="text-xs font-mono text-cyan-400">{edu.period}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {edu.institution}, {edu.location} &bull; <span className="text-slate-300 font-semibold">{edu.grade}</span>
                  </div>
                  {edu.highlights && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {edu.highlights.map((h, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Technical Skills
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                  <span className="font-semibold text-white block mb-1">{cat.title}:</span>
                  <span className="text-slate-400">{cat.skills.map((s) => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Key Projects
            </h4>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white text-xs sm:text-sm">{proj.title}</span>
                    <span className="text-[11px] text-cyan-400 font-mono">{proj.category}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  <div className="text-[11px] text-slate-400 pt-1">
                    <strong className="text-slate-300 font-medium">Stack: </strong>
                    {proj.tags?.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Trainings */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Certifications & Trainings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certificationsData.map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                  <span className="font-semibold text-white block">{c.title}</span>
                  <span className="text-slate-400 text-[11px]">{c.organization} ({c.period})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="truncate max-w-[200px] sm:max-w-none">
            Active file: <code className="text-emerald-400 font-mono">{resumeFileName}</code>
          </span>
          <a
            href={resumeDownloadUrl}
            download={resumeFileName}
            className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Download {resumeFileName}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
