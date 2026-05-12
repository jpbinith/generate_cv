import styles from "./AuthBrand.module.scss";

interface AuthBrandProps {
  title?: string;
  tagline?: string;
}

const DEFAULT_TITLE = "CV Automator";
const DEFAULT_TAGLINE = "Elevate your career with a professional suite.";

export function AuthBrand({
  title = DEFAULT_TITLE,
  tagline = DEFAULT_TAGLINE,
}: AuthBrandProps) {
  return (
    <header className={styles["auth-brand"]}>
      <h1 className={styles["auth-brand__title"]}>{title}</h1>
      <p className={styles["auth-brand__tagline"]}>{tagline}</p>
    </header>
  );
}
