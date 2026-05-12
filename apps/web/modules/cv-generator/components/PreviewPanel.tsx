import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { TemplateCard } from "../types/cv-generator.types";
import Image from "next/image";
import styles from "./PreviewPanel.module.scss";

interface PreviewPanelProps {
  profileName: string;
  profileTitle: string;
  templates: TemplateCard[];
}

export function PreviewPanel({
  profileName,
  profileTitle,
  templates,
}: PreviewPanelProps) {
  return (
    <div className={styles["preview-panel"]}>
      <div className={styles["preview-panel__top"]}>
        <div>
          <p className={styles["preview-panel__eyebrow"]}>Preview</p>
          <h3 className={styles["preview-panel__title"]}>Live Preview</h3>
        </div>

        <div className={styles["preview-panel__controls"]}>
          <Button icon={<Icon name="zoom_in" />} variant="ghost">
            Zoom
          </Button>
          <Button icon={<Icon name="download" />} variant="ghost">
            Download
          </Button>
        </div>
      </div>

      <div className={styles["preview-panel__sheet"]}>
        <div className={styles["preview-panel__sheet-header"]}>
          <h4>{profileName}</h4>
          <p>{profileTitle}</p>
        </div>

        <div className={styles["preview-panel__skeleton"]}>
          <span />
          <span className={styles["preview-panel__skeleton-line--short"]} />
          <span />
          <span />
          <span />
          <span className={styles["preview-panel__skeleton-line--tiny"]} />
        </div>

        <div className={styles["preview-panel__suggestion"]}>
          <div className={styles["preview-panel__suggestion-header"]}>
            <Icon name="tips_and_updates" />
            <span>AI Suggestion</span>
          </div>
          <p>
            Your &quot;Cloud Architecture&quot; experience matches 92% of the
            requirements. Keep it as the first item.
          </p>
        </div>
      </div>

      <div className={styles["preview-panel__templates"]}>
        {templates.map((template) => (
          <div
            key={template.title}
            className={`${styles["preview-panel__template"]} ${
              template.active ? styles["preview-panel__template--active"] : ""
            }`}
          >
            <Image
              alt={template.title}
              className={styles["preview-panel__template-image"]}
              fill
              sizes="(max-width: 1024px) 50vw, 18vw"
              src={template.src}
            />
            {template.active ? (
              <span className={styles["preview-panel__template-badge"]}>
                Active
              </span>
            ) : null}
          </div>
        ))}

        <button className={styles["preview-panel__template-add"]} type="button">
          <Icon name="add" />
        </button>
      </div>
    </div>
  );
}
