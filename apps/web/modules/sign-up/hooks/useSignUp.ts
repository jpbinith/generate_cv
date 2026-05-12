"use client";

import { useState } from "react";
import { SignUpRequestError, signUp } from "../services/sign-up.service";
import type {
  SignUpFormValues,
  SignUpSuccessResponse,
} from "../types/sign-up.types";

export function useSignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(values: SignUpFormValues): Promise<SignUpSuccessResponse | null> {
    setIsSubmitting(true);
    setServerError("");
    setSuccessMessage("");
    setFieldErrors({});

    try {
      const response = await signUp(values);
      setSuccessMessage(response.message);
      return response;
    } catch (error: unknown) {
      if (error instanceof SignUpRequestError) {
        setServerError(error.message);
        setFieldErrors(error.fieldErrors);
      } else {
        setServerError("Unable to create account right now.");
      }

      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearFieldError(field: keyof SignUpFormValues) {
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
