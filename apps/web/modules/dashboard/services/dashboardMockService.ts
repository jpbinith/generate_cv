import type { DashboardViewModel } from "../types/dashboard.types";

export function getDashboardViewModel(): DashboardViewModel {
  return {
    navigationItems: [
      { href: "/dashboard", label: "Dashboard", icon: "dashboard", active: true },
      {
        href: "/master-profile",
        label: "Master Profile",
        icon: "account_circle",
      },
      { href: "#", label: "CV History", icon: "history" },
      { href: "#", label: "Templates", icon: "description" },
    ],
    topBarTitle: "Generator Dashboard",
    searchPlaceholder: "Search CVs...",
    jobDescription:
      "We are seeking a Senior Solutions Architect to lead cloud modernization programs, shape technical roadmaps, and align engineering delivery with business stakeholders. The ideal candidate brings deep AWS experience, strong Agile leadership, and an ability to translate platform decisions into measurable business outcomes.",
    extractedKeywords: [
      { label: "Cloud Architecture" },
      { label: "Agile Leadership" },
      { label: "Stakeholder Management" },
      { label: "Python" },
      { label: "Data Governance" },
    ],
    profileSelections: [
      {
        id: "techcorp",
        title: "Senior Solutions Architect @ TechCorp",
        description:
          "Led migration of legacy systems to AWS, resulting in 40% cost reduction.",
        selected: true,
      },
      {
        id: "dataviz",
        title: "Open Source Project: DataViz Library",
        description:
          "Built a React-based visualization library with 5k+ GitHub stars.",
        selected: true,
      },
      {
        id: "pmp",
        title: "Certification: PMP Leadership",
        selected: false,
      },
      {
        id: "startup",
        title: "Junior Web Developer @ StartUp Inc",
        selected: false,
        muted: true,
      },
    ],
    generationEstimate: "Estimated time: 15 seconds",
    previewName: "ALEX R. STERLING",
    previewRole: "SENIOR SOLUTIONS ARCHITECT",
    previewInsight:
      'Your "Cloud Architecture" experience matches 92% of the requirements. Keep it as the first item.',
    previewLineGroups: [
      { id: "line-1", width: "full" },
      { id: "line-2", width: "three-quarter" },
      { id: "line-3", width: "full", offsetTop: true },
      { id: "line-4", width: "full" },
      { id: "line-5", width: "full" },
      { id: "line-6", width: "half" },
    ],
    templates: [
      { id: "modern", title: "Modern", active: true, accent: "primary" },
      { id: "executive", title: "Executive", accent: "secondary" },
      { id: "creative", title: "Creative", accent: "tertiary" },
      { id: "new", title: "New", accent: "neutral" },
    ],
  };
}
