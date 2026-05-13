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
  isPresent: false,
  achievements: [""],
};

export function EducationSection({ items, onChange }: EducationSectionProps) {
  const [draftEducation, setDraftEducation] = useState<EducationItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingEducation, setEditingEducation] = useState<EducationItem | null>(null);

  function updateDraftEducation(field: keyof EducationItem, value: string) {
    setDraftEducation((currentValue) =>
      currentValue ? { ...currentValue, [field]: value } : currentValue,
    );
  }

  function toggleDraftPresent(isPresent: boolean) {
    setDraftEducation((currentValue) =>
      currentValue
        ? {
            ...currentValue,
            isPresent,
            endDate: isPresent ? "" : currentValue.endDate,
          }
        : currentValue,
    );
  }

  function updateDraftAchievements(value: string) {
    const achievementLines = value
      .split("\n")
      .map((entry) => entry.replace(/^•\s*/, "").trim());

    setDraftEducation((currentValue) =>
      currentValue
        ? {
            ...currentValue,
            achievements: achievementLines.length > 0 ? achievementLines : [""],
          }
        : currentValue,
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
      endDate: draftEducation.isPresent ? "" : draftEducation.endDate.trim(),
      isPresent: draftEducation.isPresent,
      achievements: draftEducation.achievements
        .map((entry) => entry.trim())
        .filter(Boolean),
    };

    if (
      !normalizedEducation.qualification ||
      !normalizedEducation.institution ||
      !normalizedEducation.startDate ||
      (!normalizedEducation.isPresent && !normalizedEducation.endDate)
    ) {
      return;
    }

    onChange([...items, normalizedEducation]);
    setDraftEducation(null);
  }

  function startEditingEducation(index: number) {
    setEditingIndex(index);
    setEditingEducation({
      ...items[index],
      achievements: [...items[index].achievements],
    });
  }

  function updateEditingEducation(
    field: keyof EducationItem,
    value: string,
  ) {
    setEditingEducation((currentValue) =>
      currentValue ? { ...currentValue, [field]: value } : currentValue,
    );
  }

  function updateEditingAchievements(value: string) {
    const achievements = value
      .split("\n")
      .map((entry) => entry.replace(/^•\s*/, "").trim());

    setEditingEducation((currentValue) =>
      currentValue
        ? {
            ...currentValue,
            achievements: achievements.length > 0 ? achievements : [""],
          }
        : currentValue,
    );
  }

  function toggleEditingPresent(isPresent: boolean) {
    setEditingEducation((currentValue) =>
      currentValue
        ? {
            ...currentValue,
            isPresent,
            endDate: isPresent ? "" : currentValue.endDate,
          }
        : currentValue,
    );
  }

  function cancelEditingEducation() {
    setEditingIndex(null);
    setEditingEducation(null);
  }

  function saveEditingEducation() {
    if (editingIndex === null || !editingEducation) {
      return;
    }

    const normalizedEducation: EducationItem = {
      qualification: editingEducation.qualification.trim(),
      institution: editingEducation.institution.trim(),
      startDate: editingEducation.startDate.trim(),
      endDate: editingEducation.isPresent ? "" : editingEducation.endDate.trim(),
      isPresent: editingEducation.isPresent,
      achievements: editingEducation.achievements
        .map((entry) => entry.trim())
        .filter(Boolean),
    };

    if (
      !normalizedEducation.qualification ||
      !normalizedEducation.institution ||
      !normalizedEducation.startDate ||
      (!normalizedEducation.isPresent && !normalizedEducation.endDate)
    ) {
      return;
    }

    onChange(
      items.map((item, itemIndex) =>
        itemIndex === editingIndex
          ? normalizedEducation
          : item,
      ),
    );

    setEditingIndex(null);
    setEditingEducation(null);
  }

  function removeEducation(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));

    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingEducation(null);
      return;
    }

    if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
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
                  disabled={draftEducation.isPresent}
                  onChange={(event) =>
                    updateDraftEducation("endDate", event.target.value)
                  }
                  value={draftEducation.endDate}
                />
              </label>
            </div>

            <label className={styles["education-section__present-toggle"]}>
              <input
                checked={draftEducation.isPresent}
                onChange={(event) => toggleDraftPresent(event.target.checked)}
                type="checkbox"
              />
              <span>Present</span>
            </label>

            <label className={styles["education-section__achievements"]}>
              <span>Key Achievements</span>
              <textarea
                onChange={(event) => updateDraftAchievements(event.target.value)}
                placeholder={"• Add a notable academic achievement\n• Add another highlight"}
                rows={4}
                value={draftEducation.achievements
                  .filter((entry, index, entries) => entry || entries.length === 1)
                  .map((entry) => (entry ? `• ${entry}` : ""))
                  .join("\n")}
              />
            </label>

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
                Add Education
              </button>
            </div>
          </article>
        ) : null}

        {items.map((item, index) =>
          editingIndex === index && editingEducation ? (
            <article
              key={`${item.qualification}-${item.institution}`}
              className={`${styles["education-section__draft"]} ${styles["education-section__item"]}`}
            >
              <div className={styles["education-section__draft-badge"]}>
                Edit Education
              </div>

              <div className={styles["education-section__form-grid"]}>
                <label className={styles["education-section__field"]}>
                  <span>Qualification</span>
                  <input
                    onChange={(event) =>
                      updateEditingEducation("qualification", event.target.value)
                    }
                    type="text"
                    value={editingEducation.qualification}
                  />
                </label>
                <label className={styles["education-section__field"]}>
                  <span>Institution</span>
                  <input
                    onChange={(event) =>
                      updateEditingEducation("institution", event.target.value)
                    }
                    type="text"
                    value={editingEducation.institution}
                  />
                </label>
                <label className={styles["education-section__field"]}>
                  <span>Start Date</span>
                  <MonthInput
                    onChange={(event) =>
                      updateEditingEducation("startDate", event.target.value)
                    }
                    value={editingEducation.startDate}
                  />
                </label>
                <label className={styles["education-section__field"]}>
                  <span>End Date</span>
                  <MonthInput
                    disabled={editingEducation.isPresent}
                    onChange={(event) =>
                      updateEditingEducation("endDate", event.target.value)
                    }
                    value={editingEducation.endDate}
                  />
                </label>
              </div>

              <label className={styles["education-section__present-toggle"]}>
                <input
                  checked={editingEducation.isPresent}
                  onChange={(event) => toggleEditingPresent(event.target.checked)}
                  type="checkbox"
                />
                <span>Present</span>
              </label>

              <label className={styles["education-section__achievements"]}>
                <span>Key Achievements</span>
                <textarea
                  onChange={(event) => updateEditingAchievements(event.target.value)}
                  rows={4}
                  value={editingEducation.achievements
                    .filter((entry, itemIndex, entries) => entry || entries.length === 1)
                    .map((entry) => (entry ? `• ${entry}` : ""))
                    .join("\n")}
                />
              </label>

              <div className={styles["education-section__draft-actions"]}>
                <button
                  className={styles["education-section__cancel"]}
                  onClick={cancelEditingEducation}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles["education-section__save"]}
                  onClick={saveEditingEducation}
                  type="button"
                >
                  Done
                </button>
              </div>
            </article>
          ) : (
            <article
              key={`${item.qualification}-${item.institution}`}
              className={styles["education-section__item"]}
            >
              <div>
                <p className={styles["education-section__qualification"]}>
                  {item.qualification}
                </p>
                <p className={styles["education-section__meta"]}>
                  {item.institution} • {item.startDate} -{" "}
                  {item.isPresent ? "Present" : item.endDate}
                </p>
                {item.achievements.length > 0 ? (
                  <ul className={styles["education-section__achievement-list"]}>
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className={styles["education-section__actions"]}>
                <button
                  className={styles["education-section__edit"]}
                  onClick={() => startEditingEducation(index)}
                  type="button"
                >
                  <Icon name="edit" />
                </button>
                <button
                  className={styles["education-section__edit"]}
                  onClick={() => removeEducation(index)}
                  type="button"
                >
                  <Icon name="delete" />
                </button>
              </div>
            </article>
          ),
        )}
      </div>
    </SectionCard>
  );
}
