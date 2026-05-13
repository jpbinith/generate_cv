"use client";

import { useState } from "react";
import { HttpClientError } from "@/lib/http-client";
import { getMasterProfileViewModel } from "@/modules/master-profile/services/masterProfileMockService";
import { saveMasterProfile } from "@/modules/master-profile/services/master-profile.service";
import { EducationSection } from "@/modules/master-profile/components/EducationSection";
import { PersonalInformationSection } from "@/modules/master-profile/components/PersonalInformationSection";
import { ProfessionalSummarySection } from "@/modules/master-profile/components/ProfessionalSummarySection";
import { ProgressOverview } from "@/modules/master-profile/components/ProgressOverview";
import { SkillsSection } from "@/modules/master-profile/components/SkillsSection";
import { StickySaveBar } from "@/modules/master-profile/components/StickySaveBar";
import { WorkExperienceSection } from "@/modules/master-profile/components/WorkExperienceSection";
import type {
  EducationItem,
  MasterProfileFormData,
  MasterProfileViewModel,
  PersonalInfo,
  WorkExperienceItem,
} from "@/modules/master-profile/types/master-profile.types";
import styles from "./page.module.scss";

function toFormData(viewModel: MasterProfileViewModel): MasterProfileFormData {
  return {
    personalInfo: { ...viewModel.personalInfo },
    summarySuggestion: viewModel.summarySuggestion,
    professionalSummary: viewModel.professionalSummary,
    workExperience: viewModel.workExperience.map((item) => ({
      ...item,
      achievements: [...item.achievements],
    })),
    education: viewModel.education.map((item) => ({ ...item })),
    skillGroups: viewModel.skillGroups.map((group) => ({
      ...group,
      items: [...group.items],
    })),
  };
}

export default function MasterProfilePage() {
  const [viewModel] = useState(() => getMasterProfileViewModel());
  const [savedFormData, setSavedFormData] = useState(() => toFormData(viewModel));
  const [formData, setFormData] = useState(() => toFormData(viewModel));
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);

  function markDirty() {
    setIsDirty(true);
    setSaveErrorMessage(null);
  }

  function updatePersonalInfo(field: keyof PersonalInfo, value: string) {
    setFormData((currentValue) => ({
      ...currentValue,
      personalInfo: {
        ...currentValue.personalInfo,
        [field]: value,
      },
    }));
    markDirty();
  }

  function updateProfessionalSummary(value: string) {
    setFormData((currentValue) => ({
      ...currentValue,
      professionalSummary: value,
    }));
    markDirty();
  }

  function updateWorkExperience(items: WorkExperienceItem[]) {
    setFormData((currentValue) => ({
      ...currentValue,
      workExperience: items,
    }));
    markDirty();
  }

  function updateEducation(items: EducationItem[]) {
    setFormData((currentValue) => ({
      ...currentValue,
      education: items,
    }));
    markDirty();
  }

  function handleDiscardChanges() {
    setFormData(savedFormData);
    setFormVersion((currentValue) => currentValue + 1);
    setIsDirty(false);
    setSaveErrorMessage(null);
  }

  async function handleSaveChanges() {
    setIsSaving(true);
    setSaveErrorMessage(null);

    try {
      await saveMasterProfile(formData);

      setSavedFormData(formData);
      setIsDirty(false);
    } catch (error: unknown) {
      if (error instanceof HttpClientError) {
        setSaveErrorMessage(error.message);
      } else {
        setSaveErrorMessage("Unable to save changes right now.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles["master-profile"]}>
      <ProgressOverview data={viewModel.progressOverview} />
      <div
        key={formVersion}
        className={styles["master-profile__form-stack"]}
      >
        <PersonalInformationSection
          onChange={updatePersonalInfo}
          personalInfo={formData.personalInfo}
        />
        <ProfessionalSummarySection
          onChange={updateProfessionalSummary}
          suggestion={formData.summarySuggestion}
          summary={formData.professionalSummary}
        />
        <WorkExperienceSection
          items={formData.workExperience}
          onChange={updateWorkExperience}
        />
        <EducationSection
          items={formData.education}
          onChange={updateEducation}
        />
        <SkillsSection groups={formData.skillGroups} />
      </div>
      {isDirty ? (
        <StickySaveBar
          statusText={saveErrorMessage ?? "You have unsaved changes"}
          isSaving={isSaving}
          onDiscard={handleDiscardChanges}
          onSave={handleSaveChanges}
        />
      ) : null}
    </div>
  );
}
