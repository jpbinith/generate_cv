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
      completionPercentage: 85,
      summary:
        "Complete your profile to generate high-impact resumes with one click.",
      tipTitle: "Tip of the day",
      tipText:
        "Quantify your achievements using percentages or dollar amounts to make your CV stand out to recruiters.",
    },
    personalInfo: {
      fullName: "Alexander Morgan",
      email: "a.morgan@professional.com",
      phone: "+1 (555) 012-3456",
      linkedInUrl: "linkedin.com/in/alexandermorgan",
    },
    emailHelperText:
      "Use a professional email address like name.surname@provider.com",
    summarySuggestion:
      'AI Suggestion: "Dynamic Marketing Executive with 10+ years experience..."',
    professionalSummary:
      "Dynamic and results-driven Senior Project Manager with over 8 years of experience in leading multi-disciplinary teams through complex software development lifecycles. Proven track record of delivering projects 15% under budget while maintaining 100% quality compliance. Expert in Agile methodologies and stakeholder management.",
    workExperience: [
      {
        companyName: "TechGlobal Systems",
        roleTitle: "Senior Project Manager",
        location: "San Francisco, CA",
        startDate: "Jan 2020",
        endDate: "Present",
        achievements: [
          "Managed a $2.5M digital transformation project for a Fortune 500 client.",
          "Increased team productivity by 25% through the implementation of new CI/CD workflows.",
          "Led a cross-functional team of 15 developers and designers.",
        ],
      },
      {
        companyName: "Innovate Solutions",
        roleTitle: "Project Coordinator",
        location: "Austin, TX",
        startDate: "Jun 2017",
        endDate: "Dec 2019",
        achievements: [
          "Coordinated release planning across distributed product and engineering teams.",
        ],
      },
    ],
    education: [
      {
        qualification: "M.S. in Software Engineering",
        institution: "Stanford University",
        period: "2016 - 2018",
      },
    ],
    skillGroups: [
      {
        title: "Technical Skills",
        tone: "primary",
        items: ["Agile Methodology", "Jira/Confluence", "Python", "SQL"],
        addLabel: "+ Add Skill",
      },
      {
        title: "Soft Skills",
        tone: "tertiary",
        items: ["Public Speaking", "Conflict Resolution"],
        addLabel: "+ Add Skill",
      },
    ],
    autosaveLabel: "Last autosaved 2 minutes ago",
  };
}
