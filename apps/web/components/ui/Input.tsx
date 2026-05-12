import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  wrapperClassName?: string;
}

export function Input({
  startAdornment,
  endAdornment,
  wrapperClassName,
  className,
  type = "text",
  ...props
}: InputProps) {
  const wrapperClasses = [
    styles["input-field"],
    startAdornment ? styles["input-field--with-start-adornment"] : "",
    endAdornment ? styles["input-field--with-end-adornment"] : "",
    wrapperClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [styles.input, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {startAdornment ? (
        <span className={styles["input-field__start-adornment"]}>
          {startAdornment}
        </span>
      ) : null}

      <input className={inputClasses} type={type} {...props} />

      {endAdornment ? (
        <span className={styles["input-field__end-adornment"]}>
          {endAdornment}
        </span>
      ) : null}
    </div>
  );
}
