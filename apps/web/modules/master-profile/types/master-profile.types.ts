import type { NavigationItem } from "@/components/layout/layout.types";

export interface ProgressOverview {
  completionPercentage: number;
  summary: string;
  tipTitle: string;
  tipText: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedInUrl: string;
  githubUrl: string;
  mediumUrl: string;
}

export interface WorkExperienceItem {
  companyName: string;
  roleTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  achievements: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  achievements: string[];
}

export interface ResearchPublicationItem {
  title: string;
  venue: string;
  publicationDate: string;
  url: string;
  summary: string;
}

export interface SkillGroup {
  title: string;
  tone: "primary" | "tertiary";
  items: string[];
  addLabel: string;
}

export interface MasterProfileFormData {
  personalInfo: PersonalInfo;
  summarySuggestion: string;
  professionalSummary: string;
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  researchPublications: ResearchPublicationItem[];
  skillGroups: SkillGroup[];
}

export interface MasterProfileViewModel extends MasterProfileFormData {
  navigationItems: NavigationItem[];
  topBarTitle: string;
  progressOverview: ProgressOverview;
}
