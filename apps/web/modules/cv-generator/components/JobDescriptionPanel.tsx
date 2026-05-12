import { Icon } from "@/components/ui/Icon";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Tag } from "@/components/ui/Tag";
import styles from "./JobDescriptionPanel.module.scss";

interface JobDescriptionPanelProps {
  keywords: string[];
}

export function JobDescriptionPanel({ keywords }: JobDescriptionPanelProps) {
  return (
    <SurfaceCard>
      <div className={styles["job-description"]}>
        <div className={styles["job-description__header"]}>
          <div>
            <p className={styles["job-description__step"]}>Step 1</p>
            <h3 className={styles["job-description__title"]}>Job Description</h3>
          </div>

          <button className={styles["job-description__action"]} type="button">
            <Icon name="auto_awesome" />
            <span>Extract Keywords</span>
          </button>
        </div>

        <textarea
          className={styles["job-description__field"]}
          placeholder="Paste the target job description here to align your CV with the company's requirements..."
        />

        <div className={styles["job-description__keywords"]}>
          <p className={styles["job-description__keywords-title"]}>
            Recently Extracted Keywords
          </p>
          <div className={styles["job-description__keyword-list"]}>
            {keywords.map((keyword) => (
              <Tag key={keyword} label={keyword} />
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
