import type { GeneratedCV } from "@ai-cv/shared";

export function escapeLatex(value: string): string {
  return value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

export function renderLatex(cv: GeneratedCV): string {
  return `
\\documentclass[11pt]{article}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{${escapeLatex(cv.name)}}} \\\\
${escapeLatex(cv.title)} \\\\
${escapeLatex(cv.email || "")} ${cv.phone ? `| ${escapeLatex(cv.phone)}` : ""}
\\end{center}

\\section*{Professional Summary}
${escapeLatex(cv.summary)}

\\section*{Skills}
${cv.skills.map(escapeLatex).join(", ")}

\\section*{Experience}
${cv.experience
  .map(
    (exp) => `
\\textbf{${escapeLatex(exp.role)}} -- ${escapeLatex(exp.company)} \\\\
\\begin{itemize}[leftmargin=*]
${exp.bullets.map((b) => `\\item ${escapeLatex(b)}`).join("\n")}
\\end{itemize}
`
  )
  .join("\n")}

\\section*{Projects}
${cv.projects
  .map(
    (project) => `
\\textbf{${escapeLatex(project.name)}} \\\\
\\begin{itemize}[leftmargin=*]
${project.bullets.map((b) => `\\item ${escapeLatex(b)}`).join("\n")}
\\end{itemize}
`
  )
  .join("\n")}

\\end{document}
`;
}