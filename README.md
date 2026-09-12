# Venkadesh M — Personal Portfolio Website

A modern, responsive personal portfolio single-page web application built with **React.js**, **Vite**, and **Tailwind CSS** for **Venkadesh M** (Computer Science Engineering Student & Aspiring Software Developer).

---

## 🚀 Key Features

- **Sleek Dark Glassmorphism UI**: High-fidelity dark theme with glowing Emerald/Cyan accents, subtle background grids, and smooth scroll navigation.
- **Dynamic Project Management (CRUD)**:
  - Default seeded projects: *API Security Testing Dashboard* & *Schema.AI – Database Schema Intelligence Agent*.
  - Add new projects via an interactive modal with tech tags and image support.
  - Edit or delete any project (persisted in browser `localStorage`).
  - One-click "Reset Defaults" option.
- **Profile Photo Customizer**:
  - Circular avatar in the Hero section with fallback initials avatar (`VM`).
  - Upload custom photo with automatic client-side compression and `localStorage` persistence.
  - Instant reset/remove photo action.
- **Real Resume Download (`public/resume.pdf`)**:
  - Direct `<a href="/resume.pdf" download="Venkadesh_M_Resume.pdf">` link in Navbar, Hero, and Resume Modal.
  - Interactive formatted printable preview modal.
- **Real Contact Form via EmailJS**:
  - Direct email dispatch to `venkadeshpakkiam@gmail.com` using `@emailjs/browser`.
  - Form validation, loading state, error handling, and celebratory confetti animation upon successful delivery.
- **Technical Skills Matrix**: Grouped skills (Languages, Web Technologies, Databases, Tools, Core CS) with category filters and progress meters.
- **Education Timeline & Certifications**: Structured milestones for college and high school, plus credential cards for IBM SkillsBuild, Naan Mudhalvan, EBPL, and Internship programs.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, PostCSS, Custom Glassmorphism CSS
- **Icons**: `lucide-react`
- **Email Service**: `@emailjs/browser`
- **Celebration Effects**: `canvas-confetti`
- **Storage**: Browser `localStorage` (No backend required)

---

## 📦 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure EmailJS (Real Contact Form)

To allow visitors to send real emails to your inbox from the contact form:

1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. In the EmailJS Dashboard:
   - **Email Services**: Add a new service (e.g. Gmail connected to `venkadeshpakkiam@gmail.com`) and copy your **Service ID**.
   - **Email Templates**: Create a new template with the following variables:
     - `{{from_name}}` — sender name
     - `{{from_email}}` — sender email
     - `{{subject}}` — message subject
     - `{{message}}` — message body
     - `{{to_name}}` — Venkadesh M
     - Copy your **Template ID**.
   - **Account**: Go to *Account > API Keys* and copy your **Public Key**.
3. Create a `.env` file in the root directory (or copy from `.env.example`):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 3. Real Resume PDF

Place your real resume PDF file at:
```
public/resume.pdf
```
A starter valid PDF is already pre-configured. When you have an updated PDF, simply replace `public/resume.pdf`.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

The production-ready static bundle will be generated in the `dist/` directory, ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 👤 Personal Information Summary

- **Name**: Venkadesh M
- **Title**: Computer Science Engineering Student | Aspiring Software Developer
- **Location**: Tenkasi, Tamil Nadu, India
- **Email**: venkadeshpakkiam@gmail.com
- **Phone**: +91 63745 79359
- **LinkedIn**: [linkedin.com/in/venkadesh-m-14a318357](https://www.linkedin.com/in/venkadesh-m-14a318357)
- **Education**: B.E. Computer Science and Engineering, JP College of Engineering (2023–2027)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
