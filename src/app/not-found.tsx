import type { Metadata } from "next"
import ButtonLink from "@/components/ui/ButtonLink"

// Next.js already emits `noindex` for not-found, so only the title is set here.
export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <div className="container">
        <div className="eyebrow">
          <span className="small-line" /> 404 — PAGE NOT FOUND
        </div>
        <h1 className="page-title">
          This page took a different path<span className="brand-period">.</span>
        </h1>
        <p className="page-intro">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="hero-actions">
          <ButtonLink href="/" className="cta">
            Back to home <span aria-hidden="true">↗</span>
          </ButtonLink>
          <ButtonLink href="/services" variant="subtle" className="text-action">
            Explore our services <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
