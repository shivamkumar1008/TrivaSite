"use client"

import { usePathname } from "next/navigation"
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider"
import ButtonLink from "@/components/ui/ButtonLink"
import BrandSymbol from "@/components/ui/BrandSymbol"

export default function Wordmark() {
  const pathname = usePathname()
  const { scrollTo } = useSmoothScroll()

  return (
    <ButtonLink
      href="/"
      variant="subtle"
      className="wordmark"
      aria-label="TrivaSite home"
      onClick={(e) => {
        // Already home: glide back to the top instead of re-navigating.
        if (pathname === "/") {
          e.preventDefault()
          scrollTo(0)
        }
      }}
    >
      <BrandSymbol className="brand-mark" />
      <span>
        TrivaSite<span className="brand-period">.</span>
      </span>
    </ButtonLink>
  )
}
