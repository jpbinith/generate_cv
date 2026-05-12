import type { ReactNode } from "react";
import styles from "./SectionCard.module.scss";

interface SectionCardProps {
  action?: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  title: string;
}

export function SectionCard({ action, children, icon, title }: SectionCardProps) {
  return (
    <section className={styles["section-card"]}>
      <header className={styles["section-card__header"]}>
        <div className={styles["section-card__heading"]}>
          {icon ? <span className={styles["section-card__icon"]}>{icon}</span> : null}
          <h3 className={styles["section-card__title"]}>{title}</h3>
        </div>
        {action ? <div className={styles["section-card__action"]}>{action}</div> : null}
      </header>
      <div className={styles["section-card__body"]}>{children}</div>
    </section>
  );
}
