import { MongoServerError } from "mongodb";
import type { User } from "../users/user.entity.js";
import { insertUser } from "../users/user.repository.js";
import { hashPassword } from "./password.service.js";
import { signUpSchema } from "./auth.schema.js";
import type { SafeUser, SignUpInput } from "./types/auth.types.js";

export class AuthServiceError extends Error {
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

export async function signUp(payload: unknown): Promise<SafeUser> {
  const input = parseSignUpInput(payload);
  const now = new Date();
  const passwordHash = await hashPassword(input.password);

  try {
    const createdUser = await insertUser({
      name: input.name.trim(),
      email: input.email,
      passwordHash,
      authProvider: "local",
      createdAt: now,
      updatedAt: now,
    });

    return toSafeUser(createdUser);
  } catch (error: unknown) {
    if (isDuplicateEmailError(error)) {
      throw new AuthServiceError(
        "An account with that email already exists.",
        409,
        {
          error: "An account with that email already exists.",
        },
      );
    }

    console.error("Failed to sign up user", error);

    throw new AuthServiceError(
      "Unable to create account right now.",
      500,
      {
        error: "Unable to create account right now.",
      },
    );
  }
}

function parseSignUpInput(payload: unknown): SignUpInput {
  const result = signUpSchema.safeParse(payload);

  if (result.success) {
    return result.data;
  }

  throw new AuthServiceError("Invalid sign-up payload.", 400, {
    error: "Invalid sign-up payload.",
    issues: result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })),
  });
}

function toSafeUser(user: User): SafeUser {
  return {
    id: user._id.toHexString(),
    name: user.name,
    email: user.email,
  };
}

function isDuplicateEmailError(error: unknown): boolean {
  return (
    error instanceof MongoServerError &&
    error.code === 11000 &&
    error.message.includes("email")
  );
}
