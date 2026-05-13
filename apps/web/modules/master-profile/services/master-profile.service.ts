import { get, put } from "@/lib/http-client";
import type { MasterProfileFormData } from "../types/master-profile.types";

interface SaveMasterProfileResponse {
  masterProfile: Record<string, unknown>;
  message: string;
}

interface GetMasterProfileResponse {
  masterProfile: MasterProfileFormData | null;
}

function normalizeMasterProfile(
  masterProfile: MasterProfileFormData | null,
): MasterProfileFormData | null {
  if (!masterProfile) {
    return null;
  }

  return {
    ...masterProfile,
    workExperience: masterProfile.workExperience.map((item) => ({
      ...item,
      achievements: item.achievements ?? [],
    })),
    education: masterProfile.education.map((item) => ({
      ...item,
      achievements: item.achievements ?? [],
    })),
    researchPublications: masterProfile.researchPublications ?? [],
    skillGroups: masterProfile.skillGroups.map((group) => ({
      ...group,
      items: group.items ?? [],
    })),
  };
}

export async function fetchMasterProfile(): Promise<GetMasterProfileResponse> {
  const response = await get<GetMasterProfileResponse>("/api/master-profile", {
    credentials: "include",
  });

  return {
    masterProfile: normalizeMasterProfile(response.masterProfile),
  };
}

export async function saveMasterProfile(
  payload: MasterProfileFormData,
): Promise<SaveMasterProfileResponse> {
  return put<SaveMasterProfileResponse>("/api/master-profile", {
    body: payload,
    credentials: "include",
  });
}
