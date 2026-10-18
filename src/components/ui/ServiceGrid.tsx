import ButtonLink from "@/components/ui/ButtonLink"
import { serviceHref } from "@/data/services"
import type { Service } from "@/types"

export default function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="service-grid">
      {items.map((service) => (
        <article className="service-card" key={service.slug}>
          <div className="service-top">
            <span>{service.number} /</span>
            <span className="service-category">{service.category}</span>
          </div>
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.description}</p>
          <div className="service-tags">{service.tags}</div>
          <ButtonLink
            href={serviceHref(service.slug)}
            variant="subtle"
            className="service-link"
            aria-label={`Explore ${service.title}`}
          >
            Explore service <span aria-hidden="true">↗</span>
          </ButtonLink>
        </article>
      ))}
    </div>
  )
}
