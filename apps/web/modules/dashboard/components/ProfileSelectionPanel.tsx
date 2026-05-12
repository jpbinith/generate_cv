import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import styles from "./ProfileSelectionPanel.module.scss";
import type { SelectionItem } from "../types/dashboard.types";

interface ProfileSelectionPanelProps {
  generationEstimate: string;
  items: SelectionItem[];
}

export function ProfileSelectionPanel({
  generationEstimate,
  items,
}: ProfileSelectionPanelProps) {
  return (
    <SurfaceCard>
      <div className={styles["profile-selection"]}>
        <div className={styles["profile-selection__header"]}>
          <div>
            <h3 className={styles["profile-selection__title"]}>
              2. Master Profile Selection
            </h3>
            <p className={styles["profile-selection__subtitle"]}>
              Select components to emphasize
            </p>
          </div>
        </div>

        <div className={styles["profile-selection__list"]}>
          {items.map((item) => (
            <article
              key={item.id}
              className={`${styles["profile-selection__item"]} ${
                item.muted ? styles["profile-selection__item--muted"] : ""
              }`}
            >
              <div className={styles["profile-selection__item-row"]}>
                <label className={styles["profile-selection__item-main"]}>
                  <input
                    checked={item.selected}
                    className={styles["profile-selection__checkbox"]}
                    readOnly
                    type="checkbox"
                  />
                  <span className={styles["profile-selection__item-title"]}>
                    {item.title}
                  </span>
                </label>
                <Icon name="drag_indicator" />
              </div>

              {item.description ? (
                <p className={styles["profile-selection__item-description"]}>
                  {item.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className={styles["profile-selection__footer"]}>
          <Button
            fullWidth
            icon={<Icon filled name="magic_button" />}
            size="lg"
          >
            Generate Tailored CV
          </Button>
          <p className={styles["profile-selection__estimate"]}>
            <Icon name="info" />
            <span>{generationEstimate}</span>
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
}
