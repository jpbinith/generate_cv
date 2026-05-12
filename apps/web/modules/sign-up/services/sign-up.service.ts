import type {
  SignUpErrorResponse,
  SignUpFormValues,
  SignUpSuccessResponse,
} from "../types/sign-up.types";

const DEFAULT_API_BASE_URL = "http://localhost:4000";

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
  const response = await fetch(`${getApiBaseUrl()}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (response.ok) {
    return (await response.json()) as SignUpSuccessResponse;
  }

  const errorResponse = (await safeParseJson(
    response,
  )) as SignUpErrorResponse | null;

  throw new SignUpRequestError(
    errorResponse?.error ?? "Unable to create account right now.",
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
