import type {
  MasterProfile,
  MasterProfileEducationItem,
  MasterProfileExperienceItem,
  MasterProfilePersonalInfo,
  MasterProfileResearchPublicationItem,
  MasterProfileSkillGroup,
} from "../master-profile.entity.js";

export type SaveMasterProfileInput = {
  personalInfo: MasterProfilePersonalInfo;
  summarySuggestion: string;
  professionalSummary: string;
  workExperience: MasterProfileExperienceItem[];
  education: MasterProfileEducationItem[];
  researchPublications: MasterProfileResearchPublicationItem[];
  skillGroups: MasterProfileSkillGroup[];
};

export type SaveMasterProfileResult = {
  masterProfile: MasterProfile;
};

export type GetMasterProfileResult = {
  masterProfile: MasterProfile | null;
};
