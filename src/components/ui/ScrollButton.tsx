"use client"

import type { ComponentProps } from "react"
import { Button } from "@figma/astraui"
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider"

type ScrollButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  /** `#id` of the section to scroll to, or `0` for the top of the page. */
  to: string | number
}

/** An astraui <Button> that smooth-scrolls (via Lenis) within the current page. */
export default function ScrollButton({ to, ...props }: ScrollButtonProps) {
  const { scrollTo } = useSmoothScroll()
  return <Button {...props} onClick={() => scrollTo(to)} />
}
