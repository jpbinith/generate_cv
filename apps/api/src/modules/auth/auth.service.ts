import { MongoServerError, ObjectId } from "mongodb";
import { env } from "../../config/env.js";
import {
  findUserByEmail,
  findUserById,
  insertUser,
} from "../users/user.repository.js";
import type { User } from "../users/user.entity.js";
import {
  findActiveRefreshTokenByHash,
  insertRefreshToken,
  revokeRefreshTokenByHash,
  revokeRefreshTokenById,
} from "./refresh-token.repository.js";
import { hashPassword, verifyPassword } from "./password.service.js";
import {
  createAccessToken,
  createRefreshToken,
  hashRefreshToken,
} from "./token.service.js";
import type {
  AuthResult,
  SafeUser,
  SignInInput,
  SignUpInput,
} from "./types/auth.types.js";

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

export async function signUp(input: SignUpInput): Promise<SafeUser> {
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

export async function signIn(input: SignInInput): Promise<AuthResult> {
  const user = await findUserByEmail(input.email);

  if (!user?.passwordHash) {
    throw new AuthServiceError("Invalid email or password.", 401, {
      error: "Invalid email or password.",
    });
  }

  const isPasswordValid = await verifyPassword(
    input.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new AuthServiceError("Invalid email or password.", 401, {
      error: "Invalid email or password.",
    });
  }

  const safeUser = toSafeUser(user);
  const tokens = await issueAuthTokens(safeUser);

  return {
    user: safeUser,
    tokens,
  };
}

export async function refreshAuthSession(
  refreshToken: string | null,
): Promise<AuthResult> {
  if (!refreshToken) {
    throw new AuthServiceError("Refresh token is required.", 401, {
      error: "Refresh token is required.",
    });
  }

  const tokenHash = hashRefreshToken(refreshToken);
  const storedRefreshToken = await findActiveRefreshTokenByHash(tokenHash);

  if (!storedRefreshToken) {
    throw new AuthServiceError("Refresh token is invalid or expired.", 401, {
      error: "Refresh token is invalid or expired.",
    });
  }

  const user = await findUserById(storedRefreshToken.userId.toHexString());

  if (!user) {
    await revokeRefreshTokenById(storedRefreshToken._id);

    throw new AuthServiceError("Refresh token is invalid or expired.", 401, {
      error: "Refresh token is invalid or expired.",
    });
  }

  await revokeRefreshTokenById(storedRefreshToken._id);

  const safeUser = toSafeUser(user);
  const tokens = await issueAuthTokens(safeUser);

  return {
    user: safeUser,
    tokens,
  };
}

export async function signOut(refreshToken: string | null): Promise<void> {
  if (!refreshToken) {
    return;
  }

  await revokeRefreshTokenByHash(hashRefreshToken(refreshToken));
}

function toSafeUser(user: User): SafeUser {
  return {
    id: user._id.toHexString(),
    name: user.name,
    email: user.email,
  };
}

async function issueAuthTokens(user: SafeUser): Promise<AuthResult["tokens"]> {
  const now = new Date();
  const refreshToken = createRefreshToken();
  const refreshTokenExpiresAt = new Date(
    Date.now() + env.refreshTokenTtlDays * 24 * 60 * 60 * 1000,
  );

  await insertRefreshToken({
    userId: new ObjectId(user.id),
    tokenHash: hashRefreshToken(refreshToken),
    expiresAt: refreshTokenExpiresAt,
    createdAt: now,
    updatedAt: now,
    revokedAt: null,
  });

  return {
    accessToken: createAccessToken({
      id: user.id,
      email: user.email,
    }),
    refreshToken,
    refreshTokenExpiresAt,
  };
}

function isDuplicateEmailError(error: unknown): boolean {
  return (
    error instanceof MongoServerError &&
    error.code === 11000 &&
    error.message.includes("email")
  );
}
