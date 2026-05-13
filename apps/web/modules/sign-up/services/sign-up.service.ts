import { HttpClientError, post } from "@/lib/http-client";
import type {
  SignUpFormValues,
  SignUpSuccessResponse,
} from "../types/sign-up.types";

export class SignUpRequestError extends Error {
  readonly fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

export async function signUp(
  values: SignUpFormValues,
): Promise<SignUpSuccessResponse> {
  try {
    return await post<SignUpSuccessResponse>("/api/auth/sign-up", {
      body: values,
    });
  } catch (error: unknown) {
    if (error instanceof HttpClientError) {
      throw new SignUpRequestError(
        error.message,
        toFieldErrors(error.issues),
      );
    }

    throw error;
  }
}

function toFieldErrors(
  issues: Array<{ field: string; message: string }>,
): Record<string, string> {
  return issues.reduce<Record<string, string>>((errors, issue) => {
    errors[issue.field] = issue.message;
    return errors;
  }, {});
}
