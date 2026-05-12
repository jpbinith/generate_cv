import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import type { WorkExperienceItem } from "../types/cv-generator.types";
import styles from "./WorkExperienceSection.module.scss";

interface WorkExperienceSectionProps {
  items: WorkExperienceItem[];
}

export function WorkExperienceSection({ items }: WorkExperienceSectionProps) {
  return (
    <SectionCard
      action={
        <button className={styles["work-experience__header-action"]} type="button">
          <Icon name="add_circle" />
          <span>Add Experience</span>
        </button>
      }
      icon={<Icon name="work" />}
      title="Work Experience"
    >
      <div className={styles["work-experience"]}>
        {items.map((item) => (
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
                <span>Dates</span>
                <div className={styles["work-experience__dates"]}>
                  <input defaultValue={item.startDate} type="text" />
                  <span>—</span>
                  <input defaultValue={item.endDate} type="text" />
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
