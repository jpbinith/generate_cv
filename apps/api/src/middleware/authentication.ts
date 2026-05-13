import type { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../modules/auth/auth.constants.js";
import { readCookieValue } from "../modules/auth/auth-request.utils.js";
import { AuthServiceError } from "../modules/auth/auth.service.js";
import { verifyAccessToken } from "../modules/auth/token.service.js";

export interface AuthenticatedLocals {
  authenticatedUserId: string;
  refreshToken: string;
}

export function requireAccessToken(
  req: Request,
  res: Response<unknown, AuthenticatedLocals>,
  next: NextFunction,
) {
  const accessToken = readCookieValue(
    req.headers.cookie,
    ACCESS_TOKEN_COOKIE_NAME,
  );

  if (!accessToken) {
    next(
      new AuthServiceError("Authentication is required.", 401, {
        error: "Authentication is required.",
      }),
    );
    return;
  }

  let payload: ReturnType<typeof verifyAccessToken>;

  try {
    payload = verifyAccessToken(accessToken);
  } catch {
    next(
      new AuthServiceError("Authentication is invalid.", 401, {
        error: "Authentication is invalid.",
      }),
    );
    return;
  }

  if (!ObjectId.isValid(payload.sub)) {
    next(
      new AuthServiceError("Authentication is invalid.", 401, {
        error: "Authentication is invalid.",
      }),
    );
    return;
  }

  res.locals.authenticatedUserId = payload.sub;
  next();
}

export function requireRefreshToken(
  req: Request,
  res: Response<unknown, AuthenticatedLocals>,
  next: NextFunction,
) {
  const refreshToken = readCookieValue(
    req.headers.cookie,
    REFRESH_TOKEN_COOKIE_NAME,
  );

  if (!refreshToken) {
    next(
      new AuthServiceError("Refresh token is required.", 401, {
        error: "Refresh token is required.",
      }),
    );
    return;
  }

  res.locals.refreshToken = refreshToken;
  next();
}
