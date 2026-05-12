import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import styles from "./SignUpModule.module.scss";

export function SignUpModule() {
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

            <form className={styles["sign-up__form"]}>
              <label className={styles["sign-up__field"]}>
                <span className={styles["sign-up__label"]}>Full Name</span>
                <input
                  className={styles["sign-up__input"]}
                  name="full-name"
                  placeholder="John Doe"
                  type="text"
                />
              </label>

              <label className={styles["sign-up__field"]}>
                <span className={styles["sign-up__label"]}>Email Address</span>
                <input
                  className={styles["sign-up__input"]}
                  name="email"
                  placeholder="john@example.com"
                  type="email"
                />
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
                    type="password"
                  />
                  <button
                    className={styles["sign-up__visibility-toggle"]}
                    type="button"
                  >
                    <Icon name="visibility" />
                  </button>
                </div>

                <p className={styles["sign-up__helper"]}>
                  Must be at least 8 characters with a mix of letters and
                  numbers.
                </p>
              </div>

              <button className={styles["sign-up__submit"]} type="submit">
                <span>Create Account</span>
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
