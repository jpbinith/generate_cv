"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthBrand } from "@/components/ui/AuthBrand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { useSignUp } from "./hooks/useSignUp";
import styles from "./SignUpModule.module.scss";
import type { SignUpFormValues } from "./types/sign-up.types";

export function SignUpModule() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    name: "",
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
  } = useSignUp();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await submit(formValues);

    if (response) {
      setFormValues({
        name: "",
        email: "",
        password: "",
      });
      window.setTimeout(() => {
        router.push("/");
      }, 1200);
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
    clearFieldError(field);
  }

  return (
    <div className={styles["sign-up"]}>
      <div className={styles["sign-up__background"]} aria-hidden="true">
        <div className={styles["sign-up__glow"]} />
        <div className={styles["sign-up__glow"]} />
      </div>

      <main className={styles["sign-up__main"]}>
        <section className={styles["sign-up__shell"]}>
          <AuthBrand />

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
                <Input
                  aria-invalid={Boolean(fieldErrors.name)}
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
                <Input
                  aria-invalid={Boolean(fieldErrors.email)}
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

                <Input
                  aria-invalid={Boolean(fieldErrors.password)}
                  endAdornment={
                    <button
                      className={styles["sign-up__visibility-toggle"]}
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

              <Button
                className={styles["sign-up__submit"]}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
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
