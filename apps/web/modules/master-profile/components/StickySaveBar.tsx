import { Icon } from "@/components/ui/Icon";
import styles from "./StickySaveBar.module.scss";

interface StickySaveBarProps {
  statusText: string;
  isSaving?: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export function StickySaveBar({
  statusText,
  isSaving = false,
  onDiscard,
  onSave,
}: StickySaveBarProps) {
  return (
    <div className={styles["sticky-save-bar"]}>
      <div className={styles["sticky-save-bar__inner"]}>
        <p className={styles["sticky-save-bar__status"]}>
          <Icon name="sync" />
          <span>{statusText}</span>
        </p>
        <div className={styles["sticky-save-bar__actions"]}>
          <button
            className={styles["sticky-save-bar__discard"]}
            disabled={isSaving}
            onClick={onDiscard}
            type="button"
          >
            Discard Changes
          </button>
          <button
            className={styles["sticky-save-bar__save"]}
            disabled={isSaving}
            onClick={onSave}
            type="button"
          >
            <Icon name="save" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
