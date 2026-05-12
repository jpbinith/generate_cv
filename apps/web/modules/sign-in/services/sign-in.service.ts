import type {
  SignInErrorResponse,
  SignInFormValues,
  SignInSuccessResponse,
} from "../types/sign-in.types";

const DEFAULT_API_BASE_URL = "http://localhost:4000";

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
  const response = await fetch(`${getApiBaseUrl()}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  if (response.ok) {
    return (await response.json()) as SignInSuccessResponse;
  }

  const errorResponse = (await safeParseJson(
    response,
  )) as SignInErrorResponse | null;

  throw new SignInRequestError(
    errorResponse?.error ?? "Unable to sign in right now.",
    toFieldErrors(errorResponse?.issues ?? []),
  );
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

function toFieldErrors(
  issues: Array<{ field: string; message: string }>,
): Record<string, string> {
  return issues.reduce<Record<string, string>>((errors, issue) => {
    errors[issue.field] = issue.message;
    return errors;
  }, {});
}

async function safeParseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
