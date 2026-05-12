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
              Elevate your career with professional precision.
            </p>
          </header>

          <div className={styles["sign-in__card"]}>
            <form className={styles["sign-in__form"]}>
              <label className={styles["sign-in__field"]}>
                <span className={styles["sign-in__label"]}>Email Address</span>
                <input
                  className={styles["sign-in__input"]}
                  name="email"
                  placeholder="name@company.com"
                  type="email"
                />
              </label>

              <label className={styles["sign-in__field"]}>
                <span className={styles["sign-in__field-row"]}>
                  <span className={styles["sign-in__label"]}>Password</span>
                  <a className={styles["sign-in__link"]} href="#">
                    Forgot Password?
                  </a>
                </span>
                <input
                  className={styles["sign-in__input"]}
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
              </label>

              <button className={styles["sign-in__submit"]} type="submit">
                <span>Sign In</span>
                <Icon name="login" />
              </button>
            </form>
          </div>

          <p className={styles["sign-in__signup"]}>
            New to CV Automator?
            <a className={styles["sign-in__signup-link"]} href="#">
              Create an account
            </a>
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
    </div>
  );
}
