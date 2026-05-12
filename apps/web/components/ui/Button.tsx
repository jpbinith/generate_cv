import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  children,
  icon,
  iconPosition = "start",
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth ? styles["button--full-width"] : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {icon && iconPosition === "start" ? (
        <span className={styles.button__icon}>{icon}</span>
      ) : null}
      <span className={styles.button__label}>{children}</span>
      {icon && iconPosition === "end" ? (
        <span className={styles.button__icon}>{icon}</span>
      ) : null}
    </button>
  );
}
