import React, { createContext, useContext, useState } from 'react';
import { defaultProjects } from '../data/portfolioData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // 1. Profile Photo State with LocalStorage persistence
  const [profilePhoto, setProfilePhoto] = useState(() => {
    try {
      return localStorage.getItem('vm_portfolio_avatar') || null;
    } catch {
      return null;
    }
  });

  // 2. Custom Resume File State (Supports ALL file formats: PDF, DOCX, DOC, TXT, images, etc.)
  const [customResume, setCustomResume] = useState(() => {
    try {
      const saved = localStorage.getItem('vm_portfolio_custom_resume');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 3. Projects State with LocalStorage persistence
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('vm_portfolio_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return defaultProjects;
  });

  // 4. Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // 5. Resume Modal State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // 6. Toast Notification System
  const [toasts, setToasts] = useState([]);

  const showToast = (type = 'success', title, message) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    const newToast = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Profile Photo Handlers
  const updateProfilePhoto = (base64String) => {
    try {
      localStorage.setItem('vm_portfolio_avatar', base64String);
      setProfilePhoto(base64String);
      showToast('success', 'Photo Updated', 'Your profile picture has been saved successfully.');
    } catch (e) {
      console.error('Storage error', e);
      showToast('error', 'Storage Limit Exceeded', 'The image is too large for local browser storage. Please try a smaller image.');
    }
  };

  const removeProfilePhoto = () => {
    try {
      localStorage.removeItem('vm_portfolio_avatar');
      setProfilePhoto(null);
      showToast('info', 'Photo Removed', 'Reverted back to the default initials avatar.');
    } catch (e) {
      console.error(e);
    }
  };

  // Resume File Upload Handler (Supports ALL file formats)
  const uploadResume = (file) => {
    if (!file) return;

    // Check size limit for browser localStorage (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      showToast('error', 'File Too Large', 'Please upload a resume file smaller than 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const fileExt = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      const sizeFormatted = file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

      const resumeData = {
        fileName: file.name,
        fileData: dataUrl,
        fileType: file.type || 'application/octet-stream',
        fileExtension: fileExt,
        fileSize: sizeFormatted,
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };

      try {
        localStorage.setItem('vm_portfolio_custom_resume', JSON.stringify(resumeData));
        setCustomResume(resumeData);
        showToast('success', 'Resume Attached', `"${file.name}" (${fileExt}) has been added successfully!`);
      } catch (err) {
        console.error('Storage error', err);
        showToast('error', 'Storage Full', 'Browser storage is full. Please try a smaller document.');
      }
    };

    reader.onerror = () => {
      showToast('error', 'Upload Failed', 'Failed to read the file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  const resetResume = () => {
    try {
      localStorage.removeItem('vm_portfolio_custom_resume');
      setCustomResume(null);
      showToast('info', 'Resume Reset', 'Reverted to the default official resume.');
    } catch (e) {
      console.error(e);
    }
  };

  // Computed Resume Download URL and Filename
  const resumeDownloadUrl = customResume?.fileData || '/Venkadesh.docx';
  const resumeFileName = customResume?.fileName || 'Venkadesh.docx';

  // Projects CRUD Handlers
  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: 'proj-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem('vm_portfolio_projects', JSON.stringify(updated));
      showToast('success', 'Project Added', `"${newProject.title}" was successfully created.`);
    } catch (e) {
      console.error(e);
      showToast('error', 'Save Failed', 'Could not save project to local storage.');
    }
    setIsProjectModalOpen(false);
  };

  const updateProject = (id, updatedData) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedData, updatedAt: new Date().toISOString() } : p));
    setProjects(updated);
    try {
      localStorage.setItem('vm_portfolio_projects', JSON.stringify(updated));
      showToast('success', 'Project Updated', `Changes to "${updatedData.title}" have been saved.`);
    } catch (e) {
      console.error(e);
      showToast('error', 'Save Failed', 'Could not save project to local storage.');
    }
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const deleteProject = (id) => {
    const projectToDelete = projects.find((p) => p.id === id);
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem('vm_portfolio_projects', JSON.stringify(updated));
      showToast('info', 'Project Deleted', `"${projectToDelete?.title || 'Project'}" has been removed.`);
    } catch (e) {
      console.error(e);
    }
  };

  const resetProjectsToDefault = () => {
    setProjects(defaultProjects);
    try {
      localStorage.setItem('vm_portfolio_projects', JSON.stringify(defaultProjects));
      showToast('success', 'Projects Reset', 'Projects list restored to the original seed data.');
    } catch (e) {
      console.error(e);
    }
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <PortfolioContext.Provider
      value={{
        profilePhoto,
        updateProfilePhoto,
        removeProfilePhoto,
        customResume,
        uploadResume,
        resetResume,
        resumeDownloadUrl,
        resumeFileName,
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjectsToDefault,
        isProjectModalOpen,
        editingProject,
        openAddProjectModal,
        openEditProjectModal,
        closeProjectModal,
        isResumeModalOpen,
        openResumeModal,
        closeResumeModal,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
