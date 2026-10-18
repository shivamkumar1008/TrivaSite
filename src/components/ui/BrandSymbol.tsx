import { useId } from "react"

type BrandSymbolProps = {
  className?: string
}

/**
 * The TrivaSite mark — a "modular tile":
 * - the rounded tile stands for the apps and software products we build;
 * - its three modules for our service pillars: build (web, apps & design),
 *   intelligence (AI, agents & data science) and foundation (cloud, security & support);
 * - the gaps between the modules form a T for TrivaSite;
 * - the teal node where they meet for AI and integration — everything connected.
 * Keep in sync with public/favicon.svg and public/brand/trivasite-mark.svg.
 */
export default function BrandSymbol({ className }: BrandSymbolProps) {
  // Unique ids so several marks (header + footer) can share a page.
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const url = (name: string) => `url(#${id}-${name})`

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={`${id}-tile`}>
          <rect x="3" y="3" width="42" height="42" rx="13" />
        </clipPath>
        <linearGradient id={`${id}-build`} x1="3" y1="3" x2="45" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A86FF" />
          <stop offset="1" stopColor="#235CE1" />
        </linearGradient>
        <linearGradient id={`${id}-intelligence`} x1="3" y1="20" x2="22" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A63E8" />
          <stop offset="1" stopColor="#1C46B0" />
        </linearGradient>
        <linearGradient id={`${id}-foundation`} x1="26" y1="20" x2="45" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1F4BB8" />
          <stop offset="1" stopColor="#14306E" />
        </linearGradient>
      </defs>
      <g clipPath={url("tile")}>
        <rect width="48" height="16.5" fill={url("build")} />
        <rect y="20" width="22.25" height="28" fill={url("intelligence")} />
        <rect x="25.75" y="20" width="22.25" height="28" fill={url("foundation")} />
      </g>
      <circle cx="24" cy="18.25" r="3.6" fill="#fff" />
      <circle cx="24" cy="18.25" r="2.2" fill="#3FD0C9" />
    </svg>
  )
}
