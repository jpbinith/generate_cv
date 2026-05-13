import { z } from "zod";
import { MasterProfileServiceError } from "./master-profile.service.js";

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
  summarySuggestion: z.string().trim(),
  professionalSummary: z.string().trim(),
  workExperience: z.array(workExperienceItemSchema),
  education: z.array(educationItemSchema),
  skillGroups: z.array(skillGroupSchema),
});

export function parseSaveMasterProfileInput(
  payload: Record<string, unknown>,
) {
  const result = saveMasterProfileSchema.safeParse(payload);

  if (result.success) {
    return result.data;
  }

  throw new MasterProfileServiceError(
    "Invalid master profile payload.",
    400,
    {
      error: "Invalid master profile payload.",
      issues: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    },
  );
}
