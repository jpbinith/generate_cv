import type { MasterProfileViewModel } from "../types/master-profile.types";

export function getMasterProfileViewModel(): MasterProfileViewModel {
  return {
    navigationItems: [
      { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
      {
        href: "/master-profile",
        label: "Master Profile",
        icon: "account_circle",
        active: true,
      },
      { href: "#", label: "CV History", icon: "history" },
      { href: "#", label: "Templates", icon: "description" },
    ],
    topBarTitle: "Master Profile",
    progressOverview: {
      completionPercentage: 0,
      summary: "Start completing your profile to unlock tailored CV generation.",
      tipTitle: "Getting Started",
      tipText:
        "Add your personal information, experience, education, and skills to build your master profile.",
    },
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      linkedInUrl: "",
      githubUrl: "",
      mediumUrl: "",
    },
    emailHelperText:
      "Use a professional email address like name.surname@provider.com",
    summarySuggestion: "",
    professionalSummary: "",
    workExperience: [],
    education: [],
    skillGroups: [
      {
        title: "Technical Skills",
        tone: "primary",
        items: [],
        addLabel: "+ Add Skill",
      },
      {
        title: "Soft Skills",
        tone: "tertiary",
        items: [],
        addLabel: "+ Add Skill",
      },
    ],
    autosaveLabel: "No saved changes yet",
  };
}
