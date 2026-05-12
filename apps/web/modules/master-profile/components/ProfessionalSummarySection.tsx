import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import styles from "./ProfessionalSummarySection.module.scss";

interface ProfessionalSummarySectionProps {
  suggestion: string;
  summary: string;
}

export function ProfessionalSummarySection({
  suggestion,
  summary,
}: ProfessionalSummarySectionProps) {
  return (
    <SectionCard
      icon={<Icon name="edit_note" />}
      title="Professional Summary"
    >
      <div className={styles["professional-summary"]}>
        {suggestion ? (
          <div className={styles["professional-summary__suggestion"]}>
            <Icon name="psychology" />
            <span>{suggestion}</span>
          </div>
        ) : null}
        <textarea
          defaultValue={summary}
          placeholder="Write a concise summary of your experience, strengths, and career focus."
          rows={6}
        />
      </div>
    </SectionCard>
  );
}
