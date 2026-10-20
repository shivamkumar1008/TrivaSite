import type { Metadata } from "next"
import ContactCta from "@/components/sections/ContactCta"
import MemberLinks from "@/components/ui/MemberLinks"
import PageHero from "@/components/ui/PageHero"
import TeamCard from "@/components/ui/TeamCard"
import { team, teamHref } from "@/data/team"
import JsonLd from "@/components/seo/JsonLd"
import { breadcrumbSchema, collectionSchema } from "@/lib/jsonLd"
import { pageSeo } from "@/lib/seo"

const description =
  "Meet the people behind TrivaSite — the team who plan, design, build, and support your software."

export const metadata: Metadata = pageSeo({ title: "Our team", description, path: "/team" })

export default function TeamPage() {
  return (
    <>
      <JsonLd
        schemas={[
          collectionSchema(
            "Our team",
            description,
            "/team",
            team.map(({ name, slug }) => ({ name, path: teamHref(slug) })),
          ),
          breadcrumbSchema([{ name: "Team", path: "/team" }]),
        ]}
      />
      <PageHero
        eyebrow="OUR TEAM"
        title={
          <>
            The people behind TrivaSite<span className="brand-period">.</span>
          </>
        }
        intro="A small team of builders, designers, and problem-solvers who care about getting your project right."
        breadcrumbs={[{ label: "Team" }]}
      />

      <section className="section">
        <div className="container">
          <ul className="team-grid">
            {team.map((member) => (
              <li className="team-member" key={member.slug}>
                <TeamCard member={member} sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 25vw" />
                <MemberLinks member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta title="Want to work with us?" />
    </>
  )
}
