import { Router } from "express";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "./auth.constants.js";
import { clearAuthCookies, setAuthCookies } from "./auth.cookies.js";
import { readCookieValue } from "./auth-request.utils.js";
import {
  refreshAuthSession,
  signIn,
  signOut,
  signUp,
} from "./auth.service.js";

export const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const user = await signUp(req.body);

  res.status(201).json({
    message: "Account created successfully.",
    user,
  });
});

authRouter.post("/sign-in", async (req, res) => {
  const result = await signIn(req.body);

  setAuthCookies(res, result.tokens);

  res.status(200).json({
    message: "Signed in successfully.",
    user: result.user,
  });
});

authRouter.post("/refresh", async (req, res) => {
  const refreshToken = readCookieValue(
    req.headers.cookie,
    REFRESH_TOKEN_COOKIE_NAME,
  );
  const result = await refreshAuthSession(refreshToken);

  setAuthCookies(res, result.tokens);

  res.status(200).json({
    message: "Session refreshed successfully.",
    user: result.user,
  });
});

authRouter.post("/sign-out", async (req, res) => {
  const refreshToken = readCookieValue(
    req.headers.cookie,
    REFRESH_TOKEN_COOKIE_NAME,
  );

  await signOut(refreshToken);
  clearAuthCookies(res);

  res.status(200).json({
    message: "Signed out successfully.",
  });
});
