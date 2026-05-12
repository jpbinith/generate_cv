import { HttpClientError, post } from "@/lib/http-client";
import type {
  SignInFormValues,
  SignInSuccessResponse,
} from "../types/sign-in.types";

export class SignInRequestError extends Error {
  readonly fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

export async function signIn(
  values: SignInFormValues,
): Promise<SignInSuccessResponse> {
  try {
    return await post<SignInSuccessResponse>("/auth/sign-in", {
      body: values,
      credentials: "include",
    });
  } catch (error: unknown) {
    if (error instanceof HttpClientError) {
      throw new SignInRequestError(
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
