import type { ObjectId } from "mongodb";

export interface MasterProfilePersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedInUrl: string;
  githubUrl: string;
  mediumUrl: string;
}

export interface MasterProfileSkillGroup {
  title: string;
  tone: "primary" | "tertiary";
  items: string[];
  addLabel: string;
}

export interface MasterProfileExperienceItem {
  companyName: string;
  roleTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface MasterProfileEducationItem {
  qualification: string;
  institution: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface MasterProfileResearchPublicationItem {
  title: string;
  venue: string;
  publicationDate: string;
  url: string;
  summary: string;
}

export interface MasterProfile {
  _id: ObjectId;
  userId: ObjectId;
  personalInfo: MasterProfilePersonalInfo;
  summarySuggestion: string;
  professionalSummary: string;
  workExperience: MasterProfileExperienceItem[];
  education: MasterProfileEducationItem[];
  researchPublications: MasterProfileResearchPublicationItem[];
  skillGroups: MasterProfileSkillGroup[];
  createdAt: Date;
  updatedAt: Date;
}
