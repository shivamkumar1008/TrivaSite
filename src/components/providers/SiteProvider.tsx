"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { ThemeProvider } from "@figma/astraui"
import ContactModal from "@/components/modals/ContactModal"
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider"
import type { ContactBrief } from "@/types"

type SiteContextValue = {
  contactOpen: boolean
  openContact: () => void
  closeContact: () => void
  /** Index into `industries` of the active industry tab on the home page. */
  industry: number
  setIndustry: (index: number) => void
  /** The in-progress project brief, shared by the contact modal and /contact page. */
  brief: ContactBrief
  setBrief: (brief: ContactBrief) => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) throw new Error("useSite must be used inside <SiteProvider>")
  return context
}

export default function SiteProvider({ children }: { children: ReactNode }) {
  const { stop, start } = useSmoothScroll()
  const [contactOpen, setContactOpen] = useState(false)
  const [industry, setIndustry] = useState(0)
  const [brief, setBrief] = useState<ContactBrief>({ name: "", email: "", message: "" })

  // Freeze the page behind the modal; the dialog itself still scrolls natively.
  useEffect(() => {
    if (contactOpen) stop()
    else start()
  }, [contactOpen, stop, start])

  const value = useMemo<SiteContextValue>(
    () => ({
      contactOpen,
      openContact: () => setContactOpen(true),
      closeContact: () => setContactOpen(false),
      industry,
      setIndustry,
      brief,
      setBrief,
    }),
    [contactOpen, industry, brief],
  )

  return (
    <ThemeProvider>
      <SiteContext.Provider value={value}>
        {children}
        <ContactModal />
      </SiteContext.Provider>
    </ThemeProvider>
  )
}
