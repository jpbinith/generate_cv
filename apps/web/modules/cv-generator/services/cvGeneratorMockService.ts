import type { CvGeneratorViewModel } from "../types/cv-generator.types";

export function getCvGeneratorViewModel(): CvGeneratorViewModel {
  return {
    navigationItems: [
      { label: "Dashboard", icon: "dashboard", active: true },
      { label: "Master Profile", icon: "account_circle" },
      { label: "CV History", icon: "history" },
      { label: "Templates", icon: "description" },
    ],
    keywords: [
      "Cloud Architecture",
      "Agile Leadership",
      "Stakeholder Management",
      "Python",
      "Data Governance",
    ],
    profileSelections: [
      {
        title: "Senior Solutions Architect @ TechCorp",
        description:
          "Led migration of legacy systems to AWS, resulting in 40% cost reduction.",
        checked: true,
      },
      {
        title: "Open Source Project: DataViz Library",
        description:
          "Built a React-based visualization library with 5k+ GitHub stars.",
        checked: true,
      },
      {
        title: "Certification: PMP Leadership",
        checked: false,
      },
      {
        title: "Junior Web Developer @ StartUp Inc",
        checked: false,
        muted: true,
      },
    ],
    previewProfileName: "ALEX R. STERLING",
    previewProfileTitle: "SENIOR SOLUTIONS ARCHITECT",
    templates: [
      {
        title: "Modern template",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC35ktq3iyUo6YnrqulI0rwXmr1_wMNCIhy6aof0g0Wijor_g7M80Jm6k-RnWSH6c7dhZ7c6Kd1AEU99PR7H8nsQaTUfDFUeOt9JeI4UHiyJ3zt8OGYPypsSFKs8o9EIfIxz_DQrk89RbVT96VyOq-Y0USedTZ9e0rLU5mwmKe6Hjr7zypglDPy0PwVgyIsMkOxsgA41Bm-cmDZnxqRwWDQ753BCizw_PEQ8Kk0euwAeicNu1qtwHeRcJ-4cLsUt9YKUv3j31meTcJr",
        active: true,
      },
      {
        title: "Executive template",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkOYBWoasCaSNiODhj8EmGmOzx_N8DKsa6-oPnryoAdG0jCGKhG8dlV0ZTkD5CcpymlyO2cNs_4u462ZFA3hZkwBEm2K_QKmiEIvAOhXi47FtfqcsF-3BgYuIIyLyuf5pSVGhUktai9nm7FxiQ0QJUmp-oHEZByFcQzL22UpMp4LXxAynwwotzzaxCmnXc8z8J4acjW_8fPETT1zrNwWbU7YOju5DjDyOclNsEBOVIPp07FCwxnEbJvwdkAUaq0OdLntFP-dPqXUZ7",
      },
      {
        title: "Creative template",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9sUwy2luSoMegjTsDZ2iG2QstRxt2xpNk_LRs_ElBSR5hPsr1LgxO5yZl3sn8LzLp8G1_0WNKspiA9Beyz4SpWe_I19P1ji6Ipw2IS68LEMQEGhsS9Hsj9ChUfvqaKRnkWaHIV7qxyqidLMx8agD_mlU9Nk2N1hSuluQdcVxv4wAtCCwjKyzlQQr0O0X2qQ1BUCi1n_-OcU_nGy9uc-naBeZGyhZycC7sfJfYp-FYqJtzOiVb9fox0XSErsV3BlLo90EFrWq2z4V1",
      },
    ],
  };
}
