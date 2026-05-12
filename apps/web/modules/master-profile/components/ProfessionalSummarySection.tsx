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
        <div className={styles["professional-summary__suggestion"]}>
          <Icon name="psychology" />
          <span>{suggestion}</span>
        </div>
        <textarea defaultValue={summary} rows={6} />
      </div>
    </SectionCard>
  );
}
