export interface NavigationItem {
  label: string;
  icon: string;
  active?: boolean;
}

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
}

export interface WorkExperienceItem {
  companyName: string;
  roleTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  period: string;
}

export interface SkillGroup {
  title: string;
  tone: "primary" | "tertiary";
  items: string[];
  addLabel: string;
}

export interface MasterProfileViewModel {
  navigationItems: NavigationItem[];
  topBarTitle: string;
  progressOverview: ProgressOverview;
  personalInfo: PersonalInfo;
  emailHelperText: string;
  summarySuggestion: string;
  professionalSummary: string;
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  skillGroups: SkillGroup[];
  autosaveLabel: string;
}
