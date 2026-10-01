import { Resume } from '../models/resume.model';

export const RESUME: Resume = {
  name: 'Paul Welby',
  headline: 'Angular / Front-End / UI Developer',
  contact: {
    email: 'pwelby@gmail.com',
    phone: '(619) 629-3770',
    location: 'Fallbrook, CA 92028',
    links: [
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/paulwelby',
        href: 'https://www.linkedin.com/in/paulwelby',
        icon: 'linkedin',
      },
      {
        label: 'GitHub',
        value: 'github.com/PaulyWolly',
        href: 'https://github.com/PaulyWolly',
        icon: 'github',
      },
      {
        label: 'Portfolio',
        value: 'i-am-paul.netlify.app',
        href: 'https://i-am-paul.netlify.app',
        icon: 'globe',
      },
    ],
  },
  summary:
    'Senior Front-End/Angular Developer with 10+ years of enterprise web application experience and deep Angular work from v2–v20. ' +
    'Known for front-end architecture, UX-focused interface delivery, and AI-enabled UI integration using TypeScript, React, Node, Python, REST APIs, and LLM workflows. ' +
    'AI-assisted development using Cursor and VS Code with Copilot, and prompt engineering skills.',
  experience: [
    {
      title: 'Angular Developer',
      company: 'Ardent Mills',
      arrangement: 'Remote · HonorVet Technologies',
      startDate: '10/2025',
      endDate: '06/2026',
      highlights: [
        'Led the architectural migration of two enterprise web applications - Core and Prism, from Angular v14 to v20, programmatically refactoring the legacy UI codebase to adopt v15 Material Design Components (MDC).',
        'Built and maintained complex, data-heavy enterprise grids with AG Grid (Community and Enterprise)—sorting, filtering, column configuration, and high-volume datasets used across Core and Prism workflows.',
        'Engineered CSS and component overrides to absorb MDC breaking changes and preserve layout parity across the migrated applications.',
        'Integrated .NET v8 services and APIs with RxJS Observables and NgRx state management for Angular front-end data delivery.',
        'Built Azure DevOps CI/CD pipelines for Core and Prism supporting weekly sprint deployments to staging/production.',
      ],
    },
    {
      title: 'Angular Developer · Generative AI',
      company: 'ThermoFisher Scientific',
      arrangement: 'Hybrid · InsightGlobal',
      site: 'Carlsbad, CA',
      startDate: '11/2023',
      endDate: '05/2025',
      highlights: [
        'Architected and deployed an enterprise Generative AI portal using Angular, TypeScript, and AWS for secure employee access to LLMs in a regulated life sciences environment, adopted by 7 teams within the first 3 months.',
        'Engineered Python POCs with Streamlit, Flask, and FastAPI to prototype LLM-backed tools for internal business teams.',
        'Implemented prompt engineering patterns (system/user instructions, chain-of-thought, iterative refinement) to improve model reliability and accelerate internal prototyping.',
        'Integrated Angular/Node pipelines with Azure Cognitive Services, Azure OpenAI, and OpenAI LLMs; built Flowise agentic workflows and Neo4j/GraphQL NLP chatflows.',
        'Developed PostgreSQL and MongoDB-backed data layers behind secure REST APIs (Multer image storage) for Generative AI portal features.',
      ],
    },
    {
      title: 'Senior Angular Developer',
      company: 'Dept. of Education',
      arrangement: 'Remote · Innosoft',
      startDate: '06/2023',
      endDate: '09/2023',
      highlights: [
        'Built responsive Angular/TypeScript applications with component-based design, lazy loading, and NgRx state management.',
        'Delivered accessible, cross-browser UI and contributed in Agile/Scrum ceremonies to accelerate sprint delivery.',
      ],
    },
    {
      title: 'Lead Angular Developer',
      company: 'Bank of America',
      arrangement: 'Remote · InsightGlobal',
      startDate: '04/2022',
      endDate: '11/2022',
      highlights: [
        'Engineered front-end enhancements for Bank of America\'s Erica chatbot and banker-assist application using Angular 12, TypeScript, and WebSockets, facilitating faster user interaction and stronger security.',
        'Architected scalable UI with lazy loading, code splitting, NgRx, and secure REST integrations; mentored juniors and led code reviews.',
      ],
    },
    {
      title: 'Lead Software Developer, SQL Developer',
      company: 'Harmony Technology Services',
      arrangement: 'FTE · Remote',
      startDate: '06/2021',
      endDate: '10/2021',
      highlights: [
        'Built front-end mockups and VBA layers integrating MS Access with SQL Server; wrote high-performance SQL and stored procedures.',
        'Implemented secure REST APIs and role-based form security for front-end/back-end data exchange.',
      ],
    },
    {
      title: 'Front-End Software Developer',
      company: 'Accumen, Inc.',
      arrangement: 'FTE · Onsite',
      site: 'San Diego',
      startDate: '06/2019',
      endDate: '04/2020',
      highlights: [
        'Authored company style guide and delivered Angular front-end from Axure UX prototypes (HTML5/CSS3/JavaScript).',
        'Built Angular + Tableau visualization components backed by PostgreSQL/MySQL/MSSQL data feeds.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Medimpact',
      arrangement: 'Onsite · Apex Systems',
      site: 'San Diego, CA',
      startDate: '10/2017',
      endDate: '03/2019',
      highlights: [
        'Co-engineered pharmacy claims management UI and Axure prototypes that seeded an Angular 7 modernization of legacy EFS modules.',
        'Designed RESTful APIs and data layers for secure, real-time integration across claims workflows.',
      ],
    },
    {
      title: 'Senior Web Developer',
      company: 'S.A.I.C.',
      arrangement: 'Onsite · Volt',
      site: 'San Diego, CA',
      startDate: '06/2016',
      endDate: '11/2016',
      highlights: [
        'Modernized a government-contract app with HTML5/CSS3/Angular/Bootstrap and MongoDB-backed Angular modules.',
      ],
    },
    {
      title: 'Senior Front-End Developer',
      company: 'Verizon Networkfleet',
      arrangement: 'Onsite · The Select Group',
      site: 'San Diego, CA',
      startDate: '06/2015',
      endDate: '12/2015',
      highlights: [
        'Rebranded Networkfleet UI modules and led responsive CSS3 layout work across browsers in two-week Agile sprints.',
      ],
    },
    {
      title: 'Staff Engineer / Programmer Analyst / Web Developer',
      company: 'Qualcomm',
      arrangement: 'Onsite · FTE',
      site: 'San Diego, CA',
      startDate: '12/2009',
      endDate: '10/2014',
      highlights: [
        'Built front-end experiences with HTML5, JavaScript, jQuery, and ExtJS; delivered PHP/SQL services and an AngularJS video-watermarking app for Legal.',
      ],
    },
  ],
  education: [
    {
      focus: 'Computer Science & Microbiology coursework (no degree)',
      institution: 'University of California - Davis',
      location: 'Davis, United States',
      startYear: '1997',
      endYear: '1999',
    },
    {
      focus: 'Liberal Arts coursework (no degree)',
      institution: 'Pennsylvania State University',
      location: 'DuBois, United States',
      startYear: '1980',
      endYear: '1982',
      note: '192 college units completed',
    },
  ],
  skillGroups: [
    {
      category: 'Front-End',
      skills: [
        'Angular (v2–v20)',
        'TypeScript',
        'React',
        'JavaScript (ES6+)',
        'HTML5 / CSS3 / SASS',
        'RxJS / NgRx',
        'Responsive UI',
        'WCAG Accessibility',
        'REST APIs',
        'Angular Material',
        'AG Grid',
      ],
    },
    {
      category: 'Testing & Practices',
      skills: ['Jasmine / Karma', 'Cypress / Jest', 'Agile / Scrum', 'Code Reviews', 'Mentoring'],
    },
    {
      category: 'Back-End & Data',
      skills: [
        'REST APIs / GraphQL',
        'Node / Express',
        'Python',
        'Streamlit / Flask / FastAPI',
        'PostgreSQL',
        'MongoDB',
        'MySQL / MSSQL',
      ],
    },
    {
      category: 'AI & LLM Engineering',
      skills: [
        'Generative AI',
        'Prompt Engineering',
        'OpenAI / Azure OpenAI',
        'Flowise',
        'Agentic Workflows',
        'RAG Concepts',
      ],
    },
    {
      category: 'DevOps & Cloud',
      skills: ['Azure DevOps / CI/CD', 'AWS', 'Azure', 'Git / GitHub / GitLab', 'Docker'],
    },
  ],
  projects: [
    {
      name: 'MEAN-MultiChat',
      stack: 'Angular',
      description: 'Angular + AI chat (MEAN) with Claude/OpenAI',
      liveUrl: 'https://mean-multichat.onrender.com',
    },
    {
      name: 'MERN-MultiChat',
      stack: 'React',
      description: 'React + AI chat (MERN) with Claude/OpenAI',
      liveUrl: 'https://mern-multichat.onrender.com',
    },
  ],
};
