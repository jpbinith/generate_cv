import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import { MonthInput } from "./MonthInput";
import type { WorkExperienceItem } from "../types/master-profile.types";
import styles from "./WorkExperienceSection.module.scss";

interface WorkExperienceSectionProps {
  items: WorkExperienceItem[];
  onChange: (items: WorkExperienceItem[]) => void;
}

const EMPTY_EXPERIENCE: WorkExperienceItem = {
  companyName: "",
  roleTitle: "",
  location: "",
  startDate: "",
  endDate: "",
  isPresent: false,
  achievements: [""],
};

export function WorkExperienceSection({
  items,
  onChange,
}: WorkExperienceSectionProps) {
  const [draftExperience, setDraftExperience] =
    useState<WorkExperienceItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingExperience, setEditingExperience] =
    useState<WorkExperienceItem | null>(null);

  function updateDraftExperience(
    field: keyof Omit<WorkExperienceItem, "achievements">,
    value: string,
  ) {
    setDraftExperience((currentValue) =>
      currentValue ? { ...currentValue, [field]: value } : currentValue,
    );
  }

  function toggleDraftPresent(isPresent: boolean) {
    setDraftExperience((currentValue) =>
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

    setDraftExperience((currentValue) =>
      currentValue
        ? {
            ...currentValue,
            achievements: achievementLines.length > 0 ? achievementLines : [""],
          }
        : currentValue,
    );
  }

  function saveDraftExperience() {
    if (!draftExperience) {
      return;
    }

    const normalizedExperience: WorkExperienceItem = {
      ...draftExperience,
      companyName: draftExperience.companyName.trim(),
      roleTitle: draftExperience.roleTitle.trim(),
      location: draftExperience.location.trim(),
      startDate: draftExperience.startDate.trim(),
      endDate: draftExperience.isPresent ? "" : draftExperience.endDate.trim(),
      isPresent: draftExperience.isPresent,
      achievements: draftExperience.achievements
        .map((entry) => entry.trim())
        .filter(Boolean),
    };

    if (
      !normalizedExperience.companyName ||
      !normalizedExperience.roleTitle ||
      !normalizedExperience.location ||
      !normalizedExperience.startDate ||
      (!normalizedExperience.isPresent && !normalizedExperience.endDate)
    ) {
      return;
    }

    onChange([...items, normalizedExperience]);
    setDraftExperience(null);
  }

  function startEditingExperience(index: number) {
    setEditingIndex(index);
    setEditingExperience({
      ...items[index],
      achievements: [...items[index].achievements],
    });
  }

  function updateEditingExperience(
    field: keyof Omit<WorkExperienceItem, "achievements">,
    value: string,
  ) {
    setEditingExperience((currentValue) =>
      currentValue ? { ...currentValue, [field]: value } : currentValue,
    );
  }

  function toggleEditingPresent(isPresent: boolean) {
    setEditingExperience((currentValue) =>
      currentValue
        ? {
            ...currentValue,
            isPresent,
            endDate: isPresent ? "" : currentValue.endDate,
          }
        : currentValue,
    );
  }

  function updateEditingAchievements(value: string) {
    const achievementLines = value
      .split("\n")
      .map((entry) => entry.replace(/^•\s*/, "").trim());

    setEditingExperience((currentValue) =>
      currentValue
        ? {
            ...currentValue,
            achievements: achievementLines.length > 0 ? achievementLines : [""],
          }
        : currentValue,
    );
  }

  function removeExperience(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));

    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingExperience(null);
      return;
    }

    if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  }

  function cancelEditingExperience() {
    setEditingIndex(null);
    setEditingExperience(null);
  }

  function saveEditingExperience() {
    if (editingIndex === null || !editingExperience) {
      return;
    }

    const normalizedExperience: WorkExperienceItem = {
      ...editingExperience,
      companyName: editingExperience.companyName.trim(),
      roleTitle: editingExperience.roleTitle.trim(),
      location: editingExperience.location.trim(),
      startDate: editingExperience.startDate.trim(),
      endDate: editingExperience.isPresent ? "" : editingExperience.endDate.trim(),
      isPresent: editingExperience.isPresent,
      achievements: editingExperience.achievements
        .map((entry) => entry.trim())
        .filter(Boolean),
    };

    if (
      !normalizedExperience.companyName ||
      !normalizedExperience.roleTitle ||
      !normalizedExperience.location ||
      !normalizedExperience.startDate ||
      (!normalizedExperience.isPresent && !normalizedExperience.endDate)
    ) {
      return;
    }

    onChange(
      items.map((item, itemIndex) =>
        itemIndex === editingIndex ? normalizedExperience : item,
      ),
    );

    setEditingIndex(null);
    setEditingExperience(null);
  }

  return (
    <SectionCard
      action={
        <button
          className={styles["work-experience__header-action"]}
          onClick={() => setDraftExperience({ ...EMPTY_EXPERIENCE })}
          type="button"
        >
          <Icon name="add_circle" />
          <span>Add Experience</span>
        </button>
      }
      icon={<Icon name="work" />}
      title="Work Experience"
    >
      <div className={styles["work-experience"]}>
        {!draftExperience && items.length === 0 ? (
          <p className={styles["work-experience__empty"]}>
            No work experience added yet.
          </p>
        ) : null}

        {draftExperience ? (
          <article
            className={`${styles["work-experience__item"]} ${styles["work-experience__item--draft"]}`}
          >
            <div className={styles["work-experience__draft-badge"]}>
              New Experience
            </div>

            <div className={styles["work-experience__grid"]}>
              <label className={styles["work-experience__field"]}>
                <span>Company Name</span>
                <input
                  onChange={(event) =>
                    updateDraftExperience("companyName", event.target.value)
                  }
                  placeholder="Enter company name"
                  type="text"
                  value={draftExperience.companyName}
                />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Role / Title</span>
                <input
                  onChange={(event) =>
                    updateDraftExperience("roleTitle", event.target.value)
                  }
                  placeholder="Enter role title"
                  type="text"
                  value={draftExperience.roleTitle}
                />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Location</span>
                <input
                  onChange={(event) =>
                    updateDraftExperience("location", event.target.value)
                  }
                  placeholder="Enter location"
                  type="text"
                  value={draftExperience.location}
                />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Dates</span>
                <div className={styles["work-experience__dates"]}>
                  <MonthInput
                    onChange={(event) =>
                      updateDraftExperience("startDate", event.target.value)
                    }
                    value={draftExperience.startDate}
                  />
                  <span>—</span>
                  <MonthInput
                    disabled={draftExperience.isPresent}
                    onChange={(event) =>
                      updateDraftExperience("endDate", event.target.value)
                    }
                    value={draftExperience.endDate}
                  />
                </div>
                <label className={styles["work-experience__present-toggle"]}>
                  <input
                    checked={draftExperience.isPresent}
                    onChange={(event) => toggleDraftPresent(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Present</span>
                </label>
              </label>
            </div>

            <label className={styles["work-experience__achievements"]}>
              <span>Key Achievements</span>
              <textarea
                onChange={(event) => updateDraftAchievements(event.target.value)}
                placeholder={"• Add a measurable achievement\n• Add another impact point"}
                rows={4}
                value={draftExperience.achievements
                  .filter((entry, index, entries) => entry || entries.length === 1)
                  .map((entry) => (entry ? `• ${entry}` : ""))
                  .join("\n")}
              />
            </label>

            <div className={styles["work-experience__draft-actions"]}>
              <button
                className={styles["work-experience__cancel"]}
                onClick={() => setDraftExperience(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className={styles["work-experience__save"]}
                onClick={saveDraftExperience}
                type="button"
              >
                Add Experience
              </button>
            </div>
          </article>
        ) : null}

        {items.map((item, index) =>
          editingIndex === index && editingExperience ? (
            <article
              key={`${item.companyName}-${item.roleTitle}`}
              className={`${styles["work-experience__item"]} ${styles["work-experience__item--draft"]}`}
            >
              <div className={styles["work-experience__draft-badge"]}>
                Edit Experience
              </div>

              <div className={styles["work-experience__grid"]}>
                <label className={styles["work-experience__field"]}>
                  <span>Company Name</span>
                  <input
                    onChange={(event) =>
                      updateEditingExperience("companyName", event.target.value)
                    }
                    type="text"
                    value={editingExperience.companyName}
                  />
                </label>
                <label className={styles["work-experience__field"]}>
                  <span>Role / Title</span>
                  <input
                    onChange={(event) =>
                      updateEditingExperience("roleTitle", event.target.value)
                    }
                    type="text"
                    value={editingExperience.roleTitle}
                  />
                </label>
                <label className={styles["work-experience__field"]}>
                  <span>Location</span>
                  <input
                    onChange={(event) =>
                      updateEditingExperience("location", event.target.value)
                    }
                    type="text"
                    value={editingExperience.location}
                  />
                </label>
                <label className={styles["work-experience__field"]}>
                  <span>Dates</span>
                  <div className={styles["work-experience__dates"]}>
                    <MonthInput
                      onChange={(event) =>
                        updateEditingExperience("startDate", event.target.value)
                      }
                      value={editingExperience.startDate}
                    />
                    <span>—</span>
                    <MonthInput
                      disabled={editingExperience.isPresent}
                      onChange={(event) =>
                        updateEditingExperience("endDate", event.target.value)
                      }
                      value={editingExperience.endDate}
                    />
                  </div>
                  <label className={styles["work-experience__present-toggle"]}>
                    <input
                      checked={editingExperience.isPresent}
                      onChange={(event) => toggleEditingPresent(event.target.checked)}
                      type="checkbox"
                    />
                    <span>Present</span>
                  </label>
                </label>
              </div>

              <label className={styles["work-experience__achievements"]}>
                <span>Key Achievements</span>
                <textarea
                  onChange={(event) => updateEditingAchievements(event.target.value)}
                  rows={4}
                  value={editingExperience.achievements
                    .filter((entry, itemIndex, entries) => entry || entries.length === 1)
                    .map((entry) => (entry ? `• ${entry}` : ""))
                    .join("\n")}
                />
              </label>

              <div className={styles["work-experience__draft-actions"]}>
                <button
                  className={styles["work-experience__cancel"]}
                  onClick={cancelEditingExperience}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles["work-experience__save"]}
                  onClick={saveEditingExperience}
                  type="button"
                >
                  Done
                </button>
              </div>
            </article>
          ) : (
            <article
              key={`${item.companyName}-${item.roleTitle}`}
              className={styles["work-experience__display-card"]}
            >
              <div className={styles["work-experience__content"]}>
                <p className={styles["work-experience__company"]}>{item.companyName}</p>
                <p className={styles["work-experience__meta"]}>
                  {item.roleTitle} • {item.location}
                </p>
                <p className={styles["work-experience__meta"]}>
                  {item.startDate} - {item.isPresent ? "Present" : item.endDate}
                </p>
                {item.achievements.length > 0 ? (
                  <ul className={styles["work-experience__achievement-list"]}>
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className={styles["work-experience__toolbar"]}>
                <button
                  onClick={() => startEditingExperience(index)}
                  type="button"
                >
                  <Icon name="edit" />
                </button>
                <button onClick={() => removeExperience(index)} type="button">
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
