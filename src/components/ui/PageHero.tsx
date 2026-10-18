import type { ReactNode } from "react"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  breadcrumbs: { label: string; href?: string }[]
  /** Optional actions (buttons/links) under the intro. */
  children?: ReactNode
}

/** Header band for inner pages, matching the home hero's look. */
export default function PageHero({ eyebrow, title, intro, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        <div className="eyebrow">
          <span className="small-line" /> {eyebrow}
        </div>
        <h1 className="page-title">{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
        {children && <div className="hero-actions">{children}</div>}
      </div>
    </section>
  )
}
