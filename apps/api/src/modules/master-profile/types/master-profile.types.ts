import type {
  MasterProfile,
  MasterProfileEducationItem,
  MasterProfileExperienceItem,
  MasterProfilePersonalInfo,
  MasterProfileSkillGroup,
} from "../master-profile.entity.js";

export type SaveMasterProfileInput = {
  personalInfo: MasterProfilePersonalInfo;
  emailHelperText: string;
  summarySuggestion: string;
  professionalSummary: string;
  workExperience: MasterProfileExperienceItem[];
  education: MasterProfileEducationItem[];
  skillGroups: MasterProfileSkillGroup[];
  autosaveLabel: string;
};

export type SaveMasterProfileResult = {
  masterProfile: MasterProfile;
};
