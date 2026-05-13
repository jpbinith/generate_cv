import type { ErrorRequestHandler } from "express";
import { AuthServiceError } from "../modules/auth/auth.service.js";
import { MasterProfileServiceError } from "../modules/master-profile/master-profile.service.js";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  if (error instanceof AuthServiceError) {
    res.status(error.statusCode).json(error.responseBody);
    return;
  }

  if (error instanceof MasterProfileServiceError) {
    res.status(error.statusCode).json(error.responseBody);
    return;
  }

  console.error("Unhandled API error", error);

  res.status(500).json({
    error: "Unexpected server failure.",
  });
};
