export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  links: ContactLink[];
}

export interface Job {
  title: string;
  company: string;
  arrangement: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Education {
  focus: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  note?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Resume {
  name: string;
  headline: string;
  contact: ContactInfo;
  summary: string;
  experience: Job[];
  education: Education[];
  skillGroups: SkillGroup[];
}
