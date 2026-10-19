import { siInstagram, siWhatsapp } from "simple-icons"

export type Social = {
  name: string
  href: string
  /** SVG path on a 24×24 viewBox. */
  path: string
  /** Brand colour used on hover. */
  color: string
  viewBox?: string
}

// LinkedIn isn't in Simple Icons; this is Devicon's "linkedin-plain" (MIT).
const linkedinPath =
  "M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z"

const icon = (si: { title: string; path: string; hex: string }, href: string): Social => ({
  name: si.title,
  href,
  path: si.path,
  color: `#${si.hex}`,
})

// Material Design "mail" icon (Apache 2.0).
const mailPath =
  "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"

/** TrivaSite's profiles, shown in the footer in this order. Delete an entry to hide it. */
export const socials: Social[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/trivasite", path: linkedinPath, color: "#0A66C2", viewBox: "0 0 128 128" },
  icon(siInstagram, "https://www.instagram.com/trivasite"),
  { name: "Email", href: "mailto:connect@trivasite.co.in", path: mailPath, color: "#235CE1" },
  // wa.me needs the number with its country code (91 = India) and no "+" or spaces.
  icon(siWhatsapp, "https://wa.me/916200080587"),
]
