import { Icon } from "@/components/ui/Icon";
import styles from "./TemplateGallery.module.scss";
import type { TemplatePreviewItem } from "../types/dashboard.types";

interface TemplateGalleryProps {
  items: TemplatePreviewItem[];
}

export function TemplateGallery({ items }: TemplateGalleryProps) {
  return (
    <div className={styles["template-gallery"]}>
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles["template-gallery__item"]} ${
            item.active ? styles["template-gallery__item--active"] : ""
          } ${styles[`template-gallery__item--${item.accent}`]}`}
          type="button"
        >
          {item.id === "new" ? (
            <span className={styles["template-gallery__new"]}>
              <Icon name="add" />
            </span>
          ) : (
            <span className={styles["template-gallery__thumbnail"]}>
              <span className={styles["template-gallery__thumbnail-bar"]} />
              <span className={styles["template-gallery__thumbnail-line"]} />
              <span className={styles["template-gallery__thumbnail-line"]} />
              <span
                className={`${styles["template-gallery__thumbnail-line"]} ${styles["template-gallery__thumbnail-line--short"]}`}
              />
            </span>
          )}
          <span className={styles["template-gallery__label"]}>{item.title}</span>
          {item.active ? (
            <span className={styles["template-gallery__badge"]}>Active</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
