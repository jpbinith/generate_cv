import { z } from "zod";

const personalInfoSchema = z.object({
  fullName: z.string().trim(),
  email: z.email(),
  phone: z.string().trim(),
  linkedInUrl: z.string().trim(),
  githubUrl: z.string().trim(),
  mediumUrl: z.string().trim(),
});

const workExperienceItemSchema = z.object({
  companyName: z.string().trim(),
  roleTitle: z.string().trim(),
  location: z.string().trim(),
  startDate: z.string().trim(),
  endDate: z.string().trim(),
  achievements: z.array(z.string().trim()),
});

const educationItemSchema = z.object({
  qualification: z.string().trim(),
  institution: z.string().trim(),
  startDate: z.string().trim(),
  endDate: z.string().trim(),
});

const skillGroupSchema = z.object({
  title: z.string().trim(),
  tone: z.enum(["primary", "tertiary"]),
  items: z.array(z.string().trim()),
  addLabel: z.string().trim(),
});

export const saveMasterProfileSchema = z.object({
  personalInfo: personalInfoSchema,
  emailHelperText: z.string().trim(),
  summarySuggestion: z.string().trim(),
  professionalSummary: z.string().trim(),
  workExperience: z.array(workExperienceItemSchema),
  education: z.array(educationItemSchema),
  skillGroups: z.array(skillGroupSchema),
  autosaveLabel: z.string().trim(),
});
