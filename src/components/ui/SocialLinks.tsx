import type { CSSProperties } from "react"
import { socials } from "@/data/socials"

/** Round social profile links; each lights up in its brand colour on hover/focus. */
export default function SocialLinks() {
  return (
    <ul className="social-links">
      {socials.map(({ name, href, path, color, viewBox = "0 0 24 24" }) => {
        // Email opens the visitor's mail app, so it stays in this tab.
        const isEmail = href.startsWith("mailto:")
        return (
          <li key={name}>
            <a
              href={href}
              {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="social-link"
              aria-label={isEmail ? `Email TrivaSite at ${href.slice(7)}` : `TrivaSite on ${name} (opens in a new tab)`}
              title={name}
              style={{ "--social-color": color } as CSSProperties}
            >
              <svg aria-hidden="true" focusable="false" viewBox={viewBox}>
                <path d={path} fill="currentColor" />
              </svg>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
