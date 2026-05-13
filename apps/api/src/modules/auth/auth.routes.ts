import type { Response } from "express";
import { Router } from "express";
import {
  requireRefreshToken,
  type AuthenticatedLocals,
} from "../../middleware/authentication.js";
import { parseSignInInput, parseSignUpInput } from "./auth.schema.js";
import { clearAuthCookies, setAuthCookies } from "./auth.cookies.js";
import {
  refreshAuthSession,
  signIn,
  signOut,
  signUp,
} from "./auth.service.js";

export const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const user = await signUp(parseSignUpInput(req.body));

  res.status(201).json({
    message: "Account created successfully.",
    user,
  });
});

authRouter.post("/sign-in", async (req, res) => {
  const result = await signIn(parseSignInInput(req.body));

  setAuthCookies(res, result.tokens);

  res.status(200).json({
    message: "Signed in successfully.",
    user: result.user,
  });
});

authRouter.post(
  "/refresh",
  requireRefreshToken,
  async (req, res: Response<unknown, AuthenticatedLocals>) => {
    const result = await refreshAuthSession(res.locals.refreshToken);

    setAuthCookies(res, result.tokens);

    res.status(200).json({
      message: "Session refreshed successfully.",
      user: result.user,
    });
  },
);

authRouter.post(
  "/sign-out",
  requireRefreshToken,
  async (req, res: Response<unknown, AuthenticatedLocals>) => {
    await signOut(res.locals.refreshToken);
    clearAuthCookies(res);

    res.status(200).json({
      message: "Signed out successfully.",
    });
  },
);
