"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

type ScrollTarget = number | string | HTMLElement

type SmoothScrollContextValue = {
  /** Smoothly scroll to a position, `#id` selector, or element, leaving room for the sticky header. */
  scrollTo: (target: ScrollTarget) => void
  /** Pause / resume smooth scrolling of the page (e.g. while a modal is open). */
  stop: () => void
  start: () => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)
  if (!context) throw new Error("useSmoothScroll must be used inside <SmoothScrollProvider>")
  return context
}

/** Matches `scroll-padding-top` on <html> so Lenis lands headings below the sticky header. */
const headerOffset = () =>
  -(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      stopInertiaOnNavigate: true,
      // Wheel/touch over a scrollable box (textarea, dropdown list, logo row) scrolls that box, not the page.
      allowNestedScroll: true,
      // Let dialogs (astraui Modal renders role="dialog") scroll natively.
      prevent: (node) => node.getAttribute("role") === "dialog",
    })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((target: ScrollTarget) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : headerOffset() })
      return
    }
    // Fallback before Lenis has mounted.
    if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" })
    else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // After a route change Next.js has already moved the window; sync Lenis to it,
  // or follow the URL hash (e.g. /#services) once the new page has rendered.
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const lenis = lenisRef.current
    if (!lenis) return
    const { hash } = window.location
    if (hash && document.querySelector(hash)) {
      lenis.scrollTo(hash, { offset: headerOffset(), immediate: true, force: true })
    } else {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true })
    }
  }, [pathname])

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      scrollTo,
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [scrollTo],
  )

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}
