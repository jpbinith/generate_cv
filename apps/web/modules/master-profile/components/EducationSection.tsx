import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import { MonthInput } from "./MonthInput";
import type { EducationItem } from "../types/master-profile.types";
import styles from "./EducationSection.module.scss";

interface EducationSectionProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

const EMPTY_EDUCATION: EducationItem = {
  qualification: "",
  institution: "",
  startDate: "",
  endDate: "",
};

export function EducationSection({ items, onChange }: EducationSectionProps) {
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
      startDate: draftEducation.startDate.trim(),
      endDate: draftEducation.endDate.trim(),
    };

    if (
      !normalizedEducation.qualification ||
      !normalizedEducation.institution ||
      !normalizedEducation.startDate ||
      !normalizedEducation.endDate
    ) {
      return;
    }

    onChange([...items, normalizedEducation]);
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
        {!draftEducation && items.length === 0 ? (
          <p className={styles["education-section__empty"]}>
            No education entries added yet.
          </p>
        ) : null}

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
                <span>Start Date</span>
                <MonthInput
                  onChange={(event) =>
                    updateDraftEducation("startDate", event.target.value)
                  }
                  value={draftEducation.startDate}
                />
              </label>
              <label className={styles["education-section__field"]}>
                <span>End Date</span>
                <MonthInput
                  onChange={(event) =>
                    updateDraftEducation("endDate", event.target.value)
                  }
                  value={draftEducation.endDate}
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
                {item.institution} • {item.startDate} - {item.endDate}
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
