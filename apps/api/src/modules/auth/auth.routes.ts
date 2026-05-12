import { Router } from "express";
import { signUp } from "./auth.service.js";

export const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const user = await signUp(req.body);

  res.status(201).json({
    message: "Account created successfully.",
    user,
  });
});
