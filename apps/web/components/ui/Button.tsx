import type { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  icon,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth ? styles["button--full-width"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type}>
      {icon ? <span className={styles.button__icon}>{icon}</span> : null}
      <span className={styles.button__label}>{children}</span>
    </button>
  );
}
