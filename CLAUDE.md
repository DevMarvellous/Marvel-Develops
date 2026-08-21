# Marvel Develops — Project Context

This file gives Claude Code instant context on this project so any new session can pick up without confusion.

---

## What This Is

**Marvel Develops** is the personal portfolio and agency website for Marvellous Adepoju, a full-stack developer based in Nigeria who builds custom web applications for businesses.

- Live URL: https://marveldevelops.vercel.app
- GitHub: DevMarvellous
- Admin email: marvellousadepoju79@gmail.com
- WhatsApp: +2349030891731
- Instagram: @marvel_develops
- Domain (not yet purchased): marveldevelops.com

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** Google Gemini (`@google/genai`) — powers the AI assistant chatbot ("Ask AI") and the AI Project Planner
- **Email:** Nodemailer + Gmail SMTP (temporary — switching to Resend once marveldevelops.com is purchased and verified)
- **Auth:** Cookie-based (`admin-session` cookie checked against `ADMIN_PASSWORD` env var) — no auth library, no database
- **Database:** None. All form submissions go straight to email.
- **Deployment:** Vercel

---

## Key Architectural Decisions

### No database
Supabase was removed entirely. Contact form and planner submissions are emailed directly to marvellousadepoju79@gmail.com. Admin panel shows an info message — no data tables.

### Email: Gmail SMTP now, Resend later
Currently using Nodemailer with Gmail App Password (`GMAIL_USER` + `GMAIL_APP_PASSWORD`). Both the admin notification and customer follow-up send immediately (no scheduling delay).

**When marveldevelops.com is purchased:**
1. Verify the domain on Resend
2. Swap `lib/server/email.ts` back to the Resend client (check git history for the original)
3. Update env vars: remove `GMAIL_APP_PASSWORD`, add `RESEND_API_KEY` + `RESEND_FROM_EMAIL`
4. Restore the 10-minute `scheduledAt` delay on the customer follow-up email

### Admin panel
Protected by a single password at `/admin`. No user accounts, no sessions table.
- Login: `/admin/login` → `app/admin/login/actions.ts` → sets `admin-session` cookie
- Guard: `app/admin/(dashboard)/layout.tsx` checks cookie against `ADMIN_PASSWORD` env var
- Dashboard: `app/admin/(dashboard)/page.tsx` — just an info page, no DB query

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Google Gemini for AI features |
| `GMAIL_USER` | `marvellousadepoju79@gmail.com` |
| `GMAIL_APP_PASSWORD` | 16-char Gmail App Password (not the account password) |
| `ADMIN_NOTIFICATION_EMAIL` | Where contact/planner leads land (same Gmail) |
| `ADMIN_PASSWORD` | Password to log into `/admin` |

All vars must be added in Vercel → Settings → Environment Variables.

---

## Portfolio Projects (`lib/portfolio.ts`)

| Slug | Title | Status |
|---|---|---|
| `fraogo-operations-platform` | Fraogo — Operations Platform | Published, featured |
| `brandsor-brand-identity-platform` | Brandsor — Brand Identity Platform | Published, featured |
| `faadey-couture-fashion-platform` | Faadey — Luxury Bespoke Fashion Platform | Published, featured |
| `harvester-church-website` | The Harvester — RCCG Church Website | Published, featured |
| `rael-real-estate-tech` | RAEL — Real Estate Tech Platform | `published: false` — hidden until project ships |

Project screenshots go in `public/work/` as `.png` files.

**The Harvester** stub still needs: live URL, full stack used, any notable features.
**RAEL** — flip `published: false` to `published: true` and flesh out the case study when the project ships.

---

## Key Files

```
app/
  layout.tsx                        — root layout, metadata, fonts
  globals.css                       — Tailwind base + CSS variables (brand colors etc.)
  about/page.tsx                    — About / founder page
  work/page.tsx                     — Portfolio grid
  work/[slug]/page.tsx              — Case study pages
  plan/page.tsx                     — AI Project Planner
  admin/
    login/page.tsx                  — Password login form
    login/actions.ts                — login() and logout() server actions
    (dashboard)/layout.tsx          — Auth guard (cookie check)
    (dashboard)/page.tsx            — Admin dashboard

components/
  layout/Navbar.tsx                 — Top navigation
  layout/Footer.tsx                 — Footer (social links, email, nav links)
  sections/Hero.tsx                 — Homepage hero
  sections/Contact.tsx              — Contact form section
  chatbot/AssistantChat.tsx         — "Ask AI" chatbot
  planner/ProjectPlanner.tsx        — AI Project Planner multi-step form
  about/FounderIntro.tsx            — About page founder section

lib/
  portfolio.ts                      — All project data (source of truth for /work pages)
  server/email.ts                   — Email sender (currently Nodemailer/Gmail SMTP)
  server/email-templates.ts         — HTML email templates + SubmissionSource type
  server/gemini.ts                  — Gemini AI client (system prompt + chat handler)
  server/planner-prompt.ts          — Gemini prompt for AI Project Planner
  server/rate-limit.ts              — Simple in-memory rate limiter for API routes

public/
  brand-logo.svg                    — M-shaped bar-chart logo (5 bars, indigo + gold)
  founder.jpg                       — Marvellous's photo used on /about page
  work/
    fraogo.png                      — Fraogo project screenshot
    brandsor.png                    — Brandsor project screenshot
    harvester.png                   — The Harvester project screenshot
    rael.png                        — RAEL project screenshot (hidden — published: false)
```

---

## Pending User Actions

1. **Vercel env vars** — add `GEMINI_API_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ADMIN_NOTIFICATION_EMAIL`, `ADMIN_PASSWORD` in Vercel → Settings → Environment Variables
2. **Gmail App Password** — create at myaccount.google.com/apppasswords (needs 2FA on)
3. **Social links** — TikTok and Facebook links in Footer are placeholders; provide real links or ask to remove
4. **The Harvester** case study — stub; needs live URL, stack, and features to flesh out
5. **RAEL** — hidden; publish and write case study when the project ships
6. **Buy marveldevelops.com** — then verify on Resend and migrate email back (see Email section above)

---

## Brand

- Primary: Royal Blue `#2563EB` (CSS var `--royal-blue`)
- Accent: Gold/Amber `#F59E0B`
- Dark bg: Navy Deep `#0A0F1E` (CSS var `--navy-deep`)
- Font display: Clash Display (headings)
- Font sans: Inter (body)

---

## What Has Been Done (history for new sessions)

- Full rebrand from "Outends" to "Marvel Develops" across all files
- About page built (`app/about/`, `components/about/FounderIntro.tsx`)
- Supabase fully removed — no DB, no Supabase SDK
- Admin auth replaced with cookie + env var password
- Portfolio updated: 3 real projects (Fraogo, Brandsor, The Harvester) + RAEL (hidden)
- Email switched from Resend to Gmail SMTP (Nodemailer) — Resend requires verified domain
- Real Resend API key accidentally committed to `.env.example` — was redacted (invalidate it at resend.com if needed)

## Core Agent Rules
- **CRITICAL:** NEVER install new npm packages (e.g. via `npm install` or `npx`) without explicitly asking the user for permission first.
- **CRITICAL:** NEVER commit or push to git (`git commit` or `git push`) without explicitly telling the user first and getting their permission.