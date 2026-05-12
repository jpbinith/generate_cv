export interface NavigationItem {
  label: string;
  icon: string;
  active?: boolean;
}

export interface ProfileSelectionItem {
  title: string;
  description?: string;
  checked: boolean;
  muted?: boolean;
}

export interface TemplateCard {
  title: string;
  src: string;
  active?: boolean;
}

export interface CvGeneratorViewModel {
  navigationItems: NavigationItem[];
  keywords: string[];
  profileSelections: ProfileSelectionItem[];
  previewProfileName: string;
  previewProfileTitle: string;
  templates: TemplateCard[];
}
