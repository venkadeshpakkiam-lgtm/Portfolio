import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon } from './SocialIcons';
import { 
  X, 
  Save, 
  Image as ImageIcon, 
  ExternalLink, 
  Tag, 
  Upload, 
  Trash2,
  Sparkles
} from 'lucide-react';

export const ProjectModal = () => {
  const { 
    isProjectModalOpen, 
    editingProject, 
    closeProjectModal, 
    addProject, 
    updateProject 
  } = usePortfolio();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Full Stack');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title || '');
      setTagline(editingProject.tagline || '');
      setCategory(editingProject.category || 'Full Stack');
      setDescription(editingProject.description || '');
      setTags(editingProject.tags || []);
      setGithubUrl(editingProject.githubUrl || '');
      setLiveUrl(editingProject.liveUrl || '');
      setImageUrl(editingProject.imageUrl || '');
      setHighlightsInput((editingProject.highlights || []).join('\n'));
    } else {
      // Reset form
      setTitle('');
      setTagline('');
      setCategory('Full Stack');
      setDescription('');
      setTagInput('');
      setTags(['React.js', 'Tailwind CSS']);
      setGithubUrl('');
      setLiveUrl('');
      setImageUrl('');
      setHighlightsInput('');
    }
    setErrors({});
  }, [editingProject, isProjectModalOpen]);

  if (!isProjectModalOpen) return null;

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/,/g, '');
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image should be under 2MB for browser local storage.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      // Compress slightly
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_W = 600;
        let width = img.width;
        let height = img.height;
        if (width > MAX_W) {
          height *= MAX_W / width;
          width = MAX_W;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImageUrl(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Project title is required.';
    if (!description.trim()) newErrors.description = 'Project description is required.';
    if (tags.length === 0) newErrors.tags = 'Please add at least one tech stack tag.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const highlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const projectPayload = {
      title: title.trim(),
      tagline: tagline.trim() || 'Software Project',
      category: category.trim() || 'Full Stack',
      description: description.trim(),
      tags: tags,
      githubUrl: githubUrl.trim() || 'https://github.com',
      liveUrl: liveUrl.trim(),
      imageUrl: imageUrl.trim(),
      highlights: highlights.length > 0 ? highlights : ['Clean Architecture & Modern UI'],
      isFeatured: true,
    };

    if (editingProject) {
      updateProject(editingProject.id, projectPayload);
    } else {
      addProject(projectPayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-[#0c1220] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <p className="text-xs text-slate-400">
                {editingProject ? 'Update project details and tech stack' : 'Add a custom project card persisted in localStorage'}
              </p>
            </div>
          </div>

          <button
            onClick={closeProjectModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cloud Security Dashboard"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500"
              />
              {errors.title && <p className="text-[11px] text-rose-400">{errors.title}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white bg-slate-900"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="AI & Database Tools">AI & Database Tools</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile / Other">Mobile / Other</option>
              </select>
            </div>
          </div>

          {/* Subtitle / Tagline */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Subtitle / One-line Summary</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Rule-based REST API vulnerability testing engine"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Detailed Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the problem solved, core features, architecture, and design principles..."
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500 leading-relaxed"
            />
            {errors.description && <p className="text-[11px] text-rose-400">{errors.description}</p>}
          </div>

          {/* Tech Stack Tags Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Tech Stack Tags <span className="text-rose-400">*</span></span>
              <span className="text-[11px] text-slate-400 font-normal">Press Enter or Comma to add</span>
            </label>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="e.g. React.js, Express, MongoDB"
                className="flex-1 glass-input px-3.5 py-2 rounded-xl text-sm text-white placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => {
                  const trimmed = tagInput.trim().replace(/,/g, '');
                  if (trimmed && !tags.includes(trimmed)) {
                    setTags([...tags, trimmed]);
                    setTagInput('');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Add
              </button>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                >
                  <Tag className="w-3 h-3 text-emerald-400" />
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-400 ml-0.5"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {errors.tags && <p className="text-[11px] text-rose-400">{errors.tags}</p>}
          </div>

          {/* Links: GitHub & Live Demo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="w-full glass-input px-3.5 py-2 rounded-xl text-sm text-white placeholder:text-slate-500 font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Demo URL (Optional)</span>
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://your-demo-app.com"
                className="w-full glass-input px-3.5 py-2 rounded-xl text-sm text-white placeholder:text-slate-500 font-mono text-xs"
              />
            </div>
          </div>

          {/* Optional Thumbnail / Image Upload */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
                <span>Project Thumbnail / Screenshot (Optional)</span>
              </span>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="text-rose-400 text-[11px] hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear Image
                </button>
              )}
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-slate-300 text-xs font-medium flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Choose Image File</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageFileChange}
                accept="image/*"
                className="hidden"
              />

              <span className="text-xs text-slate-400">or paste image URL:</span>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/screenshot.jpg"
                className="flex-1 glass-input px-3 py-1.5 rounded-xl text-xs text-white placeholder:text-slate-500"
              />
            </div>

            {imageUrl && (
              <div className="mt-2 h-28 rounded-xl overflow-hidden border border-slate-800 relative group">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeProjectModal}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
