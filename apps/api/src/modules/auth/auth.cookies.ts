import type { Response } from "express";
import { env } from "../../config/env.js";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "./auth.constants.js";
import type { AuthTokens } from "./types/auth.types.js";

export function setAuthCookies(
  response: Response,
  tokens: AuthTokens,
): void {
  response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.cookieSecure,
    path: "/",
    maxAge: env.accessTokenTtlMinutes * 60 * 1000,
  });

  response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.cookieSecure,
    path: "/",
    maxAge: env.refreshTokenTtlDays * 24 * 60 * 60 * 1000,
    expires: tokens.refreshTokenExpiresAt,
  });
}

export function clearAuthCookies(response: Response): void {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: env.cookieSecure,
    path: "/",
  };

  response.clearCookie(ACCESS_TOKEN_COOKIE_NAME, cookieOptions);
  response.clearCookie(REFRESH_TOKEN_COOKIE_NAME, cookieOptions);
}
