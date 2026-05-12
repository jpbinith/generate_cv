import { Icon } from "@/components/ui/Icon";
import { SectionCard } from "./SectionCard";
import type { PersonalInfo } from "../types/cv-generator.types";
import styles from "./PersonalInformationSection.module.scss";

interface PersonalInformationSectionProps {
  emailHelperText: string;
  personalInfo: PersonalInfo;
}

export function PersonalInformationSection({
  emailHelperText,
  personalInfo,
}: PersonalInformationSectionProps) {
  return (
    <SectionCard icon={<Icon name="person" />} title="Personal Information">
      <div className={styles["personal-information"]}>
        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>Full Name</span>
          <input defaultValue={personalInfo.fullName} type="text" />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label-row"]}>
            <span className={styles["personal-information__label"]}>Email Address</span>
            <span title={emailHelperText}>
              <Icon name="info" />
            </span>
          </span>
          <input defaultValue={personalInfo.email} type="email" />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>Phone Number</span>
          <input defaultValue={personalInfo.phone} type="tel" />
        </label>

        <label className={styles["personal-information__field"]}>
          <span className={styles["personal-information__label"]}>
            LinkedIn Profile URL
          </span>
          <input defaultValue={personalInfo.linkedInUrl} type="url" />
        </label>
      </div>
    </SectionCard>
  );
}
