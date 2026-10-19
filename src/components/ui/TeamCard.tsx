import Image from "next/image"
import Link from "next/link"
import { teamHref } from "@/data/team"
import { cn } from "@/lib/cn"
import type { TeamMember } from "@/types"

type TeamCardProps = {
  member: TeamMember
  /** Passed to next/image; describe how wide the card is at each breakpoint. */
  sizes: string
  className?: string
}

/** Black-and-white portrait card with the member's quote; links to their profile. */
export default function TeamCard({ member, sizes, className }: TeamCardProps) {
  return (
    <Link href={teamHref(member.slug)} className={cn("team-card", className)}>
      <figure>
        {/* The name is in the caption, so the photo itself is decorative. */}
        <Image src={member.photo} alt="" fill sizes={sizes} />
        <figcaption>
          <span className="team-card-name">{member.name}</span>
          <strong>{member.quote}</strong>
          <span>{member.caption}</span>
        </figcaption>
      </figure>
    </Link>
  )
}
