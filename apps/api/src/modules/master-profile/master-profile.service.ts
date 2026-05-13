import {
  findMasterProfileByUserId,
  upsertMasterProfileByUserId,
} from "./master-profile.repository.js";
import type {
  GetMasterProfileResult,
  SaveMasterProfileInput,
  SaveMasterProfileResult,
} from "./types/master-profile.types.js";

export class MasterProfileServiceError extends Error {
  readonly statusCode: number;
  readonly responseBody: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number,
    responseBody: Record<string, unknown>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

export async function saveMasterProfile(
  input: SaveMasterProfileInput,
  userId: string,
): Promise<SaveMasterProfileResult> {
  const masterProfile = await upsertMasterProfileByUserId(userId, input);

  return { masterProfile };
}

export async function getMasterProfile(
  userId: string,
): Promise<GetMasterProfileResult> {
  const masterProfile = await findMasterProfileByUserId(userId);

  return { masterProfile };
}
