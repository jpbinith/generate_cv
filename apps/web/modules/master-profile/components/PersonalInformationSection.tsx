import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import type { PersonalInfo } from "../types/master-profile.types";
import styles from "./PersonalInformationSection.module.scss";

interface PersonalInformationSectionProps {
  personalInfo: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

export function PersonalInformationSection({
  personalInfo,
  onChange,
}: PersonalInformationSectionProps) {
  return (
    <SectionCard icon={<Icon name="person" />} title="Personal Information">
      <div className={styles["personal-information"]}>
        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>Full Name</span>
          <input
            onChange={(event) => onChange("fullName", event.target.value)}
            type="text"
            value={personalInfo.fullName}
          />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>Email Address</span>
          <input
            onChange={(event) => onChange("email", event.target.value)}
            type="email"
            value={personalInfo.email}
          />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>Phone Number</span>
          <input
            onChange={(event) => onChange("phone", event.target.value)}
            type="tel"
            value={personalInfo.phone}
          />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>
            LinkedIn Profile URL
          </span>
          <input
            onChange={(event) => onChange("linkedInUrl", event.target.value)}
            type="url"
            value={personalInfo.linkedInUrl}
          />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>
            GitHub Profile URL
          </span>
          <input
            onChange={(event) => onChange("githubUrl", event.target.value)}
            type="url"
            value={personalInfo.githubUrl}
          />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>
            Medium Profile URL
          </span>
          <input
            onChange={(event) => onChange("mediumUrl", event.target.value)}
            type="url"
            value={personalInfo.mediumUrl}
          />
        </label>
      </div>
    </SectionCard>
  );
}
