import type { TeamMember } from "@/types"

/**
 * The TrivaSite team, shown in the home page's portrait carousel, on /team and on each
 * /team/[slug] profile. Photos live in public/team/ as black-and-white 960×1200 JPEGs.
 */
export const team: TeamMember[] = [
  {
    slug: "utkarsh-jha",
    name: "Utkarsh Jha",
    photo: "/team/utkarsh-jha.jpg",
    quote: "Always one step ahead.",
    caption: "Solving tomorrow’s problems today",
    email: "work.utkarshjha@gmail.com",
    linkedin: "https://www.linkedin.com/in/utkarshjha-",
    portfolio: "https://utkarshjha.me",
  },
  {
    slug: "amrita-raj",
    name: "Amrita Raj",
    photo: "/team/amrita-raj.jpg",
    quote: "Details make the difference.",
    caption: "Crafting experiences people love to use",
    email: "amritaraj7050@gmail.com",
    linkedin: "https://www.linkedin.com/in/amrita-raj1502",
  },
  {
    slug: "shivam-kumar",
    name: "Shivam Kumar",
    photo: "/team/shivam-kumar.jpg",
    quote: "Built to last.",
    caption: "Engineering systems you can rely on",
    email: "shivamhursh@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivam-kumar-190208260",
    portfolio: "https://shivamwork.in",
  },
  {
    slug: "utkarsh-raj",
    name: "Utkarsh Raj",
    photo: "/team/utkarsh-raj.jpg",
    quote: "Ideas deserve to ship.",
    caption: "Turning bold ideas into working products",
    email: "work.utkarshraj@gmail.com",
    linkedin: "https://www.linkedin.com/in/utkarsh-raj-70203a253",
    portfolio: "https://utkarshraj.xyz",
  },
]

export const teamHref = (slug: string) => `/team/${slug}`

export const getTeamMember = (slug: string) => team.find((member) => member.slug === slug)

/** "utkarshjha.me" from "https://utkarshjha.me" — for showing a portfolio link. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
