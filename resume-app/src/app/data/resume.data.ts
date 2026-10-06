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
    'Senior Front-End/Angular Developer with 10+ years building enterprise web apps, specializing in Angular v2–v20 modernization, front-end architecture, and AI-enabled UI delivery. ' +
    'Known for leading large-scale migrations, shipping accessible interfaces, and integrating APIs across regulated and data-heavy environments. ' +
    'Recent impact includes Angular upgrades across 100+ screens, Generative AI portals adopted by multiple business teams, and measurable gains in load performance and defect reduction. ' +
    'Mentored engineers and partners cross-functionally using TypeScript, NgRx, AG Grid, Azure OpenAI, AWS, and modern CI/CD practices.',
  experience: [
    {
      title: 'Angular Developer',
      company: 'Ardent Mills',
      arrangement: 'Remote · HonorVet Technologies',
      startDate: '10/2025',
      endDate: '06/2026',
      highlights: [
        'Led migration of two enterprise applications (100+ screens) from Angular v14 to v20, refactoring legacy UI code to MDC and reducing upgrade risk across both platforms.',
        'Built AG Grid interfaces for high-volume enterprise workflows, cutting modal load time by ~20%.',
        'Engineered CSS and component overrides to absorb MDC breaking changes and preserve layout parity across the migrated applications.',
        'Built Azure DevOps CI/CD pipelines supporting weekly sprint deployments to staging/production for both applications.',
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
        'Adopted by seven teams within three months: architected and deployed an enterprise Generative AI portal (Angular, TypeScript, AWS), rolled out to production after v2 in a regulated life sciences environment.',
        'Implemented prompt engineering patterns to improve model reliability and accelerate internal prototyping.',
        'Integrated Angular/Node pipelines with Azure OpenAI, Azure Cognitive Services, Flowise, Neo4j, and GraphQL to deliver AI chat workflows adopted by seven teams.',
        'Engineered Python POCs with Streamlit, Flask, and FastAPI to prototype LLM-backed tools for internal business teams.',
      ],
    },
    {
      title: 'Senior Angular Developer',
      company: 'Dept. of Education',
      arrangement: 'Remote · Innosoft',
      startDate: '06/2023',
      endDate: '09/2023',
      highlights: [
        'Built responsive Angular/TypeScript applications with lazy loading and NgRx, significantly improving app load performance across enterprise UI modules.',
      ],
    },
    {
      title: 'Lead Angular Developer',
      company: 'Bank of America',
      arrangement: 'Remote · InsightGlobal',
      startDate: '04/2022',
      endDate: '11/2022',
      highlights: [
        'Engineered frontend enhancements for Bank of America\'s Erica chatbot and banker-assist application using Angular 12, TypeScript, and WebSockets, improving user interaction and security while reducing defects by ~70%.',
        'Delivered scalable UI with lazy loading, NgRx, and secure REST integrations; mentored juniors and led code reviews.',
      ],
    },
    {
      title: 'Lead Software Developer',
      company: 'Harmony Technology Services',
      arrangement: 'FTE · Remote',
      startDate: '06/2021',
      endDate: '10/2021',
      highlights: [
        'Built front-end mockups and secure REST APIs integrating MS Access/SQL Server layers with role-based form security.',
      ],
    },
    {
      title: 'Front-End Software Developer',
      company: 'Accumen, Inc.',
      arrangement: 'FTE · Onsite',
      site: 'San Diego, CA',
      startDate: '06/2019',
      endDate: '04/2020',
      highlights: [
        'Delivered Angular front-end from Axure UX prototypes and Angular + Tableau visualizations backed by SQL data feeds.',
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
        'Co-engineered pharmacy claims UI and Axure prototypes that seeded an Angular 7 modernization of legacy EFS modules.',
      ],
    },
    {
      title: 'Earlier Front-End & Web Development',
      company: 'Qualcomm · Verizon Networkfleet · S.A.I.C.',
      arrangement: 'Onsite · San Diego, CA',
      highlights: [
        'Delivered front-end UI (ExtJS, AngularJS, HTML5, CSS3) for telecom, fleet-management, and government-contract apps, including responsive redesigns and an AngularJS video-watermarking tool for Qualcomm Legal.',
      ],
    },
  ],
  education: [
    {
      focus: 'Computer Science & Microbiology coursework (no degree)',
      institution: 'University of California - Davis',
      location: 'Davis, CA',
    },
    {
      focus: 'Liberal Arts coursework (no degree)',
      institution: 'Pennsylvania State University',
      location: 'DuBois, PA',
      note: '192 college units completed',
    },
  ],
  skillGroups: [
    {
      category: 'Front-End',
      skills: [
        'Angular (v2–v20)',
        'TypeScript',
        'RxJS',
        'NgRx',
        'REST APIs / GraphQL',
        'Angular Material',
        'AG Grid',
        'WCAG Accessibility',
        'React',
        'JavaScript (ES6+)',
        'HTML5 / CSS3 / SASS',
      ],
    },
    {
      category: 'DevOps & Cloud',
      skills: ['Azure DevOps / CI/CD', 'AWS', 'Azure', 'Git / GitHub / GitLab', 'Docker'],
    },
    {
      category: 'AI & LLM Engineering',
      skills: [
        'Azure OpenAI / OpenAI',
        'Generative AI',
        'Prompt Engineering',
        'Flowise',
        'Agentic Workflows',
        'RAG Concepts',
      ],
    },
    {
      category: 'Back-End & Data',
      skills: ['Node / Express', 'Python', 'Streamlit / Flask / FastAPI', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Testing & Practices',
      skills: ['Jasmine / Karma', 'Cypress / Jest', 'Agile / Scrum', 'Mentoring'],
    },
  ],
  projects: [
    {
      name: 'MEAN-MultiChat',
      stack: 'Angular',
      description:
        'Solves private multi-LLM chat access — Angular/MEAN UI integrating Claude and OpenAI in one conversational workspace.',
      liveUrl: 'https://mean-multichat.onrender.com',
    },
    {
      name: 'MERN-MultiChat',
      stack: 'React',
      description:
        'Solves rapid AI chat prototyping — React/MERN UI with Claude/OpenAI and multi-feature conversational flows.',
      liveUrl: 'https://mern-multichat.onrender.com',
    },
  ],
};
