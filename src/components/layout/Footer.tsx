import ButtonLink from "@/components/ui/ButtonLink"
import ContactButton from "@/components/ui/ContactButton"
import ScrollButton from "@/components/ui/ScrollButton"
import SocialLinks from "@/components/ui/SocialLinks"
import Wordmark from "@/components/ui/Wordmark"
import { footerColumns } from "@/data/footer"

export default function Footer() {
  return (
    <footer className="expanded-footer">
      <div className="container footer-directory">
        <div className="footer-story">
          <Wordmark />
          <div>
            A technology partner for everything you’re building. We bring strategy, design, and
            engineering together to help your business move forward with confidence.
          </div>
          <div>
            From websites and mobile apps to intelligent agents, cloud infrastructure, and data
            platforms, we turn complex challenges into thoughtful, dependable software.
          </div>
          <div>
            Whether you’re starting something new or reimagining what’s possible, our approach
            stays the same: listen closely, build with purpose, and grow together.
          </div>
          <div className="footer-signoff">Your ambition. Our engineering.</div>
          <ContactButton variant="neutral">Start a conversation ↗</ContactButton>
        </div>

        {footerColumns.map((column, i) => (
          <div className="footer-link-column" key={i}>
            {column.map((group) => (
              <div className="footer-group" key={group.heading}>
                <div role="heading" aria-level={3}>
                  {group.heading}
                </div>
                {group.links.map(({ label, href }) => (
                  <ButtonLink key={label} href={href} variant="subtle">
                    {label}
                  </ButtonLink>
                ))}
              </div>
            ))}
            {i === footerColumns.length - 1 && (
              <div className="footer-group">
                <div role="heading" aria-level={3}>
                  LET’S CONNECT
                </div>
                <div className="footer-help">
                  An idea, a question, or a challenge?
                  <br />
                  We’d love to hear it.
                </div>
                <ContactButton variant="subtle">Tell us what’s next ↗</ContactButton>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="container footer-social">
        <div>
          <div className="footer-social-title">Follow TrivaSite</div>
          <div className="footer-social-text">Ideas, launches, and behind-the-scenes engineering.</div>
        </div>
        <nav aria-label="TrivaSite on social media">
          <SocialLinks />
        </nav>
      </div>

      <div className="container footer-inner">
        <div className="footer-brand">
          TrivaSite<span className="brand-period">.</span>
          <span>Thoughtfully built. Together.</span>
        </div>
        <span>© {new Date().getFullYear()} TrivaSite. All rights reserved.</span>
        <ScrollButton variant="subtle" to={0}>
          Back to top ↑
        </ScrollButton>
      </div>
    </footer>
  )
}
