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

  function updateExistingExperience(
    index: number,
    field: keyof Omit<WorkExperienceItem, "achievements">,
    value: string,
  ) {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function toggleExistingPresent(index: number, isPresent: boolean) {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              isPresent,
              endDate: isPresent ? "" : item.endDate,
            }
          : item,
      ),
    );
  }

  function updateExistingAchievements(index: number, value: string) {
    const achievements = value
      .split("\n")
      .map((entry) => entry.replace(/^•\s*/, "").trim())
      .filter(Boolean);

    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, achievements } : item,
      ),
    );
  }

  function removeExperience(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
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

        {items.map((item, index) => (
          <article
            key={`${item.companyName}-${item.roleTitle}`}
            className={styles["work-experience__item"]}
          >
            <div className={styles["work-experience__toolbar"]}>
              <button type="button">
                <Icon name="drag_indicator" />
              </button>
              <button onClick={() => removeExperience(index)} type="button">
                <Icon name="delete" />
              </button>
            </div>

            <div className={styles["work-experience__grid"]}>
              <label className={styles["work-experience__field"]}>
                <span>Company Name</span>
                <input
                  onChange={(event) =>
                    updateExistingExperience(
                      index,
                      "companyName",
                      event.target.value,
                    )
                  }
                  type="text"
                  value={item.companyName}
                />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Role / Title</span>
                <input
                  onChange={(event) =>
                    updateExistingExperience(index, "roleTitle", event.target.value)
                  }
                  type="text"
                  value={item.roleTitle}
                />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Location</span>
                <input
                  onChange={(event) =>
                    updateExistingExperience(index, "location", event.target.value)
                  }
                  type="text"
                  value={item.location}
                />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Dates</span>
                <div className={styles["work-experience__dates"]}>
                  <MonthInput
                    onChange={(event) =>
                      updateExistingExperience(index, "startDate", event.target.value)
                    }
                    value={item.startDate}
                  />
                  <span>—</span>
                  <MonthInput
                    disabled={item.isPresent}
                    onChange={(event) =>
                      updateExistingExperience(index, "endDate", event.target.value)
                    }
                    value={item.endDate}
                  />
                </div>
                <label className={styles["work-experience__present-toggle"]}>
                  <input
                    checked={item.isPresent}
                    onChange={(event) =>
                      toggleExistingPresent(index, event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span>Present</span>
                </label>
              </label>
            </div>

            <label className={styles["work-experience__achievements"]}>
              <span>Key Achievements</span>
              <textarea
                onChange={(event) =>
                  updateExistingAchievements(index, event.target.value)
                }
                rows={4}
                value={item.achievements.map((entry) => `• ${entry}`).join("\n")}
              />
            </label>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
