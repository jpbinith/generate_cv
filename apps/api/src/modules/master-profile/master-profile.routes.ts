import type { Response } from "express";
import { Router } from "express";
import {
  requireAccessToken,
  type AuthenticatedLocals,
} from "../../middleware/authentication.js";
import { parseSaveMasterProfileInput } from "./master-profile.schema.js";
import { saveMasterProfile } from "./master-profile.service.js";

export const masterProfileRouter = Router();

masterProfileRouter.use(requireAccessToken);

masterProfileRouter.put("/", async (req, res: Response<unknown, AuthenticatedLocals>) => {
  const result = await saveMasterProfile(
    parseSaveMasterProfileInput(req.body),
    res.locals.authenticatedUserId,
  );

  res.status(200).json({
    masterProfile: result.masterProfile,
    message: "Master profile saved successfully.",
  });
});
