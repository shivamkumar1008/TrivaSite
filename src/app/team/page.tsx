import type { Metadata } from "next"
import ContactCta from "@/components/sections/ContactCta"
import MemberLinks from "@/components/ui/MemberLinks"
import PageHero from "@/components/ui/PageHero"
import TeamCard from "@/components/ui/TeamCard"
import { team } from "@/data/team"

export const metadata: Metadata = {
  title: "Our team",
  description: "Meet the people behind TrivaSite — the team who plan, design, build, and support your software.",
}

export default function TeamPage() {
  return (
    <>
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
