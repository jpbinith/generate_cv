import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { ProfileSelectionItem } from "../types/cv-generator.types";
import styles from "./ProfileSelectionPanel.module.scss";

interface ProfileSelectionPanelProps {
  items: ProfileSelectionItem[];
}

export function ProfileSelectionPanel({ items }: ProfileSelectionPanelProps) {
  return (
    <SurfaceCard>
      <div className={styles["profile-selection"]}>
        <div className={styles["profile-selection__header"]}>
          <div>
            <p className={styles["profile-selection__step"]}>Step 2</p>
            <h3 className={styles["profile-selection__title"]}>
              Master Profile Selection
            </h3>
          </div>
          <p className={styles["profile-selection__subtitle"]}>
            Select components to emphasize
          </p>
        </div>

        <div className={styles["profile-selection__list"]}>
          {items.map((item) => (
            <label
              key={item.title}
              className={`${styles["profile-selection__item"]} ${
                item.muted ? styles["profile-selection__item--muted"] : ""
              }`}
            >
              <div className={styles["profile-selection__item-head"]}>
                <div className={styles["profile-selection__item-main"]}>
                  <input defaultChecked={item.checked} type="checkbox" />
                  <span className={styles["profile-selection__item-title"]}>
                    {item.title}
                  </span>
                </div>
                <Icon name="drag_indicator" />
              </div>
              {item.description ? (
                <p className={styles["profile-selection__item-description"]}>
                  {item.description}
                </p>
              ) : null}
            </label>
          ))}
        </div>

        <div className={styles["profile-selection__footer"]}>
          <Button
            fullWidth
            icon={<Icon filled name="auto_awesome" />}
            size="lg"
          >
            Generate Tailored CV
          </Button>
          <p className={styles["profile-selection__hint"]}>
            <Icon name="info" />
            <span>Estimated time: 15 seconds</span>
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
}
