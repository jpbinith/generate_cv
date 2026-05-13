import { ObjectId, type Collection, type OptionalId } from "mongodb";
import { getDatabase } from "../../lib/database.js";
import type { MasterProfile } from "./master-profile.entity.js";
import type { SaveMasterProfileInput } from "./types/master-profile.types.js";

const MASTER_PROFILES_COLLECTION_NAME = "master_profiles";

function getMasterProfilesCollection(): Collection<MasterProfile> {
  return getDatabase().collection<MasterProfile>(MASTER_PROFILES_COLLECTION_NAME);
}

export async function upsertMasterProfileByUserId(
  userId: string,
  input: SaveMasterProfileInput,
): Promise<MasterProfile> {
  const userObjectId = new ObjectId(userId);
  const now = new Date();
  const existingProfile = await getMasterProfilesCollection().findOne({
    userId: userObjectId,
  });

  const nextProfile: Omit<MasterProfile, "_id"> = {
    userId: userObjectId,
    personalInfo: input.personalInfo,
    summarySuggestion: input.summarySuggestion,
    professionalSummary: input.professionalSummary,
    workExperience: input.workExperience,
    education: input.education,
    skillGroups: input.skillGroups,
    createdAt: existingProfile?.createdAt ?? now,
    updatedAt: now,
  };

  if (existingProfile) {
    await getMasterProfilesCollection().updateOne(
      { _id: existingProfile._id },
      { $set: nextProfile },
    );

    return {
      _id: existingProfile._id,
      ...nextProfile,
    };
  }

  const result = await getDatabase()
    .collection<OptionalId<MasterProfile>>(MASTER_PROFILES_COLLECTION_NAME)
    .insertOne(nextProfile);

  return {
    _id: result.insertedId,
    ...nextProfile,
  };
}

export async function ensureMasterProfileIndexes(): Promise<void> {
  await getMasterProfilesCollection().createIndex({ userId: 1 }, { unique: true });
}
