import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import ContactCta from "@/components/sections/ContactCta"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import ButtonLink from "@/components/ui/ButtonLink"
import MemberLinks from "@/components/ui/MemberLinks"
import TeamCard from "@/components/ui/TeamCard"
import { getTeamMember, team, teamHref } from "@/data/team"
import JsonLd from "@/components/seo/JsonLd"
import { breadcrumbSchema, personSchema } from "@/lib/jsonLd"
import { pageSeo } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return team.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) return {}
  return pageSeo({
    title: member.name,
    description: `${member.name}, TrivaSite — “${member.quote}” ${member.caption}.`,
    path: teamHref(slug),
    // Portraits in public/team/ are 960×1200 JPEGs.
    image: { url: member.photo, alt: `Portrait of ${member.name}`, width: 960, height: 1200 },
  })
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) notFound()

  const others = team.filter((m) => m.slug !== member.slug)

  return (
    <>
      <JsonLd
        schemas={[
          { "@type": "ProfilePage", mainEntity: personSchema(member) },
          breadcrumbSchema([
            { name: "Team", path: "/team" },
            { name: member.name, path: teamHref(slug) },
          ]),
        ]}
      />
      <section className="member-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Team", href: "/team" }, { label: member.name }]} />
          <div className="member-hero-grid">
            <div className="member-photo">
              <Image src={member.photo} alt={`Portrait of ${member.name}`} fill priority sizes="(max-width: 720px) 100vw, 40vw" />
            </div>
            <div>
              <div className="eyebrow">
                <span className="small-line" /> TEAM TRIVASITE
              </div>
              <h1 className="page-title">
                {member.name}
                <span className="brand-period">.</span>
              </h1>
              <p className="member-quote">“{member.quote}”</p>
              <p className="member-caption">{member.caption}</p>
              <MemberLinks member={member} />
              <div className="hero-actions">
                <ButtonLink href={`mailto:${member.email}`} className="cta">
                  Email {member.name.split(" ")[0]} <span aria-hidden="true">↗</span>
                </ButtonLink>
                <ButtonLink href="/team" variant="subtle" className="text-action">
                  Whole team <span aria-hidden="true">→</span>
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">OUR TEAM</div>
          <h2 className="section-title section-title-spaced">Meet the rest of the team.</h2>
          <ul className="team-grid team-grid-3">
            {others.map((m) => (
              <li className="team-member" key={m.slug}>
                <TeamCard member={m} sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
