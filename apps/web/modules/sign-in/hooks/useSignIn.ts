"use client";

import { useState } from "react";
import { SignInRequestError, signIn } from "../services/sign-in.service";
import type {
  SignInFormValues,
  SignInSuccessResponse,
} from "../types/sign-in.types";

export function useSignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(values: SignInFormValues): Promise<SignInSuccessResponse | null> {
    setIsSubmitting(true);
    setServerError("");
    setSuccessMessage("");
    setFieldErrors({});

    try {
      const response = await signIn(values);
      setSuccessMessage(response.message);
      return response;
    } catch (error: unknown) {
      if (error instanceof SignInRequestError) {
        setServerError(error.message);
        setFieldErrors(error.fieldErrors);
      } else {
        setServerError("Unable to sign in right now.");
      }

      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearFieldError(field: keyof SignInFormValues) {
    setFieldErrors((currentErrors) => {
      if (!(field in currentErrors)) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  return {
    clearFieldError,
    fieldErrors,
    isSubmitting,
    serverError,
    submit,
    successMessage,
  };
}
