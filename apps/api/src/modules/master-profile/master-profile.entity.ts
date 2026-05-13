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
}

export interface MasterProfile {
  _id: ObjectId;
  userId: ObjectId;
  personalInfo: MasterProfilePersonalInfo;
  emailHelperText: string;
  summarySuggestion: string;
  professionalSummary: string;
  workExperience: MasterProfileExperienceItem[];
  education: MasterProfileEducationItem[];
  skillGroups: MasterProfileSkillGroup[];
  autosaveLabel: string;
  createdAt: Date;
  updatedAt: Date;
}
