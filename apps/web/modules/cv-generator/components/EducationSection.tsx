import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import type { EducationItem } from "../types/cv-generator.types";
import styles from "./EducationSection.module.scss";

interface EducationSectionProps {
  items: EducationItem[];
}

const EMPTY_EDUCATION: EducationItem = {
  qualification: "",
  institution: "",
  period: "",
};

export function EducationSection({ items }: EducationSectionProps) {
  const [educationItems, setEducationItems] = useState(items);
  const [draftEducation, setDraftEducation] = useState<EducationItem | null>(null);

  function updateDraftEducation(field: keyof EducationItem, value: string) {
    setDraftEducation((currentValue) =>
      currentValue ? { ...currentValue, [field]: value } : currentValue,
    );
  }

  function saveDraftEducation() {
    if (!draftEducation) {
      return;
    }

    const normalizedEducation: EducationItem = {
      qualification: draftEducation.qualification.trim(),
      institution: draftEducation.institution.trim(),
      period: draftEducation.period.trim(),
    };

    if (
      !normalizedEducation.qualification ||
      !normalizedEducation.institution ||
      !normalizedEducation.period
    ) {
      return;
    }

    setEducationItems((currentValue) => [...currentValue, normalizedEducation]);
    setDraftEducation(null);
  }

  return (
    <SectionCard
      action={
        <button
          className={styles["education-section__header-action"]}
          onClick={() => setDraftEducation({ ...EMPTY_EDUCATION })}
          type="button"
        >
          <Icon name="add_circle" />
          <span>Add Education</span>
        </button>
      }
      icon={<Icon name="school" />}
      title="Education"
    >
      <div className={styles["education-section"]}>
        {draftEducation ? (
          <article
            className={`${styles["education-section__draft"]} ${styles["education-section__item"]}`}
          >
            <div className={styles["education-section__draft-badge"]}>
              New Education
            </div>

            <div className={styles["education-section__form-grid"]}>
              <label className={styles["education-section__field"]}>
                <span>Qualification</span>
                <input
                  onChange={(event) =>
                    updateDraftEducation("qualification", event.target.value)
                  }
                  placeholder="Enter qualification"
                  type="text"
                  value={draftEducation.qualification}
                />
              </label>
              <label className={styles["education-section__field"]}>
                <span>Institution</span>
                <input
                  onChange={(event) =>
                    updateDraftEducation("institution", event.target.value)
                  }
                  placeholder="Enter institution"
                  type="text"
                  value={draftEducation.institution}
                />
              </label>
              <label className={styles["education-section__field"]}>
                <span>Period</span>
                <input
                  onChange={(event) =>
                    updateDraftEducation("period", event.target.value)
                  }
                  placeholder="e.g. 2016 - 2018"
                  type="text"
                  value={draftEducation.period}
                />
              </label>
            </div>

            <div className={styles["education-section__draft-actions"]}>
              <button
                className={styles["education-section__cancel"]}
                onClick={() => setDraftEducation(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className={styles["education-section__save"]}
                onClick={saveDraftEducation}
                type="button"
              >
                Save Education
              </button>
            </div>
          </article>
        ) : null}

        {educationItems.map((item) => (
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
