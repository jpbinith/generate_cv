"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  SignUpRequestError,
  signUp,
} from "./services/sign-up.service";
import styles from "./SignUpModule.module.scss";
import type { SignUpFormValues } from "./types/sign-up.types";

export function SignUpModule() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    name: "",
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
      const response = await signUp(formValues);
      setSuccessMessage(response.message);
      setFormValues({
        name: "",
        email: "",
        password: "",
      });
      window.setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (error: unknown) {
      if (error instanceof SignUpRequestError) {
        setServerError(error.message);
        setFieldErrors(error.fieldErrors);
      } else {
        setServerError("Unable to create account right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    field: keyof SignUpFormValues,
    value: string,
  ) {
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
    <div className={styles["sign-up"]}>
      <div className={styles["sign-up__background"]} aria-hidden="true">
        <div className={styles["sign-up__glow"]} />
        <div className={styles["sign-up__glow"]} />
      </div>

      <main className={styles["sign-up__main"]}>
        <section className={styles["sign-up__shell"]}>
          <header className={styles["sign-up__header"]}>
            <h1 className={styles["sign-up__brand"]}>CV Automator</h1>
            <p className={styles["sign-up__tagline"]}>
              Elevate your career with a professional suite.
            </p>
          </header>

          <div className={styles["sign-up__card"]}>
            <div className={styles["sign-up__intro"]}>
              <h2 className={styles["sign-up__title"]}>Create Account</h2>
              <p className={styles["sign-up__description"]}>
                Enter your details to start building your professional CV.
              </p>
            </div>

            <form className={styles["sign-up__form"]} onSubmit={handleSubmit}>
              <label className={styles["sign-up__field"]}>
                <span className={styles["sign-up__label"]}>Full Name</span>
                <input
                  className={styles["sign-up__input"]}
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  value={formValues.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                />
                {fieldErrors.name ? (
                  <p className={styles["sign-up__field-error"]}>
                    {fieldErrors.name}
                  </p>
                ) : null}
              </label>

              <label className={styles["sign-up__field"]}>
                <span className={styles["sign-up__label"]}>Email Address</span>
                <input
                  className={styles["sign-up__input"]}
                  name="email"
                  placeholder="john@example.com"
                  type="email"
                  value={formValues.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                />
                {fieldErrors.email ? (
                  <p className={styles["sign-up__field-error"]}>
                    {fieldErrors.email}
                  </p>
                ) : null}
              </label>

              <div className={styles["sign-up__field"]}>
                <div className={styles["sign-up__field-head"]}>
                  <span className={styles["sign-up__label"]}>Password</span>
                </div>

                <div className={styles["sign-up__password-wrap"]}>
                  <input
                    className={styles["sign-up__input"]}
                    name="password"
                    placeholder="••••••••"
                    type={isPasswordVisible ? "text" : "password"}
                    value={formValues.password}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                  />
                  <button
                    className={styles["sign-up__visibility-toggle"]}
                    type="button"
                    onClick={() =>
                      setIsPasswordVisible((currentValue) => !currentValue)
                    }
                  >
                    <Icon name={isPasswordVisible ? "visibility_off" : "visibility"} />
                  </button>
                </div>

                <p className={styles["sign-up__helper"]}>
                  Must be at least 8 characters with a mix of letters and
                  numbers.
                </p>
                {fieldErrors.password ? (
                  <p className={styles["sign-up__field-error"]}>
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>

              {serverError ? (
                <p className={styles["sign-up__form-message"]}>{serverError}</p>
              ) : null}

              {successMessage ? (
                <p
                  className={`${styles["sign-up__form-message"]} ${styles["sign-up__form-message--success"]}`}
                >
                  {successMessage}
                </p>
              ) : null}

              <button
                className={styles["sign-up__submit"]}
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
              </button>
            </form>
          </div>

          <p className={styles["sign-up__signin"]}>
            Already have an account?
            <Link className={styles["sign-up__signin-link"]} href="/">
              Sign in
            </Link>
          </p>

          <p className={styles["sign-up__terms"]}>
            By creating an account, you agree to our{" "}
            <Link className={styles["sign-up__terms-link"]} href="/">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className={styles["sign-up__terms-link"]} href="/">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </main>

      <footer className={styles["sign-up__footer"]}>
        <a className={styles["sign-up__footer-link"]} href="#">
          Privacy Policy
        </a>
        <a className={styles["sign-up__footer-link"]} href="#">
          Terms of Service
        </a>
        <a className={styles["sign-up__footer-link"]} href="#">
          Contact Support
        </a>
      </footer>

      <div className={styles["sign-up__support"]}>
        <button className={styles["sign-up__support-button"]} type="button">
          <Icon name="help" />
        </button>
      </div>
    </div>
  );
}
