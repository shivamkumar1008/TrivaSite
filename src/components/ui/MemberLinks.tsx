import { displayUrl } from "@/data/team"
import { cn } from "@/lib/cn"
import type { TeamMember } from "@/types"

/** A team member's LinkedIn, email and (optional) portfolio links. */
export default function MemberLinks({ member, className }: { member: TeamMember; className?: string }) {
  const external = { target: "_blank", rel: "noopener noreferrer" }

  return (
    <ul className={cn("member-links", className)} aria-label={`Contact ${member.name}`}>
      <li>
        <a href={member.linkedin} {...external}>
          LinkedIn <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a href={`mailto:${member.email}`}>{member.email}</a>
      </li>
      {member.portfolio && (
        <li>
          <a href={member.portfolio} {...external}>
            {displayUrl(member.portfolio)} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      )}
    </ul>
  )
}
