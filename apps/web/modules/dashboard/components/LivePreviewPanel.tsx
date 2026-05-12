import { Icon } from "@/components/ui/Icon";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import styles from "./LivePreviewPanel.module.scss";
import type { PreviewLineGroup } from "../types/dashboard.types";

interface LivePreviewPanelProps {
  previewInsight: string;
  previewLineGroups: PreviewLineGroup[];
  previewName: string;
  previewRole: string;
}

export function LivePreviewPanel({
  previewInsight,
  previewLineGroups,
  previewName,
  previewRole,
}: LivePreviewPanelProps) {
  return (
    <div className={styles["live-preview"]}>
      <div className={styles["live-preview__header"]}>
        <h3 className={styles["live-preview__title"]}>Live Preview</h3>
        <div className={styles["live-preview__actions"]}>
          <button className={styles["live-preview__icon-button"]} type="button">
            <Icon name="zoom_in" />
          </button>
          <button className={styles["live-preview__icon-button"]} type="button">
            <Icon name="download" />
          </button>
        </div>
      </div>

      <SurfaceCard>
        <div className={styles["live-preview__sheet"]}>
          <div className={styles["live-preview__identity"]}>
            <h4 className={styles["live-preview__name"]}>{previewName}</h4>
            <p className={styles["live-preview__role"]}>{previewRole}</p>
          </div>

          <div className={styles["live-preview__skeleton"]}>
            {previewLineGroups.map((line) => (
              <span
                key={line.id}
                className={`${styles["live-preview__line"]} ${
                  styles[`live-preview__line--${line.width}`]
                } ${line.offsetTop ? styles["live-preview__line--offset"] : ""}`}
              />
            ))}
          </div>

          <div className={styles["live-preview__suggestion"]}>
            <div className={styles["live-preview__suggestion-head"]}>
              <Icon name="tips_and_updates" />
              <span>AI Suggestion</span>
            </div>
            <p>{previewInsight}</p>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
