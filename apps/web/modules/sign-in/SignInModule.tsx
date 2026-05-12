import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import styles from "./SignInModule.module.scss";

export function SignInModule() {
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

            <form className={styles["sign-in__form"]}>
              <label className={styles["sign-in__field"]}>
                <span className={styles["sign-in__label"]}>Email Address</span>
                <input
                  className={styles["sign-in__input"]}
                  name="email"
                  placeholder="john@example.com"
                  type="email"
                />
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
                    type="password"
                  />
                  <button
                    className={styles["sign-in__visibility-toggle"]}
                    type="button"
                  >
                    <Icon name="visibility" />
                  </button>
                </div>
              </div>

              <button className={styles["sign-in__submit"]} type="submit">
                <span>Sign In</span>
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
