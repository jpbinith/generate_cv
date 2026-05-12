"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  signIn,
  SignInRequestError,
} from "./services/sign-in.service";
import styles from "./SignInModule.module.scss";
import type { SignInFormValues } from "./types/sign-in.types";

export function SignInModule() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<SignInFormValues>({
    email: "",
    password: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setServerError("");
    setSuccessMessage("");
    setFieldErrors({});

    try {
      const response = await signIn(formValues);
      setSuccessMessage(response.message);
    } catch (error: unknown) {
      if (error instanceof SignInRequestError) {
        setServerError(error.message);
        setFieldErrors(error.fieldErrors);
      } else {
        setServerError("Unable to sign in right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(field: keyof SignInFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setFieldErrors((currentErrors) => {
      if (!(field in currentErrors)) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  return (
    <div className={styles["sign-in"]}>
      <div className={styles["sign-in__background"]} aria-hidden="true">
        <div className={styles["sign-in__glow"]} />
        <div className={styles["sign-in__glow"]} />
      </div>

      <main className={styles["sign-in__main"]}>
        <section className={styles["sign-in__shell"]}>
          <header className={styles["sign-in__header"]}>
            <h1 className={styles["sign-in__brand"]}>CV Automator</h1>
            <p className={styles["sign-in__tagline"]}>
              Elevate your career with a professional suite.
            </p>
          </header>

          <div className={styles["sign-in__card"]}>
            <div className={styles["sign-in__intro"]}>
              <h2 className={styles["sign-in__title"]}>Sign In</h2>
              <p className={styles["sign-in__description"]}>
                Enter your email and password to continue to your workspace.
              </p>
            </div>

            <form className={styles["sign-in__form"]} onSubmit={handleSubmit}>
              <label className={styles["sign-in__field"]}>
                <span className={styles["sign-in__label"]}>Email Address</span>
                <input
                  className={styles["sign-in__input"]}
                  name="email"
                  placeholder="john@example.com"
                  type="email"
                  value={formValues.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                />
                {fieldErrors.email ? (
                  <p className={styles["sign-in__field-error"]}>
                    {fieldErrors.email}
                  </p>
                ) : null}
              </label>

              <div className={styles["sign-in__field"]}>
                <div className={styles["sign-in__field-head"]}>
                  <span className={styles["sign-in__label"]}>Password</span>
                  <button
                    className={styles["sign-in__aux-link"]}
                    type="button"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className={styles["sign-in__password-wrap"]}>
                  <input
                    className={styles["sign-in__input"]}
                    name="password"
                    placeholder="••••••••"
                    type={isPasswordVisible ? "text" : "password"}
                    value={formValues.password}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                  />
                  <button
                    className={styles["sign-in__visibility-toggle"]}
                    type="button"
                    onClick={() =>
                      setIsPasswordVisible((currentValue) => !currentValue)
                    }
                  >
                    <Icon name={isPasswordVisible ? "visibility_off" : "visibility"} />
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className={styles["sign-in__field-error"]}>
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>

              {serverError ? (
                <p className={styles["sign-in__form-message"]}>{serverError}</p>
              ) : null}

              {successMessage ? (
                <p
                  className={`${styles["sign-in__form-message"]} ${styles["sign-in__form-message--success"]}`}
                >
                  {successMessage}
                </p>
              ) : null}

              <button
                className={styles["sign-in__submit"]}
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
                <Icon name="login" />
              </button>
            </form>
          </div>

          <p className={styles["sign-in__signup"]}>
            New to CV Automator?
            <Link className={styles["sign-in__signup-link"]} href="/sign-up">
              Create an account
            </Link>
          </p>
        </section>
      </main>

      <footer className={styles["sign-in__footer"]}>
        <a className={styles["sign-in__footer-link"]} href="#">
          Privacy Policy
        </a>
        <a className={styles["sign-in__footer-link"]} href="#">
          Terms of Service
        </a>
        <a className={styles["sign-in__footer-link"]} href="#">
          Contact Support
        </a>
      </footer>

      <div className={styles["sign-in__support"]}>
        <button className={styles["sign-in__support-button"]} type="button">
          <Icon name="help" />
        </button>
      </div>
    </div>
  );
}
