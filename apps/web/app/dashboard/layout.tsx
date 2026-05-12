"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { TopBar } from "@/components/layout/TopBar";
import { getDashboardViewModel } from "@/modules/dashboard/services/dashboardMockService";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const viewModel = getDashboardViewModel();

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
      topbar={
        <TopBar
          searchPlaceholder={viewModel.searchPlaceholder}
          title={viewModel.topBarTitle}
        />
      }
    >
      {children}
    </AppShell>
  );
}
