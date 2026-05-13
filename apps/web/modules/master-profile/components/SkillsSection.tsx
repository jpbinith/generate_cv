import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import type { SkillGroup } from "../types/master-profile.types";
import styles from "./SkillsSection.module.scss";

interface SkillsSectionProps {
  groups: SkillGroup[];
  onChange: (groups: SkillGroup[]) => void;
}

const EMPTY_SKILL_GROUP: SkillGroup = {
  title: "",
  tone: "primary",
  items: [],
  addLabel: "+ Add Skill Category",
};

export function SkillsSection({ groups, onChange }: SkillsSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draftGroup, setDraftGroup] = useState<SkillGroup | null>(null);

  function startEditing(index: number) {
    setEditingIndex(index);
    setDraftGroup({
      ...groups[index],
      items: [...groups[index].items],
    });
  }

  function updateDraftTitle(title: string) {
    setDraftGroup((currentValue) =>
      currentValue ? { ...currentValue, title } : currentValue,
    );
  }

  function updateDraftItems(value: string) {
    const items = value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);

    setDraftGroup((currentValue) =>
      currentValue ? { ...currentValue, items } : currentValue,
    );
  }

  function addGroup() {
    const nextIndex = groups.length;

    onChange([...groups, { ...EMPTY_SKILL_GROUP }]);
    setEditingIndex(nextIndex);
    setDraftGroup({ ...EMPTY_SKILL_GROUP });
  }

  function removeGroup(index: number) {
    onChange(groups.filter((_, groupIndex) => groupIndex !== index));

    if (editingIndex === index) {
      setEditingIndex(null);
      setDraftGroup(null);
      return;
    }

    if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  }

  function saveGroup() {
    if (editingIndex === null || !draftGroup) {
      return;
    }

    const normalizedGroup: SkillGroup = {
      ...draftGroup,
      title: draftGroup.title.trim(),
      items: draftGroup.items.map((item) => item.trim()).filter(Boolean),
    };

    if (!normalizedGroup.title || normalizedGroup.items.length === 0) {
      return;
    }

    onChange(
      groups.map((group, groupIndex) =>
        groupIndex === editingIndex ? normalizedGroup : group,
      ),
    );
    setEditingIndex(null);
    setDraftGroup(null);
  }

  function cancelEditing() {
    if (editingIndex === null) {
      return;
    }

    const currentGroup = groups[editingIndex];
    const isUnsavedNewGroup =
      currentGroup.title === "" &&
      currentGroup.items.length === 0 &&
      currentGroup.addLabel === EMPTY_SKILL_GROUP.addLabel;

    if (isUnsavedNewGroup) {
      onChange(groups.filter((_, groupIndex) => groupIndex !== editingIndex));
    }

    setEditingIndex(null);
    setDraftGroup(null);
  }

  return (
    <SectionCard
      icon={<Icon name="auto_fix_high" />}
      title="Skills & Competencies"
    >
      <div className={styles["skills-section"]}>
        {groups.length === 0 ? (
          <p className={styles["skills-section__empty"]}>
            No skill categories added yet.
          </p>
        ) : null}

        {groups.map((group, index) => (
          editingIndex === index && draftGroup ? (
            <article
              key={`${group.title}-${index}`}
              className={styles["skills-section__group"]}
            >
              <div className={styles["skills-section__group-header"]}>
                <label className={styles["skills-section__field"]}>
                  <span>Category Title</span>
                  <input
                    onChange={(event) => updateDraftTitle(event.target.value)}
                    placeholder="e.g. Programming & Development"
                    type="text"
                    value={draftGroup.title}
                  />
                </label>
                <button
                  className={styles["skills-section__remove"]}
                  onClick={() => removeGroup(index)}
                  type="button"
                >
                  <Icon name="delete" />
                </button>
              </div>

              <label className={styles["skills-section__field"]}>
                <span>Skills</span>
                <textarea
                  onChange={(event) => updateDraftItems(event.target.value)}
                  placeholder="Java, TypeScript, Spring Boot, Node.js, Docker"
                  rows={3}
                  value={draftGroup.items.join(", ")}
                />
              </label>

              {draftGroup.title || draftGroup.items.length > 0 ? (
                <p className={styles["skills-section__preview"]}>
                  <strong>{draftGroup.title || "Skill Category"}:</strong>{" "}
                  {draftGroup.items.length > 0
                    ? draftGroup.items.join(", ")
                    : "Add comma-separated skills to build this section."}
                </p>
              ) : null}

              <div className={styles["skills-section__actions"]}>
                <button
                  className={styles["skills-section__cancel"]}
                  onClick={cancelEditing}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles["skills-section__save"]}
                  onClick={saveGroup}
                  type="button"
                >
                  Done
                </button>
              </div>
            </article>
          ) : (
            <article
              key={`${group.title}-${index}`}
              className={styles["skills-section__display-card"]}
            >
              <p className={styles["skills-section__preview"]}>
                <strong>{group.title || "Skill Category"}:</strong>{" "}
                {group.items.length > 0
                  ? group.items.join(", ")
                  : "No skills added yet."}
              </p>

              <div className={styles["skills-section__display-actions"]}>
                <button
                  className={styles["skills-section__icon-action"]}
                  onClick={() => startEditing(index)}
                  type="button"
                >
                  <Icon name="edit" />
                </button>
                <button
                  className={styles["skills-section__icon-action"]}
                  onClick={() => removeGroup(index)}
                  type="button"
                >
                  <Icon name="delete" />
                </button>
              </div>
            </article>
          )
        ))}

        <button
          className={styles["skills-section__add-group"]}
          onClick={addGroup}
          type="button"
        >
          <Icon name="add_circle" />
          <span>Add Skill Category</span>
        </button>
      </div>
    </SectionCard>
  );
}
