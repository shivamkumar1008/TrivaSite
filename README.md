# TrivaSite

Marketing site for TrivaSite's software services, built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, the **@figma/astraui** component library and **Lenis** smooth scrolling. Tests run on **Vitest** (configured via `vitest.config.ts`, a Vite config).

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically generated)
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm test           # Vitest component tests
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://trivasite.com`) in production so the sitemap, robots.txt and metadata use the real domain.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home (all sections) |
| `/services` | Services overview |
| `/services/[slug]` | 10 service pages: `web-app-development`, `ai-automation`, `cloud-devops`, `data-science-analytics`, `ui-ux-design`, `enterprise-software`, `qa-testing`, `cybersecurity`, `digital-marketing`, `support-maintenance` (the old `/services/cloud-data-engineering` permanently redirects to `cloud-devops`) |
| `/industries` | Industries overview |
| `/industries/[slug]` | `financial-services`, `healthcare`, `retail-commerce`, `education`, `startups-saas` |
| `/approach` | How we work |
| `/about` | About TrivaSite |
| `/faq` | Frequently asked questions |
| `/contact` | Project brief form |
| `/sitemap.xml`, `/robots.txt` | Generated from `src/data` |

Service and industry pages are generated from `src/data/services.ts` and `src/data/industries.ts` — add an entry there and its page, nav links, footer links and sitemap entry appear automatically.

## Structure

```
public/
  favicon.svg
  tech/                    # technology logos (see tech/README.md for licenses)
src/
  app/                     # routes (see table above), layout, not-found, sitemap, robots
    globals.css            # imports Tailwind, astraui, Lenis CSS, then src/styles/*
  components/
    layout/                # Header, Footer (shared by every page via app/layout.tsx)
    sections/              # page sections: Hero, Services, TechStack, Approach, Industries,
                           # Faq, About, Commitments, ContactCta, Growth, PromiseStrip
    forms/                 # ContactForm (used by the modal and /contact)
    modals/                # ContactModal
    providers/             # SmoothScrollProvider (Lenis), SiteProvider (theme + shared UI state)
    ui/                    # ButtonLink, ContactButton, ScrollButton, PageHero, Breadcrumbs,
                           # ServiceGrid, ProcessSteps, TechnologyLogo, Wordmark
  data/                    # all site copy & content (edit text here)
  lib/                     # helpers (cn)
  styles/                  # tokens, base, layout, per-section and inner-page CSS
  types/                   # shared TypeScript types
tests/                     # Vitest + Testing Library
```

## Home hero carousel

The home page opens with a rotating hero (`src/components/sections/Hero.tsx`): one slide per pillar, each with a two-tone headline, actions, a photo with a floating glass card, capability chips and a caption link, plus the "Looking for a service?" quick-link bar.

- Edit slides and quick links in `src/data/heroSlides.ts`. Photos are Unsplash IDs (free under the Unsplash License); swap in your own project photos when you have them.
- Slides advance every 7 seconds, pause on hover/focus or with the Pause button, and never auto-advance for visitors who prefer reduced motion.
- Navigate with the arrows, the dots, the ← / → keys, or by swiping on touch screens. Hidden slides are `inert` so keyboard and screen-reader users only meet the visible one.

## Smooth scrolling (Lenis)

`SmoothScrollProvider` creates one Lenis instance for the whole site.

- `useSmoothScroll().scrollTo(target)` scrolls to a number, `#id` or element, offset by the sticky header (it reads `scroll-padding-top` from `<html>`).
- `ScrollButton` is a ready-made button for in-page jumps (e.g. the hero's "Explore our services").
- The page is paused while the contact modal is open; the dialog itself still scrolls natively.
- Lenis honors `prefers-reduced-motion` automatically.
- On route changes Lenis is re-synced with the scroll position Next.js sets, and follows `#hash` URLs.

## Screen sizes

Breakpoints are documented at the top of `src/styles/tokens.css`:

| Width | Target | What changes |
| --- | --- | --- |
| ≤ 400px | Small phones | Smaller headline sizes and section spacing |
| ≤ 720px | Phones | Single-column layouts, mobile menu, stacked hero |
| 721–1000px | Tablets | Two-column grids (an odd last card spans the row), 2×2 commitments strip |
| 1001–1599px | Laptops & desktops | Design baseline (16px root, 1280px page width) |
| ≥ 1600px | Large & 4K monitors, ultra-wide, zoomed-out browsers | Root font size grows fluidly (`6px + 0.625vw`); spacing and page width are in `rem`, so the whole layout scales together |

Every page has been checked for horizontal overflow at 320, 375, 414, 600, 768, 834, 1024, 1280, 1440, 1920, 2560, 3840 and 7268px (≈ 25% browser zoom), and the contact modal stays inside the screen on phones. Browser zoom-in still enlarges text on large screens.

## Brand

The mark is a **modular tile**: the rounded tile stands for the apps and software products we build; its three modules for our service pillars — build (web, apps & design), intelligence (AI, agents & data science) and foundation (cloud, security & support); the gaps between them form a **T** for TrivaSite; and the teal node where they meet for AI and integration — everything connected.

- `src/components/ui/BrandSymbol.tsx` — the mark used in the header and footer.
- `public/brand/trivasite-mark.svg` — the same mark as a standalone SVG for documents, social profiles, etc.
- `public/favicon.svg` — browser-tab icon (same mark).
- `src/app/apple-icon.png` — home-screen icon (the mark on a light tile).

If you change the mark, update all three files so they stay in sync.

## Social links

The footer's "Follow TrivaSite" row is driven by `src/data/socials.ts`. **Replace each placeholder `href` with your real profile URL** (they currently point to each platform's home page) and delete any platform you don't use. Icons come from [Simple Icons](https://simpleicons.org) (CC0); LinkedIn's is from Devicon (MIT).

## Notes

- Use `ButtonLink` for navigation (real `<a>` links, styled like astraui buttons) and astraui `Button` for actions.
- `@figma/astraui` must only be imported from client components (`"use client"`) — the package isn't marked client-only and fails on the server. `ContactButton` / `ScrollButton` let server components render those buttons.
- The contact form only prepares a brief to copy; it doesn't send anything. To make it send messages, add a Route Handler (e.g. `src/app/api/contact/route.ts`) and call it from `ContactForm`.
