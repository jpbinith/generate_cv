import { put } from "@/lib/http-client";
import type { MasterProfileFormData } from "../types/master-profile.types";

interface SaveMasterProfileResponse {
  masterProfile: Record<string, unknown>;
  message: string;
}

export async function saveMasterProfile(
  payload: MasterProfileFormData,
): Promise<SaveMasterProfileResponse> {
  return put<SaveMasterProfileResponse>("/api/master-profile", {
    body: payload,
    credentials: "include",
  });
}
