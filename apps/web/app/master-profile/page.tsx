"use client";

import { useState } from "react";
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
  const [isDirty, setIsDirty] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  function handleDirtyState() {
    setIsDirty(true);
  }

  function handleDiscardChanges() {
    setFormVersion((currentValue) => currentValue + 1);
    setIsDirty(false);
  }

  function handleSaveChanges() {
    setIsDirty(false);
  }

  return (
    <div className={styles["master-profile"]}>
      <ProgressOverview data={viewModel.progressOverview} />
      <div
        key={formVersion}
        className={styles["master-profile__form-stack"]}
        onChangeCapture={handleDirtyState}
      >
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
      {isDirty ? (
        <StickySaveBar
          autosaveLabel="You have unsaved changes"
          onDiscard={handleDiscardChanges}
          onSave={handleSaveChanges}
        />
      ) : null}
    </div>
  );
}
