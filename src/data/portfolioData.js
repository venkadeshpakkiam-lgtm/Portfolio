export const personalInfo = {
  name: "Venkadesh M",
  initials: "VM",
  roleTitle: "Computer Science Engineering ",
  roleSubtitle: "Aspiring Software Developer",
  tagline: "Building secure, scalable, and intelligent web applications with modern technologies.",
  location: "Tenkasi, Tamil Nadu, India",
  email: "venkadeshpakkiam@gmail.com",
  phone: "6374579359",
  phoneFormatted: "+91 63745 79359",
  linkedin: "https://www.linkedin.com/in/venkadesh-m-14a318357",
  linkedinDisplay: "linkedin.com/in/venkadesh-m-14a318357",
  github: "https://github.com/venkadeshpakkiam-lgtm",
  careerObjective: "A passionate Computer Science Engineering student looking for an opportunity to start a career in software development, enhance technical knowledge, and contribute effectively to a professional team.",
  availability: "Open to Internships & Entry-Level Roles",
  experienceYears: "Fresher / 2027 Grad",
  educationPeriod: "2023 – 2027",
};

export const educationData = [
  {
    id: "be-cse",
    degree: "B.E. Computer Science and Engineering",
    institution: "JP College of Engineering",
    period: personalInfo.educationPeriod,
    status: "Pursuing (Undergraduate)",
    grade: "Good Academic Standing",
    location: "Tenkasi, Tamil Nadu",
    highlights: ["Data Structures & Algorithms", "Database Management Systems", "Object-Oriented Programming", "Web Application Development", "Final Year API Security Research"]
  },
  {
    id: "hsc-12th",
    degree: "Higher Secondary Education (12th Grade)",
    institution: "Government Higher Secondary School, Urmelazhagian",
    period: "2022 – 2023",
    status: "Completed",
    grade: "74.5%",
    location: "Tenkasi, Tamil Nadu",
    highlights: ["Mathematics", "Computer Science", "Physics", "Chemistry"]
  }
];

export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Java", level: 85, badge: "Core & OOP" },
      { name: "Python", level: 80, badge: "Scripting & AI" },
      { name: "JavaScript", level: 88, badge: "ES6+ & Async" },
      { name: "C", level: 75, badge: "Foundational" },
    ]
  },
  {
    id: "web",
    title: "Web Technologies",
    iconName: "Globe",
    skills: [
      { name: "React.js", level: 88, badge: "Hooks & SPA" },
      { name: "JavaScript (JS)", level: 88, badge: "DOM & Fetch" },
      { name: "HTML5", level: 95, badge: "Semantic & A11y" },
      { name: "CSS3 / Tailwind CSS", level: 90, badge: "Responsive UI" },
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    iconName: "Database",
    skills: [
      { name: "MySQL", level: 82, badge: "Relational & Joins" },
      { name: "SQL", level: 85, badge: "Queries & DDL/DML" },
      { name: "MongoDB", level: 78, badge: "NoSQL & Schemas" },
    ]
  },
  {
    id: "tools",
    title: "Tools & Development",
    iconName: "Wrench",
    skills: [
      { name: "VS Code", level: 92, badge: "Primary IDE" },
      { name: "Antigravity IDE", level: 90, badge: "AI Pair Programming" },
      { name: "Git", level: 85, badge: "Version Control" },
      { name: "GitHub", level: 86, badge: "Collaboration & Repos" },
    ]
  },
  {
    id: "concepts",
    title: "Core CS Concepts",
    iconName: "Layers",
    skills: [
      { name: "Object-Oriented Programming (OOP)", level: 100, badge: "Design Patterns" },
      { name: "DBMS & Normalization", level: 100, badge: "ACID & Schema" },
      { name: "Data Structures", level: 100, badge: "Logic & Problem Solving" },
      { name: "Web Development Architecture", level: 100, badge: "REST & SPA" },
    ]
  }
];

