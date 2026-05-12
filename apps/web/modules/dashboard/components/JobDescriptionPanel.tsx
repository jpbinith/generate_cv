import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Tag } from "@/components/ui/Tag";
import styles from "./JobDescriptionPanel.module.scss";
import type { KeywordItem } from "../types/dashboard.types";

interface JobDescriptionPanelProps {
  extractedKeywords: KeywordItem[];
  jobDescription: string;
}

export function JobDescriptionPanel({
  extractedKeywords,
  jobDescription,
}: JobDescriptionPanelProps) {
  return (
    <SurfaceCard>
      <div className={styles["job-description"]}>
        <div className={styles["job-description__header"]}>
          <h3 className={styles["job-description__title"]}>1. Job Description</h3>
          <Button icon={<Icon name="auto_awesome" />} variant="ghost">
            Extract Keywords
          </Button>
        </div>

        <textarea
          className={styles["job-description__input"]}
          defaultValue={jobDescription}
        />

        <div className={styles["job-description__keywords"]}>
          <p className={styles["job-description__label"]}>
            Recently Extracted Keywords
          </p>
          <div className={styles["job-description__tag-list"]}>
            {extractedKeywords.map((keyword) => (
              <Tag key={keyword.label} label={keyword.label} />
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
