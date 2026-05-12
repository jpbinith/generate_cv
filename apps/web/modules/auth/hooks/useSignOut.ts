"use client";

import { useState } from "react";
import { SignOutRequestError, signOut } from "../services/sign-out.service";

export function useSignOut() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(): Promise<boolean> {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await signOut();
      return true;
    } catch (error: unknown) {
      if (error instanceof SignOutRequestError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unable to sign out right now.");
      }

      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    errorMessage,
    isSubmitting,
    submit,
  };
}
