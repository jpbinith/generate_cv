import { Icon } from "@/components/ui/Icon";
import styles from "./StickySaveBar.module.scss";

interface StickySaveBarProps {
  autosaveLabel: string;
  onDiscard: () => void;
  onSave: () => void;
}

export function StickySaveBar({
  autosaveLabel,
  onDiscard,
  onSave,
}: StickySaveBarProps) {
  return (
    <div className={styles["sticky-save-bar"]}>
      <div className={styles["sticky-save-bar__inner"]}>
        <p className={styles["sticky-save-bar__status"]}>
          <Icon name="sync" />
          <span>{autosaveLabel}</span>
        </p>
        <div className={styles["sticky-save-bar__actions"]}>
          <button
            className={styles["sticky-save-bar__discard"]}
            onClick={onDiscard}
            type="button"
          >
            Discard Changes
          </button>
          <button
            className={styles["sticky-save-bar__save"]}
            onClick={onSave}
            type="button"
          >
            <Icon name="save" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
