"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { TopBar } from "@/components/layout/TopBar";
import { getMasterProfileViewModel } from "./services/masterProfileMockService";
import { EducationSection } from "./components/EducationSection";
import { PersonalInformationSection } from "./components/PersonalInformationSection";
import { ProfessionalSummarySection } from "./components/ProfessionalSummarySection";
import { ProgressOverview } from "./components/ProgressOverview";
import { SkillsSection } from "./components/SkillsSection";
import { StickySaveBar } from "./components/StickySaveBar";
import { WorkExperienceSection } from "./components/WorkExperienceSection";
import styles from "./MasterProfileModule.module.scss";

export function MasterProfileModule() {
  const viewModel = getMasterProfileViewModel();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <AppShell
      collapsed={isSidebarCollapsed}
      sidebar={
        <SidebarNav
          collapsed={isSidebarCollapsed}
          items={viewModel.navigationItems}
          onToggleCollapse={() =>
            setIsSidebarCollapsed((currentValue) => !currentValue)
          }
        />
      }
      topbar={<TopBar title={viewModel.topBarTitle} />}
    >
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
    </AppShell>
  );
}
