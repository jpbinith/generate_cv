import type { ProgressOverview as ProgressOverviewData } from "../types/cv-generator.types";
import styles from "./ProgressOverview.module.scss";

interface ProgressOverviewProps {
  data: ProgressOverviewData;
}

export function ProgressOverview({ data }: ProgressOverviewProps) {
  return (
    <section className={styles["progress-overview"]}>
      <div className={styles["progress-overview__status"]}>
        <div className={styles["progress-overview__content"]}>
          <h3 className={styles["progress-overview__title"]}>Profile Completion</h3>
          <p className={styles["progress-overview__summary"]}>{data.summary}</p>
          <div className={styles["progress-overview__track"]}>
            <div
              className={styles["progress-overview__fill"]}
              style={{ width: `${data.completionPercentage}%` }}
            />
          </div>
        </div>
        <div className={styles["progress-overview__metric"]}>
          <span className={styles["progress-overview__percentage"]}>
            {data.completionPercentage}%
          </span>
          <p className={styles["progress-overview__hint"]}>Almost there!</p>
        </div>
      </div>

      <aside className={styles["progress-overview__tip"]}>
        <span className={`${styles["progress-overview__tip-icon"]} material-symbols-outlined`}>
          lightbulb
        </span>
        <div>
          <p className={styles["progress-overview__tip-title"]}>{data.tipTitle}</p>
          <p className={styles["progress-overview__tip-text"]}>{data.tipText}</p>
        </div>
      </aside>
    </section>
  );
}
