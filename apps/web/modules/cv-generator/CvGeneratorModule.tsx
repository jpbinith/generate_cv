"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { TopBar } from "@/components/layout/TopBar";
import { getCvGeneratorViewModel } from "./services/cvGeneratorMockService";
import { JobDescriptionPanel } from "./components/JobDescriptionPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { ProfileSelectionPanel } from "./components/ProfileSelectionPanel";
import styles from "./CvGeneratorModule.module.scss";

export function CvGeneratorModule() {
  const viewModel = getCvGeneratorViewModel();
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
      topbar={<TopBar />}
    >
      <div className={styles["cv-generator"]}>
        <div className={styles["cv-generator__workspace"]}>
          <JobDescriptionPanel keywords={viewModel.keywords} />
          <ProfileSelectionPanel items={viewModel.profileSelections} />
        </div>
        <PreviewPanel
          profileName={viewModel.previewProfileName}
          profileTitle={viewModel.previewProfileTitle}
          templates={viewModel.templates}
        />
      </div>
    </AppShell>
  );
}
