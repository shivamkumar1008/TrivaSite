"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@figma/astraui"
import { useSite } from "@/components/providers/SiteProvider"
import ButtonLink from "@/components/ui/ButtonLink"
import Wordmark from "@/components/ui/Wordmark"
import { navItems } from "@/data/site"

export default function Header() {
  const { openContact } = useSite()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="header">
      <div className="container nav-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(({ label, href }) => (
            <ButtonLink key={href} href={href} variant="subtle" aria-current={isActive(href) ? "page" : undefined}>
              {label}
              {href === "/services" && <span className="chevron"></span>}
            </ButtonLink>
          ))}
        </nav>
        <div className="nav-actions">
          <Button className="cta" onClick={openContact}>
            Let’s talk <span aria-hidden="true">↗</span>
          </Button>
          <Button
            variant="subtle"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(({ label, href }) => (
            <ButtonLink key={href} href={href} variant="subtle" aria-current={isActive(href) ? "page" : undefined}>
              {label} ↗
            </ButtonLink>
          ))}
        </nav>
      )}
    </header>
  )
}
