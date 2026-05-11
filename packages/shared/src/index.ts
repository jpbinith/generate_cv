export type CvExperience = {
  role: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
};

export type CvProject = {
  name: string;
  description?: string;
  technologies?: string[];
  bullets: string[];
};

export type GeneratedCV = {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  skills: string[];
  experience: CvExperience[];
  projects: CvProject[];
  education?: string[];
};