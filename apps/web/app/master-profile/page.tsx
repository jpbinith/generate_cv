"use client";

import { useEffect, useState } from "react";
import { getMasterProfileViewModel } from "@/modules/master-profile/services/masterProfileMockService";
import {
  fetchMasterProfile,
  saveMasterProfile,
} from "@/modules/master-profile/services/master-profile.service";
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
  SkillGroup,
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function loadMasterProfile() {
      try {
        const result = await fetchMasterProfile();

        if (isCancelled) {
          return;
        }

        if (result.masterProfile) {
          setSavedFormData(result.masterProfile);
          setFormData(result.masterProfile);
        }
      } catch {
        if (isCancelled) {
          return;
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadMasterProfile();

    return () => {
      isCancelled = true;
    };
  }, []);

  function markDirty() {
    setIsDirty(true);
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

  function updateSkillGroups(skillGroups: SkillGroup[]) {
    setFormData((currentValue) => ({
      ...currentValue,
      skillGroups,
    }));
    markDirty();
  }

  function handleDiscardChanges() {
    setFormData(savedFormData);
    setFormVersion((currentValue) => currentValue + 1);
    setIsDirty(false);
  }

  async function handleSaveChanges() {
    setIsSaving(true);

    try {
      await saveMasterProfile(formData);

      setSavedFormData(formData);
      setIsDirty(false);
    } catch {
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
        <SkillsSection
          groups={formData.skillGroups}
          onChange={updateSkillGroups}
        />
      </div>
      {isLoading ? <p>Loading master profile...</p> : null}
      {isDirty ? (
        <StickySaveBar
          statusText="You have unsaved changes"
          isSaving={isSaving}
          onDiscard={handleDiscardChanges}
          onSave={handleSaveChanges}
        />
      ) : null}
    </div>
  );
}
