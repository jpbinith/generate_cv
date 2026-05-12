import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import type { EducationItem } from "../types/cv-generator.types";
import styles from "./EducationSection.module.scss";

interface EducationSectionProps {
  items: EducationItem[];
}

export function EducationSection({ items }: EducationSectionProps) {
  return (
    <SectionCard
      action={
        <button className={styles["education-section__header-action"]} type="button">
          <Icon name="add_circle" />
          <span>Add Education</span>
        </button>
      }
      icon={<Icon name="school" />}
      title="Education"
    >
      <div className={styles["education-section"]}>
        {items.map((item) => (
          <article
            key={`${item.qualification}-${item.institution}`}
            className={styles["education-section__item"]}
          >
            <div>
              <p className={styles["education-section__qualification"]}>
                {item.qualification}
              </p>
              <p className={styles["education-section__meta"]}>
                {item.institution} • {item.period}
              </p>
            </div>
            <button className={styles["education-section__edit"]} type="button">
              <Icon name="edit" />
            </button>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
