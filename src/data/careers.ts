import type { OpenRole } from "@/types"

/**
 * Open positions on /careers. Leave the list empty when nothing is open: the page then invites a
 * general application with a resume. Copy this shape to add a role:
 *
 * {
 *   slug: "frontend-developer",
 *   title: "Frontend Developer",
 *   type: "Full-time",
 *   location: "Remote · India",
 *   summary: "Build fast, accessible interfaces for our clients' web apps.",
 *   responsibilities: ["Build UI in React and Next.js", "Work closely with design"],
 *   requirements: ["2+ years with React", "A portfolio or GitHub we can look at"],
 * },
 */
export const openRoles: OpenRole[] = []

/** Public address for recruitment questions, shown on /careers. Keep it equal to CAREERS_TO_EMAIL. */
export const careersEmail = "careers@trivasite.co.in"

/** Value of the role picker when someone applies without a specific opening. */
export const GENERAL_APPLICATION = "General application"

/** Resume upload rules, checked in the browser and again on the server. Files must be smaller than maxBytes. */
export const resumeUpload = {
  maxBytes: 5 * 1024 * 1024,
  extensions: [".pdf", ".doc", ".docx"],
}

/** "Why TrivaSite" cards on /careers. */
export const careerValues = [
  {
    title: "Meaningful work",
    text: "Build real products for real businesses — websites, apps, AI and cloud systems people rely on every day.",
  },
  {
    title: "Learn every day",
    text: "Work across the stack and alongside people who share what they know, from design and code to cloud and data.",
  },
  {
    title: "Grow with us",
    text: "We’re a growing team. Bring ideas and ownership, and your role grows as TrivaSite does.",
  },
]
