import type {
  MasterProfile,
  MasterProfileEducationItem,
  MasterProfileExperienceItem,
  MasterProfilePersonalInfo,
  MasterProfileSkillGroup,
} from "../master-profile.entity.js";

export type SaveMasterProfileInput = {
  personalInfo: MasterProfilePersonalInfo;
  summarySuggestion: string;
  professionalSummary: string;
  workExperience: MasterProfileExperienceItem[];
  education: MasterProfileEducationItem[];
  skillGroups: MasterProfileSkillGroup[];
};

export type SaveMasterProfileResult = {
  masterProfile: MasterProfile;
};

export type GetMasterProfileResult = {
  masterProfile: MasterProfile | null;
};
