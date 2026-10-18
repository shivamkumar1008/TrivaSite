"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@figma/astraui"
import ButtonLink from "@/components/ui/ButtonLink"
import ContactButton from "@/components/ui/ContactButton"
import QuickIcon from "@/components/ui/QuickIcon"
import { heroQuickLinks, heroSlides } from "@/data/heroSlides"
import { unsplashUrl } from "@/data/portraits"

const AUTOPLAY_MS = 7000
const SWIPE_PX = 50

export default function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  // Hover / keyboard focus inside the hero pauses autoplay without changing the button state.
  const [interacting, setInteracting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = heroSlides.length

  const go = useCallback((index: number) => setActive((index + count) % count), [count])
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count])

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  const playing = !paused && !interacting && !reducedMotion
  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(next, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [playing, active, next])

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="What TrivaSite builds"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false)
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next()
        if (e.key === "ArrowLeft") prev()
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > SWIPE_PX) (dx < 0 ? next : prev)()
        touchX.current = null
      }}
    >
      <div className="hero-streaks" aria-hidden="true" />

      <div className="container hero-stage">
        <div className="hero-slides" aria-live={playing ? "off" : "polite"}>
          {heroSlides.map((slide, i) => {
            const isActive = i === active
            const Heading = i === 0 ? "h1" : "h2"
            return (
              <div
                key={slide.id}
                className="hero-slide"
                data-active={isActive || undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!isActive}
                inert={!isActive}
              >
                <div className="hero-copy">
                  <div className="eyebrow">
                    <span className="small-line" /> {slide.eyebrow}
                  </div>
                  <Heading className="hero-title">
                    <span className="hero-title-accent">{slide.accent}</span>
                    <br />
                    {slide.title}
                  </Heading>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-actions">
                    <ContactButton className="cta">
                      Build with us <span aria-hidden="true">↗</span>
                    </ContactButton>
                    <ButtonLink href={slide.href} variant="subtle" className="text-action">
                      {slide.linkLabel} <span aria-hidden="true">→</span>
                    </ButtonLink>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="hero-photo">
                    <Image
                      src={unsplashUrl(slide.image.id, 1200)}
                      alt={slide.image.alt}
                      fill
                      // Any slide can become the LCP image, so the visible slide and the next one
                      // load eagerly (the rest stay lazy); the first slide also gets high priority.
                      loading={i === active || i === (active + 1) % count ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : undefined}
                      sizes="(max-width: 720px) 90vw, 40vw"
                      style={{ objectPosition: slide.image.position }}
                    />
                  </div>
                  <div className="hero-card glass">
                    <span className="hero-card-label">{slide.card.label}</span>
                    <strong>{slide.card.title}</strong>
                  </div>
                  <ul className="hero-chips">
                    {slide.chips.map((chip) => (
                      <li key={chip} className="glass">
                        {chip}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={slide.href} variant="subtle" className="hero-pill" tabIndex={-1} aria-hidden>
                    {slide.pill} <span aria-hidden="true">↗</span>
                  </ButtonLink>
                </div>
              </div>
            )
          })}
        </div>

        <div className="hero-controls">
          <button type="button" className="hero-arrow hero-arrow-prev" onClick={prev} aria-label="Previous slide">
            <span aria-hidden="true">‹</span>
          </button>
          <div className="hero-dots" role="group" aria-label="Choose a slide">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className="hero-dot"
                aria-label={`Show slide ${i + 1}: ${slide.accent}`}
                aria-current={i === active || undefined}
                onClick={() => go(i)}
              >
                {i === active && playing && <span className="hero-dot-progress" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
              </button>
            ))}
          </div>
          <button type="button" className="hero-arrow hero-arrow-next" onClick={next} aria-label="Next slide">
            <span aria-hidden="true">›</span>
          </button>
          {!reducedMotion && (
            <Button variant="neutral" size="small" aria-pressed={paused} onClick={() => setPaused(!paused)}>
              {paused ? "Play" : "Pause"}
            </Button>
          )}
        </div>
      </div>

      <div className="container">
        <nav className="hero-quickbar" aria-label="Looking for a service?">
          <span className="hero-quickbar-label">
            <QuickIcon name="chat" /> Looking for a service?
          </span>
          <ul>
            {heroQuickLinks.map(({ label, href, icon }) => (
              <li key={label}>
                <ButtonLink href={href} variant="subtle" className="quick-chip">
                  <QuickIcon name={icon} /> {label}
                </ButtonLink>
              </li>
            ))}
            <li>
              <ContactButton variant="subtle" className="quick-chip">
                Something else? ↗
              </ContactButton>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}