export const defaultProjects = [
  {
    id: "api-security-testing-dashboard",
    title: "API Security Testing Dashboard",
    tagline: "Final-Year Project | Web-based Cybersecurity Tool",
    category: "Cybersecurity / Full Stack",
    description: "A rule-based, web-based cybersecurity tool engineered to test REST APIs for security vulnerabilities (authorized targets only). Incorporates automated security header analysis, authentication and authorization verification, input validation fuzzing, scan history, and visual security score dashboards grounded in OWASP API Security concepts.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "Axios", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "",
    isFeatured: true,
    highlights: [
      "JWT-based secure authentication & session management",
      "Automated OWASP Top 10 API vulnerability checks & header analysis",
      "Interactive Chart.js visual vulnerability reporting dashboard",
      "Historical scan storage with detailed remediation notes"
    ]
  },
  {
    id: "schema-ai-database-intelligence",
    title: "Schema.AI – Database Schema Intelligence Agent",
    tagline: "Database Schema Management & Visualization Tool",
    category: "AI & Database Tools",
    description: "An intelligent database schema visualization and query generation application. Empowers developers to connect to databases, explore entity relationships interactively, inspect table schemas, and generate optimized SQL queries with AI assistance. Built with multi-database compatibility.",
    tags: ["React.js", "Vite", "Tailwind CSS", "JavaScript", "SQL Server", "MySQL", "PostgreSQL", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "",
    isFeatured: true,
    highlights: [
      "Multi-engine support: MySQL, PostgreSQL, SQL Server & MongoDB",
      "Visual entity-relationship (ER) mapping & schema explorer",
      "Automated SQL query formulation & schema optimization suggestions",
      "Lightning-fast client-side introspection with React & Vite"
    ]
  }
];

export const certificationsData = [
  {
    id: "cert-fullstack-internship",
    title: "Full Stack Developer Internship",
    organization: "15 Days Intensive Industry Internship",
    period: "Completed",
    badge: "Internship",
    description: "Completed intensive hands-on full stack development training covering frontend architecture, backend API integration, state management, and practical software engineering workflows.",
    skills: ["Full Stack Development", "React.js", "REST APIs", "Modern Workflow"]
  },
  {
    id: "cert-ebpl",
    title: "EBPL Technical Certification",
    organization: "EBPL Training & Certification",
    period: "Successful Completion",
    badge: "Technical Certificate",
    description: "Successfully completed evaluation and training in industry-grade software practices and core application development.",
    skills: ["Software Best Practices", "Application Development", "Testing"]
  },
  {
    id: "cert-ibm-skillsbuild",
    title: "IBM SkillsBuild Professional Credentials",
    organization: "IBM SkillsBuild",
    period: "Certified",
    badge: "Professional Skills",
    description: "Certified in essential workplace competencies including Communication, Teamwork, Leadership, Agile practices, and Professional Workplace Behaviors.",
    skills: ["Communication", "Teamwork", "Leadership", "Workplace Behaviors"]
  },
  {
    id: "cert-naan-mudhalvan",
    title: "Naan Mudhalvan Program",
    organization: "Tamil Nadu Skill Development Corporation (TNSDC)",
    period: "Certified",
    badge: "Govt. Initiative",
    description: "State-sponsored specialized engineering skill empowerment initiative focused on future-ready technology skills and career readiness.",
    skills: ["Technology Foundations", "Industry Readiness", "Problem Solving"]
  }
];

export const softSkillsData = [
  { name: "Teamwork", icon: "Users", desc: "Collaborative contributor thriving in agile and cross-functional teams" },
  { name: "Leadership", icon: "Award", desc: "Proactive initiative-taker guiding peer discussions and project milestones" },
  { name: "Time Management", icon: "Clock", desc: "Disciplined prioritization ensuring timely project delivery and quality" },
  { name: "Problem Solving", icon: "Lightbulb", desc: "Analytical mindset breaking down complex software requirements" },
  { name: "Quick Learner", icon: "Zap", desc: "Fast adopter of emerging technologies, frameworks, and tools" },
];
