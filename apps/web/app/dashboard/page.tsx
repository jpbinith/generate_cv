"use client";

import { JobDescriptionPanel } from "@/modules/dashboard/components/JobDescriptionPanel";
import { LivePreviewPanel } from "@/modules/dashboard/components/LivePreviewPanel";
import { ProfileSelectionPanel } from "@/modules/dashboard/components/ProfileSelectionPanel";
import { TemplateGallery } from "@/modules/dashboard/components/TemplateGallery";
import { getDashboardViewModel } from "@/modules/dashboard/services/dashboardMockService";
import styles from "./page.module.scss";

export default function DashboardPage() {
  const viewModel = getDashboardViewModel();

  return (
    <div className={styles.dashboard}>
      <div className={styles["dashboard__grid"]}>
        <div className={styles["dashboard__workflow"]}>
          <JobDescriptionPanel
            extractedKeywords={viewModel.extractedKeywords}
            jobDescription={viewModel.jobDescription}
          />
          <ProfileSelectionPanel
            generationEstimate={viewModel.generationEstimate}
            items={viewModel.profileSelections}
          />
        </div>

        <div className={styles["dashboard__preview-column"]}>
          <div className={styles["dashboard__preview-sticky"]}>
            <LivePreviewPanel
              previewInsight={viewModel.previewInsight}
              previewLineGroups={viewModel.previewLineGroups}
              previewName={viewModel.previewName}
              previewRole={viewModel.previewRole}
            />
            <TemplateGallery items={viewModel.templates} />
          </div>
        </div>
      </div>
    </div>
  );
}
