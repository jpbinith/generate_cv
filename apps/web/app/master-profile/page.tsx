"use client";

import { getMasterProfileViewModel } from "@/modules/master-profile/services/masterProfileMockService";
import { EducationSection } from "@/modules/master-profile/components/EducationSection";
import { PersonalInformationSection } from "@/modules/master-profile/components/PersonalInformationSection";
import { ProfessionalSummarySection } from "@/modules/master-profile/components/ProfessionalSummarySection";
import { ProgressOverview } from "@/modules/master-profile/components/ProgressOverview";
import { SkillsSection } from "@/modules/master-profile/components/SkillsSection";
import { StickySaveBar } from "@/modules/master-profile/components/StickySaveBar";
import { WorkExperienceSection } from "@/modules/master-profile/components/WorkExperienceSection";
import styles from "./page.module.scss";

export default function MasterProfilePage() {
  const viewModel = getMasterProfileViewModel();

  return (
    <div className={styles["master-profile"]}>
      <ProgressOverview data={viewModel.progressOverview} />
      <div className={styles["master-profile__form-stack"]}>
        <PersonalInformationSection
          emailHelperText={viewModel.emailHelperText}
          personalInfo={viewModel.personalInfo}
        />
        <ProfessionalSummarySection
          suggestion={viewModel.summarySuggestion}
          summary={viewModel.professionalSummary}
        />
        <WorkExperienceSection items={viewModel.workExperience} />
        <EducationSection items={viewModel.education} />
        <SkillsSection groups={viewModel.skillGroups} />
      </div>
      <StickySaveBar autosaveLabel={viewModel.autosaveLabel} />
    </div>
  );
}
