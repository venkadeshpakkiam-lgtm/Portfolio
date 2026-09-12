import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon } from './SocialIcons';
import { 
  FolderGit2, 
  Plus, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Search, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export const Projects = () => {
  const { 
    projects, 
    openAddProjectModal, 
    openEditProjectModal, 
    deleteProject, 
    resetProjectsToDefault 
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Other')))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.tags && project.tags.some((t) => t.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  const handleDeleteConfirm = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This will remove it from your browser storage.`)) {
      deleteProject(id);
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Real-world software engineering applications, cybersecurity tools, and AI database agents. You can also add, edit, or customize projects dynamically.
            </p>
          </div>

          {/* Action Header: Add Project CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={resetProjectsToDefault}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors shadow-sm"
              title="Restore initial seed projects"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={openAddProjectModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-card p-4 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or tech tag..."
              className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-xs text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-slate-800 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">No Projects Found</h4>
            <p className="text-xs text-slate-400 mb-6">
              No project matches your search query. Try clearing your filters or add a new project.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-3xl border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  
                  {/* Optional Project Image Header */}
                  {project.imageUrl && (
                    <div className="h-48 w-full overflow-hidden relative border-b border-slate-800">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] to-transparent opacity-80"></div>
                    </div>
                  )}

                  <div className="p-6 sm:p-8 space-y-5">
                    
                    {/* Top Row: Category Badge & Actions */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        {project.category || 'Software'}
                      </span>

                      {/* Card Edit & Delete Actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditProjectModal(project)}
                          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                          title="Edit this project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteConfirm(project.id, project.title)}
                          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-colors"
                          title="Delete this project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="text-xs sm:text-sm font-medium text-cyan-400/90 mt-1">
                          {project.tagline}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights / Features */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-800/70">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Key Capabilities & Architecture:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 group-hover:border-slate-700 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer: External Links */}
                <div className="p-6 sm:px-8 py-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Preview</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-500 font-mono">
                    Editable &bull; LocalStorage
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
