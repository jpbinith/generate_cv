import type { NavigationItem } from "@/components/layout/layout.types";

export interface KeywordItem {
  label: string;
}

export interface SelectionItem {
  id: string;
  title: string;
  description?: string;
  selected: boolean;
  muted?: boolean;
}

export interface TemplatePreviewItem {
  id: string;
  title: string;
  active?: boolean;
  accent: "primary" | "secondary" | "tertiary" | "neutral";
}

export interface PreviewLineGroup {
  id: string;
  width: "full" | "three-quarter" | "half";
  offsetTop?: boolean;
}

export interface DashboardViewModel {
  navigationItems: NavigationItem[];
  topBarTitle: string;
  searchPlaceholder: string;
  jobDescription: string;
  extractedKeywords: KeywordItem[];
  profileSelections: SelectionItem[];
  generationEstimate: string;
  previewName: string;
  previewRole: string;
  previewInsight: string;
  previewLineGroups: PreviewLineGroup[];
  templates: TemplatePreviewItem[];
}
