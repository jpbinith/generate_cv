"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { TopBar } from "@/components/layout/TopBar";
import { getMasterProfileViewModel } from "@/modules/master-profile/services/masterProfileMockService";

interface MasterProfileLayoutProps {
  children: ReactNode;
}

export default function MasterProfileLayout({
  children,
}: MasterProfileLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const viewModel = getMasterProfileViewModel();

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
      {children}
    </AppShell>
  );
}
