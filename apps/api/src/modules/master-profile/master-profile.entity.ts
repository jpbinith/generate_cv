import type { ObjectId } from "mongodb";

export interface MasterProfilePersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface MasterProfileSkills {
  languages: string[];
  frontend: string[];
  backend: string[];
  ai: string[];
  cloud: string[];
  databases: string[];
  tools: string[];
}

export interface MasterProfileExperienceItem {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  bullets: string[];
  technologies?: string[];
}

export interface MasterProfileProjectItem {
  name: string;
  description: string;
  bullets: string[];
  technologies: string[];
  link?: string;
}

export interface MasterProfileEducationItem {
  degree: string;
  institution: string;
  location?: string;
  startDate?: string;
  endDate?: string;
}

export interface MasterProfile {
  _id: ObjectId;
  userId: ObjectId;
  personalInfo: MasterProfilePersonalInfo;
  summary: string;
  skills: MasterProfileSkills;
  experience: MasterProfileExperienceItem[];
  projects: MasterProfileProjectItem[];
  education: MasterProfileEducationItem[];
  certifications: string[];
  createdAt: Date;
  updatedAt: Date;
}
