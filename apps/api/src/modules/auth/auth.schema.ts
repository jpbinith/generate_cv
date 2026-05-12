import { z } from "zod";
import type { SignInInput, SignUpInput } from "./types/auth.types.js";

export const signUpSchema: z.ZodType<SignUpInput> = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z.email("A valid email address is required.").transform((value) =>
    value.trim().toLowerCase(),
  ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Za-z]/, "Password must include at least one letter.")
    .regex(/\d/, "Password must include at least one number."),
});

export const signInSchema: z.ZodType<SignInInput> = z.object({
  email: z.email("A valid email address is required.").transform((value) =>
    value.trim().toLowerCase(),
  ),
  password: z.string().min(1, "Password is required."),
});
