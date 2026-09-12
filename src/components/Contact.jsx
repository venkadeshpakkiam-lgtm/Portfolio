import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { LinkedinIcon } from './SocialIcons';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Loader2, 
  MessageSquareText, 
  ExternalLink 
} from 'lucide-react';

export const Contact = () => {
  const { showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      showToast('info', 'Copied to Clipboard', `Copied ${text}`);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      showToast('info', 'Copied to Clipboard', `Copied ${text}`);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errors.subject = 'Please provide a subject.';
    if (!formData.message.trim()) {
      errors.message = 'Please type your message.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message should be at least 5 characters long.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const triggerDirectMailto = (name, email, subject, message) => {
    const mailtoSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Hi Venkadesh,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`
    );
    window.open(`mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Read environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const isEmailJSConfigured = 
      serviceId && 
      templateId && 
      publicKey && 
      !serviceId.includes('your_') && 
      !publicKey.includes('your_');

    if (isEmailJSConfigured) {
      try {
        const templateParams = {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          to_name: personalInfo.name,
          to_email: personalInfo.email,
        };

        // Real API call via EmailJS
        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        // Confetti celebration
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#38bdf8', '#a7f3d0']
        });

        showToast(
          'success',
          'Message Sent Successfully!',
          `Thank you ${formData.name}, your email was delivered directly to Venkadesh M.`
        );

        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
      } catch (error) {
        console.warn('EmailJS error, falling back to mail client:', error);
        // Fallback gracefully to email client
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        triggerDirectMailto(formData.name, formData.email, formData.subject, formData.message);
        showToast(
          'success',
          'Message Ready!',
          'Opening your email app to complete sending to Venkadesh M.'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Seamless direct send via email client when .env is not yet populated
      setTimeout(() => {
        setIsSubmitting(false);
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#38bdf8', '#a7f3d0']
        });

        triggerDirectMailto(formData.name, formData.email, formData.subject, formData.message);

        showToast(
          'success',
          'Message Created!',
          `Thank you ${formData.name}! Opening your email client to send to ${personalInfo.email}.`
        );

        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
      }, 500);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-slate-950/40">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have an internship opportunity, project collaboration, or question? Feel free to reach out directly or send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Contact Details
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Direct channels for recruitment and professional networking.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Email Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-start justify-between gap-3 group">
                  <div className="flex items-start gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors truncate block mt-0.5"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalInfo.email, 'email')}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-start justify-between gap-3 group">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Phone / Mobile
                      </span>
                      <a
                        href={`tel:${personalInfo.phoneFormatted.replace(/\s+/g, '')}`}
                        className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors block mt-0.5"
                      >
                        {personalInfo.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalInfo.phoneFormatted, 'phone')}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-start justify-between gap-3 group">
                  <div className="flex items-start gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                      <LinkedinIcon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        LinkedIn Profile
                      </span>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-slate-200 hover:text-teal-300 transition-colors truncate flex items-center gap-1 mt-0.5"
                      >
                        <span>{personalInfo.linkedinDisplay}</span>
                        <ExternalLink className="w-3 h-3 text-teal-400 shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Current Location
                    </span>
                    <span className="text-sm font-semibold text-slate-200 block mt-0.5">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

              </div>

              {/* Status Note */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <p className="text-xs text-emerald-300 font-medium">
                  Actively seeking Software Developer &amp; Internship opportunities. Response time usually within 24 hours.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
              
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-bold text-white font-heading">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-400">
                  Send directly to <span className="text-emerald-400">{personalInfo.email}</span>.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500"
                    />
                    {formErrors.name && <p className="text-[11px] text-rose-400">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500"
                    />
                    {formErrors.email && <p className="text-[11px] text-rose-400">{formErrors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Internship Opportunity / Project Collaboration"
                    className="w-full glass-input px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500"
                  />
                  {formErrors.subject && <p className="text-[11px] text-rose-400">{formErrors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Venkadesh, I came across your portfolio and would like to discuss..."
                    className="w-full glass-input px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500 leading-relaxed"
                  />
                  {formErrors.message && <p className="text-[11px] text-rose-400">{formErrors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message Directly</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-slate-500">
                    Direct communication to {personalInfo.email}
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
