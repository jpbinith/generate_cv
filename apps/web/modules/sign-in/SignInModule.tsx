"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthBrand } from "@/components/ui/AuthBrand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { useSignIn } from "./hooks/useSignIn";
import styles from "./SignInModule.module.scss";
import type { SignInFormValues } from "./types/sign-in.types";

export function SignInModule() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState<SignInFormValues>({
    email: "",
    password: "",
  });
  const {
    clearFieldError,
    fieldErrors,
    isSubmitting,
    serverError,
    submit,
    successMessage,
  } = useSignIn();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await submit(formValues);

    if (response) {
      window.setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    }
  }

  function handleChange(field: keyof SignInFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    clearFieldError(field);
  }

  return (
    <div className={styles["sign-in"]}>
      <div className={styles["sign-in__background"]} aria-hidden="true">
        <div className={styles["sign-in__glow"]} />
        <div className={styles["sign-in__glow"]} />
      </div>

      <main className={styles["sign-in__main"]}>
        <section className={styles["sign-in__shell"]}>
          <AuthBrand />

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
                <Input
                  aria-invalid={Boolean(fieldErrors.email)}
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

                <Input
                  aria-invalid={Boolean(fieldErrors.password)}
                  endAdornment={
                    <button
                      className={styles["sign-in__visibility-toggle"]}
                      type="button"
                      onClick={() =>
                        setIsPasswordVisible((currentValue) => !currentValue)
                      }
                    >
                      <Icon
                        name={isPasswordVisible ? "visibility_off" : "visibility"}
                      />
                    </button>
                  }
                  name="password"
                  placeholder="••••••••"
                  type={isPasswordVisible ? "text" : "password"}
                  value={formValues.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                />
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

              <Button
                className={styles["sign-in__submit"]}
                disabled={isSubmitting}
                icon={<Icon name="login" />}
                iconPosition="end"
                type="submit"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
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
