import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import type { SkillGroup } from "../types/master-profile.types";
import styles from "./SkillsSection.module.scss";

interface SkillsSectionProps {
  groups: SkillGroup[];
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <SectionCard
      icon={<Icon name="auto_fix_high" />}
      title="Skills & Competencies"
    >
      <div className={styles["skills-section"]}>
        {groups.map((group) => (
          <div key={group.title} className={styles["skills-section__group"]}>
            <label className={styles["skills-section__group-title"]}>
              {group.title}
            </label>
            <div className={styles["skills-section__chips"]}>
              {group.items.map((item) => (
                <span
                  key={item}
                  className={`${styles["skills-section__chip"]} ${
                    group.tone === "tertiary"
                      ? styles["skills-section__chip--tertiary"]
                      : ""
                  }`}
                >
                  <span>{item}</span>
                  <button type="button">
                    <Icon name="close" />
                  </button>
                </span>
              ))}
              <button
                className={`${styles["skills-section__add"]} ${
                  group.tone === "tertiary"
                    ? styles["skills-section__add--tertiary"]
                    : ""
                }`}
                type="button"
              >
                {group.addLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
