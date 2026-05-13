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
  function updateGroupTitle(index: number, title: string) {
    onChange(
      groups.map((group, groupIndex) =>
        groupIndex === index ? { ...group, title } : group,
      ),
    );
  }

  function updateGroupItems(index: number, value: string) {
    const items = value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);

    onChange(
      groups.map((group, groupIndex) =>
        groupIndex === index ? { ...group, items } : group,
      ),
    );
  }

  function addGroup() {
    onChange([...groups, { ...EMPTY_SKILL_GROUP }]);
  }

  function removeGroup(index: number) {
    onChange(groups.filter((_, groupIndex) => groupIndex !== index));
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
          <article
            key={`${group.title}-${index}`}
            className={styles["skills-section__group"]}
          >
            <div className={styles["skills-section__group-header"]}>
              <label className={styles["skills-section__field"]}>
                <span>Category Title</span>
                <input
                  onChange={(event) => updateGroupTitle(index, event.target.value)}
                  placeholder="e.g. Programming & Development"
                  type="text"
                  value={group.title}
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
                onChange={(event) => updateGroupItems(index, event.target.value)}
                placeholder="Java, TypeScript, Spring Boot, Node.js, Docker"
                rows={3}
                value={group.items.join(", ")}
              />
            </label>

            {group.title || group.items.length > 0 ? (
              <p className={styles["skills-section__preview"]}>
                <strong>{group.title || "Skill Category"}:</strong>{" "}
                {group.items.length > 0
                  ? group.items.join(", ")
                  : "Add comma-separated skills to build this section."}
              </p>
            ) : null}
          </article>
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
