import { upsertMasterProfileByUserId } from "./master-profile.repository.js";
import { saveMasterProfileSchema } from "./master-profile.schema.js";
import type { SaveMasterProfileInput, SaveMasterProfileResult } from "./types/master-profile.types.js";

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
  payload: unknown,
  userId: string,
): Promise<SaveMasterProfileResult> {
  const input = parseSaveMasterProfileInput(payload);
  const masterProfile = await upsertMasterProfileByUserId(userId, input);

  return { masterProfile };
}

function parseSaveMasterProfileInput(payload: unknown): SaveMasterProfileInput {
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
