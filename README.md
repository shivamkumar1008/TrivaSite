# TrivaSite

Marketing website for **TrivaSite** — a software services partner for web and app development, AI and automation, cloud and DevOps, data, design, enterprise software, testing, cybersecurity and digital marketing.

Live domain: **https://trivasite.co.in** · Contact: **connect@trivasite.co.in**

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, the **@figma/astraui** component library and **Lenis** smooth scrolling. The contact form sends email through **Resend**. Tests run on **Vitest** + Testing Library.

---

## Contents

- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Contact form & emails](#contact-form--emails)
- [Team section](#team-section)
- [Careers](#careers)
- [Home hero carousel](#home-hero-carousel)
- [Smooth scrolling (Lenis)](#smooth-scrolling-lenis)
- [Screen sizes & responsiveness](#screen-sizes--responsiveness)
- [Brand](#brand)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Conventions](#conventions)

---

## Quick start

**Requirements:** Node.js ≥ 20.9 (tested on 22.19 LTS) and npm ≥ 10. `requirements.txt` lists every package and exact version for reference; npm installs from `package.json` / `package-lock.json`.

```bash
git clone <repo-url> trivasite
cd trivasite
npm install
cp .env.example .env.local     # then fill in the values (see below)
npm run dev                    # http://localhost:3000
```

The site runs without the Resend variables — every page works, but submitting the contact form shows a "couldn't send" message until they are set.

## Environment variables

Copy `.env.example` to `.env.local` for local development, and add the same variables in your hosting provider's settings for production. **`.env.local` holds secrets and is git-ignored — never commit it.** Only `.env.example` (placeholders) is tracked.

| Variable | Example | Used for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://trivasite.co.in` | Canonical URLs, `sitemap.xml`, `robots.txt`, metadata, links in the email banner. Defaults to `http://localhost:3000`. |
| `RESEND_API_KEY` | `re_…` | Resend API key. Create it in Resend → API Keys with **Sending access** (not Full access), ideally limited to `trivasite.co.in`. |
| `CONTACT_FROM_EMAIL` | `"TrivaSite <no-reply@trivasite.co.in>"` | Sender of all emails. Must be on a domain verified in Resend. No mailbox needed. |
| `CONTACT_TO_EMAIL` | `connect@trivasite.co.in` | Inbox that receives form submissions (comma-separate several). The first address is also the one the auto-reply tells visitors to contact. |
| `CAREERS_TO_EMAIL` *(optional)* | `careers@trivasite.co.in` | Inbox for job applications from `/careers`. Falls back to `CONTACT_TO_EMAIL` when unset. |

Restart `npm run dev` after changing `.env.local`.

## Scripts

```bash
npm run dev        # dev server with hot reload at http://localhost:3000
npm run build      # production build (all pages are statically generated)
npm start          # serve the production build (run `npm run build` first)
npm run typecheck  # tsc --noEmit
npm test           # Vitest component tests (once)
npm run test:watch # Vitest in watch mode
```

Before pushing, run `npm run typecheck && npm test && npm run build`.

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
| `/team` | The whole team, with each member's LinkedIn, email and portfolio links |
| `/team/[slug]` | Member profiles: `utkarsh-jha`, `amrita-raj`, `shivam-kumar`, `utkarsh-raj` |
| `/careers` | Open roles and the job application form (resume upload); invites general applications when nothing is open |
| `/faq` | Frequently asked questions |
| `/contact` | Contact form (also available as the "Let's talk" modal on every page) |
| `/sitemap.xml`, `/robots.txt` | Generated from `src/data` |

Service, industry and team pages are generated from `src/data/services.ts`, `src/data/industries.ts` and `src/data/team.ts` — add an entry there and its page, links and sitemap entry appear automatically.

## Project structure

```
public/
  brand/                   # trivasite-mark.svg (logo), trivasite-mark-email.png (logo for emails)
  team/                    # black-and-white team photos (960×1200 JPEG)
  tech/                    # technology logos (see tech/README.md for licenses)
  favicon.svg
src/
  app/                     # routes (see table above), layout, not-found, sitemap, robots
    globals.css            # imports Tailwind, astraui, Lenis CSS, then src/styles/*
    team/                  # /team and /team/[slug]
    careers/               # /careers
  components/
    layout/                # Header, Footer (shared by every page via app/layout.tsx)
    sections/              # page sections: Hero, Services, TechStack, Approach, Industries,
                           # Faq, About, Commitments, ContactCta, Growth (team carousel), PromiseStrip,
                           # CareersBoard (open roles + application form)
    forms/                 # ContactForm (modal and /contact), CareersForm (/careers)
    modals/                # ContactModal
    providers/             # SmoothScrollProvider (Lenis), SiteProvider (theme + shared UI state)
    ui/                    # ButtonLink, ContactButton, ScrollButton, PageHero, Breadcrumbs,
                           # ServiceGrid, ProcessSteps, TechnologyLogo, Wordmark, SocialLinks,
                           # TeamCard, MemberLinks
  data/                    # all site copy & content — edit text here (see "Editing content")
  lib/
    sendContact.ts         # Server Action: contact form — validates, sends both emails via Resend
    sendApplication.ts     # Server Action: careers form — validates, emails the resume, confirms to the applicant
    mail.ts                # shared email helpers (Resend config, escaping, file checks)
    emailLayout.ts         # shared email layout + brand banner (logo, name, tagline)
    emailLogo.ts           # the email logo as base64 (embedded inline in emails)
    cn.ts                  # class-name helper
  styles/                  # tokens, base, layout, per-section and inner-page CSS
  types/                   # shared TypeScript types
tests/                     # Vitest + Testing Library
.env.example               # template for .env.local
requirements.txt           # human-readable list of tools and package versions
```

## Editing content

Almost all text lives in `src/data/`. Change it there; you rarely need to touch components.

| What | File |
| --- | --- |
| Site name, tagline, description, response time ("within 24 hours"), attachment limits | `src/data/site.ts` |
| Header navigation (Services, Our approach, Industries, About us, Our team, Careers), promises strip, process steps | `src/data/site.ts` |
| Services (pages, cards, footer lists) | `src/data/services.ts` |
| Industries | `src/data/industries.ts` |
| Team members (name, photo, quote, links) | `src/data/team.ts` |
| Open roles, "Why TrivaSite" cards, resume rules | `src/data/careers.ts` |
| FAQ | `src/data/faqs.ts` |
| Home hero slides and quick links | `src/data/heroSlides.ts` |
| Technology logos and rows | `src/data/technologies.ts` |
| Footer columns | `src/data/footer.ts` |
| Footer social icons | `src/data/socials.ts` |

### Social links

The footer's "Follow TrivaSite" row is driven by `src/data/socials.ts`, in this order:

| Icon | Link |
| --- | --- |
| LinkedIn | https://www.linkedin.com/company/trivasite |
| Instagram | https://www.instagram.com/trivasite |
| Email | `mailto:connect@trivasite.co.in` (opens the visitor's mail app in the same tab) |
| WhatsApp | https://wa.me/916200080587 |

Add or remove an entry to show or hide an icon. WhatsApp links need the full international number without `+` or spaces (91 = India). Icons come from [Simple Icons](https://simpleicons.org) (CC0); LinkedIn's is from Devicon (MIT); the email icon is Material Design's "mail" (Apache 2.0).

## Contact form & emails

The form appears on `/contact` and in the "Let's talk" modal. It calls the `sendContact` **Server Action** in `src/lib/sendContact.ts`, which:

1. **Validates** name, email, message and attachments on the server (the browser also checks them first). A hidden honeypot field (`company`) silently drops simple bots.
2. **Emails the team** at `CONTACT_TO_EMAIL` — subject *"New project brief from {name}"*, with the message, a list of attachments and the files attached. Reply-To is the visitor, so pressing Reply answers them directly.
3. **Sends the visitor an auto-reply** from `CONTACT_FROM_EMAIL` (a no-reply address, with no Reply-To) — subject *"We've received your project brief — TrivaSite"*, explaining the next steps and pointing them to `connect@trivasite.co.in`. It does **not** repeat their message. If only the auto-reply fails, the visitor still sees success (the team already has the brief) and the error is logged on the server.

On success the form clears and shows a thank-you message; on failure it shows the error under the form.

### Attachments

- Up to **5 files, 10 MB in total**. Allowed types: PDF, Word, PowerPoint, Excel, CSV, TXT, PNG/JPG and ZIP. Change the limits in `contactAttachments` in `src/data/site.ts`.
- `next.config.ts` raises the Server Action body limit (`experimental.serverActions.bodySizeLimit`) to **12 MB** to fit them. Keep it above `maxBytes`.
- **Files are not stored anywhere on the server.** They exist only as attachments on the email in the `CONTACT_TO_EMAIL` inbox — if that email is deleted, the files are gone. Save important files elsewhere.
- Some hosts cap request bodies lower than 10 MB (Vercel Functions accept about 4.5 MB). Check your host before relying on 10 MB uploads.

### Email design

Both emails use `emailHtml()` from `src/lib/emailLayout.ts`: the content on a white card, then a navy **brand banner** with the logo, "TrivaSite." and *"Your ambition. Our engineering."*, plus a link to the site. Any new automated email should use the same helper and attach `emailLogoAttachment`.

The logo is embedded in the email itself (an inline `cid:` attachment), because Gmail and Outlook don't show SVGs and remote images may be blocked. If the logo changes, regenerate `public/brand/trivasite-mark-email.png` (96×96) and `src/lib/emailLogo.ts` (its base64) from `public/brand/trivasite-mark.svg`.

### Resend setup (one time)

1. In Resend → **Domains**, add `trivasite.co.in` and add the DNS records it shows (DKIM `TXT` on `resend._domainkey`, `MX` + SPF `TXT` on `send`, and optionally DMARC `TXT` on `_dmarc`) at your domain registrar. In the registrar's Host field enter only the part before the domain (e.g. `send`). Wait for **Verified**.
2. In Resend → **API Keys**, create a key with **Sending access** and put it in `RESEND_API_KEY`.
3. Make sure `connect@trivasite.co.in` is a real mailbox that accepts 10 MB attachments, and that it does **not** have a catch-all that would also deliver mail sent to `no-reply@`.

Until the domain is verified, `onboarding@resend.dev` works as a sender but only delivers to your own Resend account email, so visitor auto-replies won't arrive.

## Team section

- **Home and About pages:** the "Our team — The people building with you." carousel (`src/components/sections/Growth.tsx`) shows one black-and-white card per member with their name and quote. Clicking a card opens their profile. The carousel slowly sweeps sideways and pauses on hover, keyboard focus or the Pause button.
- **`/team`:** all members in a grid (4 → 2 → 1 columns), each with LinkedIn, email and portfolio links.
- **`/team/[slug]`:** large photo, name, quote, links, an "Email {name}" button, and the rest of the team.

To **add or edit a member**, edit `src/data/team.ts` (`slug`, `name`, `photo`, `quote`, `caption`, `email`, `linkedin`, optional `portfolio`). Add their photo to `public/team/<slug>.jpg` — ideally a 4:5 portrait (960×1200) with the face in the upper third; the CSS also applies a grayscale filter, so colour photos still display in black and white. The carousel card, `/team` entry, profile page and sitemap entry update automatically.

> Team members' email addresses are public on these pages and can be collected by spam bots.

## Careers

`/careers` (linked from the header, the footer's Company list and its "Careers with us" block) has a hero with **Apply now**, three "Why TrivaSite" cards, the **open roles**, and the **application form**.

- **Open roles** live in `openRoles` in `src/data/careers.ts` (an example to copy is in the file's comment). Each role shows its title, type, location and summary, with expandable "What you'll do" / "What we're looking for" lists. **Apply** selects that role in the form and scrolls to it.
- **No open roles** (the list is empty): the page says so and invites a general application — "Send us your resume." The role picker is hidden and every application is sent as *General application*.
- **The form** asks for full name, email, optional phone, optional LinkedIn/portfolio link, a short note and a **resume (PDF, DOC or DOCX, smaller than 5 MB)**. It's validated in the browser and again by the `sendApplication` Server Action (`src/lib/sendApplication.ts`), with the same honeypot spam check as the contact form. Change the resume rules in `resumeUpload` in `src/data/careers.ts`.

What happens on submit:

1. **Your team gets** *"New application: {role} — {name}"* at `CAREERS_TO_EMAIL` (or `CONTACT_TO_EMAIL`): a details table (name, email, phone, link, resume), their note, and the **resume attached**. Reply-To is the applicant.
2. **The applicant gets** *"We've received your application — TrivaSite"* from the no-reply sender: a summary box (role and resume file name), what happens next (review → get in touch → kept in mind for future roles), a link to meet the team, and the brand banner. It doesn't repeat their note.

Like contact attachments, **resumes are not stored on the server** — the email in the careers inbox is the only copy. To give applications their own inbox, create `careers@trivasite.co.in` (a mailbox or a forward to connect@) and set `CAREERS_TO_EMAIL`.

## Home hero carousel

The home page opens with a rotating hero (`src/components/sections/Hero.tsx`): one slide per pillar, each with a two-tone headline, actions, a photo with a floating glass card, capability chips and a caption link, plus the "Looking for a service?" quick-link bar.

- Edit slides and quick links in `src/data/heroSlides.ts`. Photos are Unsplash IDs (free under the Unsplash License); swap in your own project photos when you have them.
- Slides advance every 5 seconds (0.45s transition), pause on hover/focus or with the Pause button, and never auto-advance for visitors who prefer reduced motion.
- Navigate with the arrows, the dots, the ← / → keys, or by swiping on touch screens. Hidden slides are `inert` so keyboard and screen-reader users only meet the visible one.

## Smooth scrolling (Lenis)

`SmoothScrollProvider` creates one Lenis instance for the whole site.

- `useSmoothScroll().scrollTo(target)` scrolls to a number, `#id` or element, offset by the sticky header (it reads `scroll-padding-top` from `<html>`).
- `ScrollButton` is a ready-made button for in-page jumps (e.g. the hero's "Explore our services").
- The page is paused while the contact modal is open; the dialog itself still scrolls natively.
- Lenis honors `prefers-reduced-motion` automatically.
- `allowNestedScroll` is on: scrolling over a box that scrolls by itself (a long textarea, a dropdown list, the side-scrolling logo rows on phones) scrolls that box instead of the page.
- Verified on every route: a mouse-wheel scroll animates over several frames rather than jumping.
- On route changes Lenis is re-synced with the scroll position Next.js sets, and follows `#hash` URLs.

## Screen sizes & responsiveness

Breakpoints are documented at the top of `src/styles/tokens.css`:

| Width | Target | What changes |
| --- | --- | --- |
| ≤ 400px | Small phones | Smaller headline sizes and section spacing |
| ≤ 720px | Phones | Single-column layouts, Menu button, stacked hero, one team card per row |
| 721–1000px | Tablets | Menu button (six nav links don't fit beside the logo), two-column grids (an odd last card spans the row), 2×2 commitments strip |
| 1001–1599px | Laptops & desktops | Design baseline (16px root, 1280px page width) |
| ≥ 1600px | Large & 4K monitors, ultra-wide, zoomed-out browsers | Root font size grows fluidly (`6px + 0.625vw`); spacing and page width are in `rem`, so the whole layout scales together |

Every page — including `/careers`, `/team`, all member profiles and the 404 page — has been checked for horizontal overflow at widths from 320px to 1920px (320, 360, 390, 430, 600, 768, 900, 1024, 1180, 1280, 1440, 1920), with screenshots reviewed at phone and tablet sizes. The original pages were also checked at 2560, 3840 and 7268px (≈ 25% browser zoom). The contact modal, including attached files with long names, stays inside the screen on small and landscape phones.

When adding layout, prefer `minmax(0, 1fr)` grid columns and `min-width: 0` on flex/grid children that contain long text, so content can't push past the screen.

## Brand

The mark is a **modular tile**: the rounded tile stands for the apps and software products we build; its three modules for our service pillars — build (web, apps & design), intelligence (AI, agents & data science) and foundation (cloud, security & support); the gaps between them form a **T** for TrivaSite; and the teal node where they meet for AI and integration — everything connected.

- `src/components/ui/BrandSymbol.tsx` — the mark used in the header and footer.
- `public/brand/trivasite-mark.svg` — the same mark as a standalone SVG for documents, social profiles, etc.
- `public/brand/trivasite-mark-email.png` + `src/lib/emailLogo.ts` — PNG version embedded in emails.
- `public/favicon.svg` — browser-tab icon (same mark).
- `src/app/apple-icon.png` — home-screen icon (the mark on a light tile).

If you change the mark, update all of these so they stay in sync.

**Colours** (from `src/styles/tokens.css`): brand blue `#235CE1`, dark navy `#102542`, light blue `#D4E1FC`, teal accent `#3FD0C9`. **Tagline:** *Your ambition. Our engineering.* **Font:** Instrument Sans.

## Testing

```bash
npm test
```

`tests/site.test.tsx` covers: service cards and the contact modal, header navigation and smooth scroll, industry tabs, FAQ toggles, the hero carousel (arrows, dots, autoplay, pause), the contact form (successful send, attachments and unsupported types, server errors), the careers form (resume type check, required resume, successful application, server errors) and the team carousel links — the Server Actions are mocked there, so no real email is sent. `tests/sendApplication.test.ts` runs the careers Server Action itself in Node with Resend mocked: both emails, the attached resume, `CAREERS_TO_EMAIL`, HTML escaping, rejected input and the honeypot. `tests/setup.ts` adds jsdom stand-ins for browser APIs the site uses.

To test real email delivery, set the Resend variables in `.env.local`, run `npm run dev` and submit the form using an address other than `CONTACT_TO_EMAIL`.

## Deployment

The site needs a **Node.js host** (the contact form is a Server Action), so a purely static export won't send email.

1. Set `NEXT_PUBLIC_SITE_URL=https://trivasite.co.in`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` (and optionally `CAREERS_TO_EMAIL`) in the host's environment settings.
2. Build with `npm run build` and start with `npm start` (or let the host do both).
3. Point `trivasite.co.in` at the host (follow the host's DNS instructions), keeping the Resend DNS records in place.
4. Check the host's request body limit if visitors will upload large attachments (see [Attachments](#attachments)).
5. After deploying, submit the live form once and confirm both emails arrive.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Dev server says *Can't resolve '…/something.css'* although the file exists | The dev server cached a "missing file" result. Stop it (Ctrl+C), delete `.next` (`Remove-Item -Recurse -Force .next` in PowerShell, `rm -rf .next` elsewhere) and run `npm run dev` again. If `[browser]` errors keep appearing afterwards, hard-refresh (Ctrl+Shift+R) any tab that was open on the broken version. |
| *Another next dev server is already running* | Only one dev server can run per project. Use the existing one at http://localhost:3000 or stop it first. |
| Form shows "We couldn't send your message right now" | One of the Resend variables is missing, or Resend rejected the email. Check the terminal running the server for the logged `sendContact:` error (e.g. unverified domain, wrong API key). |
| Team email arrives but visitors get no auto-reply | The sender domain isn't verified in Resend (with `onboarding@resend.dev` Resend only delivers to your own account email). |
| Email banner link says `localhost:3000` | Set `NEXT_PUBLIC_SITE_URL` to the real domain and restart. |
| Large attachments fail in production | The host's request size limit is lower than 10 MB — lower `contactAttachments.maxBytes` or move uploads to cloud storage. |

## Conventions

- Use `ButtonLink` for navigation (real `<a>` links, styled like astraui buttons) and astraui `Button` for actions.
- Focus rings appear for keyboard users only (`:focus-visible`): clicking a link or button never leaves a ring, while Tab still shows the brand-blue ring. Don't remove focus styles entirely — keyboard and screen-reader users rely on them.
- `@figma/astraui` must only be imported from client components (`"use client"`) — the package isn't marked client-only and fails on the server. `ContactButton` / `ScrollButton` let server components render those buttons.
- Keep copy in `src/data/*`, styles in `src/styles/*` (one file per section, imported from `src/app/globals.css`), and shared types in `src/types`.
- This repo uses a newer Next.js than many tutorials describe — check `node_modules/next/dist/docs/` before using an unfamiliar API (see `AGENTS.md`).
- Never commit `.env.local` or any real API key.
