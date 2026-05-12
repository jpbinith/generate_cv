import styles from "./Icon.module.scss";

interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
}

export function Icon({ name, filled = false, className }: IconProps) {
  const classes = [styles.icon, filled ? styles["icon--filled"] : "", className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{name}</span>;
}
