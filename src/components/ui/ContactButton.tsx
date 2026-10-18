"use client"

import type { ComponentProps } from "react"
import { Button } from "@figma/astraui"
import { useSite } from "@/components/providers/SiteProvider"

/** An astraui <Button> that opens the contact modal; usable from server components. */
export default function ContactButton(props: Omit<ComponentProps<typeof Button>, "onClick">) {
  const { openContact } = useSite()
  return <Button {...props} onClick={openContact} />
}
