import type { ObjectId } from "mongodb";

export interface JobDescription {
  _id: ObjectId;
  userId: ObjectId;
  companyName?: string;
  jobTitle?: string;
  location?: string;
  jobUrl?: string;
  rawDescription: string;
  extractedSkills: string[];
  extractedKeywords: string[];
  requiredExperience?: string[];
  responsibilities?: string[];
  createdAt: Date;
  updatedAt: Date;
}
