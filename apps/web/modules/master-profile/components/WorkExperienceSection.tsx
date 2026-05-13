import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import { MonthInput } from "./MonthInput";
import type { WorkExperienceItem } from "../types/master-profile.types";
import styles from "./WorkExperienceSection.module.scss";

interface WorkExperienceSectionProps {
  items: WorkExperienceItem[];
}

const EMPTY_EXPERIENCE: WorkExperienceItem = {
  companyName: "",
  roleTitle: "",
  location: "",
  startDate: "",
  endDate: "",
  achievements: [""],
};

export function WorkExperienceSection({ items }: WorkExperienceSectionProps) {
  const [experienceItems, setExperienceItems] = useState(items);
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
      endDate: draftExperience.endDate.trim(),
      achievements: draftExperience.achievements
        .map((entry) => entry.trim())
        .filter(Boolean),
    };

    if (
      !normalizedExperience.companyName ||
      !normalizedExperience.roleTitle ||
      !normalizedExperience.location ||
      !normalizedExperience.startDate ||
      !normalizedExperience.endDate
    ) {
      return;
    }

    setExperienceItems((currentValue) => [...currentValue, normalizedExperience]);
    setDraftExperience(null);
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
        {!draftExperience && experienceItems.length === 0 ? (
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
                    onChange={(event) =>
                      updateDraftExperience("endDate", event.target.value)
                    }
                    value={draftExperience.endDate}
                  />
                </div>
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
                Save Experience
              </button>
            </div>
          </article>
        ) : null}

        {experienceItems.map((item) => (
          <article
            key={`${item.companyName}-${item.roleTitle}`}
            className={styles["work-experience__item"]}
          >
            <div className={styles["work-experience__toolbar"]}>
              <button type="button">
                <Icon name="drag_indicator" />
              </button>
              <button type="button">
                <Icon name="delete" />
              </button>
            </div>

            <div className={styles["work-experience__grid"]}>
              <label className={styles["work-experience__field"]}>
                <span>Company Name</span>
                <input defaultValue={item.companyName} type="text" />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Role / Title</span>
                <input defaultValue={item.roleTitle} type="text" />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Location</span>
                <input defaultValue={item.location} type="text" />
              </label>
              <label className={styles["work-experience__field"]}>
                <span>Dates</span>
                <div className={styles["work-experience__dates"]}>
                  <MonthInput defaultValue={item.startDate} />
                  <span>—</span>
                  <MonthInput defaultValue={item.endDate} />
                </div>
              </label>
            </div>

            <label className={styles["work-experience__achievements"]}>
              <span>Key Achievements</span>
              <textarea
                defaultValue={item.achievements.map((entry) => `• ${entry}`).join("\n")}
                rows={4}
              />
            </label>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
