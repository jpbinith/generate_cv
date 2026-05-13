import { get, put } from "@/lib/http-client";
import type { MasterProfileFormData } from "../types/master-profile.types";

interface SaveMasterProfileResponse {
  masterProfile: Record<string, unknown>;
  message: string;
}

interface GetMasterProfileResponse {
  masterProfile: MasterProfileFormData | null;
}

export async function fetchMasterProfile(): Promise<GetMasterProfileResponse> {
  return get<GetMasterProfileResponse>("/api/master-profile", {
    credentials: "include",
  });
}

export async function saveMasterProfile(
  payload: MasterProfileFormData,
): Promise<SaveMasterProfileResponse> {
  return put<SaveMasterProfileResponse>("/api/master-profile", {
    body: payload,
    credentials: "include",
  });
}
