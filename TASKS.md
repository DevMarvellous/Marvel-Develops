# Outends — Launch Checklist

The site is built and rebranded, and now has a real backend (Supabase + Resend +
an admin dashboard + an AI project planner). What's left is **your content,
assets, and keys**. Work top-to-bottom; each item says exactly what to do and
which file/folder to touch.

Legend: 🔴 needed before launch · 🟡 important · 🟢 nice-to-have

---

## 1. Keys & environment 🔴
Without these, the **contact form**, **AI chatbot**, **AI planner**, and
**admin dashboard** silently fail.

- [ ] Copy `.env.example` → `.env.local` (same folder as `package.json`).
- [ ] **Gemini** (Otto + AI Project Planner): get a key at
  https://aistudio.google.com/apikey, set `GEMINI_API_KEY`.
- [ ] **Supabase** (database + admin login): create a free project at
  https://supabase.com, then from Settings → API fill in `SUPABASE_URL`,
  `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` (keep the service role
  key secret — it bypasses all database security rules).
- [ ] **Resend** (admin lead email + 10-minute customer follow-up): create a
  free account at https://resend.com, verify a sending domain (needs
  outends.com to be bought + DNS access first), set `RESEND_API_KEY` and
  `RESEND_FROM_EMAIL`. Set `ADMIN_NOTIFICATION_EMAIL` to wherever you want
  new leads to land (likely `hello@outends.com`).

---

## 2. Supabase setup 🔴
- [ ] In the Supabase dashboard's SQL editor, run the table-creation SQL from
  the `submissions` table section of the project plan (creates the
  `submissions` table + Row Level Security policy that lets logged-in admins
  read it).
- [ ] Create your one admin login: Authentication → Users → Add user (email +
  password). That's the account you'll use to sign in at `/admin/login`.

---

## 3. Brand assets 🔴
- [ ] **Logo** — replace `public/brand-logo.svg` with your real logo (square SVG
  works best; it shows in the navbar, footer, page loader). White version is
  auto-generated via CSS, so a single-color SVG is ideal.
- [ ] **Favicon** — currently reuses the logo. Optional: add a dedicated favicon.
- [ ] **Social/OG image** — add `public/og-image.png` at **1200×630**. It's
  already referenced in `app/layout.tsx` for link previews (WhatsApp, X, etc.).

---

## 4. Portfolio / case studies 🔴
Right now there are **3 sample projects** (FleetPay, MedTrack, ShopFlow). Replace them.

- [ ] Edit `lib/portfolio.ts` — for each real project fill in: `title`,
  `category`, `client`, `year`, `summary`, `overview`, `problem`, `solution`,
  `highlights`, and `stack`.
- [ ] **Project screenshots** — drop real images into `public/` (e.g.
  `public/work/fleetpay.png`) and point each project's `image` field at them.
  They currently all use `public/placeholder.jpg`.
- [ ] If you have fewer than 3 projects, just delete the extra entries — the
  `/work` page and home teaser adapt automatically.

---

## 5. Contact & social details 🟡
Already set: phone `+234 903 089 1731`, WhatsApp, email `hello@outends.com`,
location *Ede, Osun State, Nigeria*, X `@marvel_14_code`.

- [ ] **Email inbox** — make sure `hello@outends.com` actually exists (set up
  email on the domain after you buy it) — this is where admin lead
  notifications go by default.
- [ ] **Other socials** — `components/layout/Footer.tsx` still has placeholder
  links for Instagram, TikTok, and Facebook (bare URLs). Send me the real ones
  (or say "remove them") — search the file for `TODO`.

---

## 6. Admin dashboard 🟡
- [ ] Visit `/admin/login` and sign in with the Supabase user you created in
  step 2 — you'll see every contact-form and AI-planner submission in one list.
- [ ] To add a second admin later, just create another user in the Supabase
  dashboard — no code changes needed.

---

## 7. AI Project Planner copy review 🟢
- [ ] The planner (at `/plan`) asks visitors about their business, the service
  they need, industry, timeline, and budget, then emails you a summary. Its
  questions are driven by `lib/server/planner-prompt.ts` — read through it
  once and tell me if you want the tone or questions adjusted.

---

## 8. Copy to confirm / personalize 🟢
These are my working choices — change any you don't like (tell me, or edit directly):

- [ ] **Tagline** — "Software, end to end." (`app/layout.tsx`, Hero eyebrow).
- [ ] **AI assistant name** — "Otto" (`components/chatbot/AssistantChat.tsx`,
  `lib/server/gemini.ts`).
- [ ] **Founded year** — "2026" (Hero eyebrow).
- [ ] **Stats band** numbers/wording (`components/sections/Stats.tsx`).
- [ ] **Services / Industries / FAQ** text — `components/sections/*.tsx`.
- [ ] **Customer follow-up email copy** — `lib/server/email-templates.ts`.

---

## 9. Design — temporary choices 🟢
- [ ] **Colors** are placeholders: indigo `#4F46E5` (primary) + amber `#F59E0B`
  (accent) + slate darks. All live in one block in `app/globals.css` (`:root`).
  Give me final brand colors and I'll swap them in one place.
- [ ] **Fonts** are placeholders: Plus Jakarta Sans (headings), Inter (body),
  JetBrains Mono (labels). Wired in `app/layout.tsx` + `app/globals.css`.

---

## 10. Domain & deploy 🔴 (when ready)
- [ ] Buy **outends.com**.
- [ ] Deploy (Vercel is easiest for Next.js): push to GitHub → import to Vercel.
- [ ] Add the **same env vars** from step 1 in the host's dashboard (they are
  NOT committed to git).
- [ ] Point the domain at the deployment.
- [ ] Verify outends.com in Resend (step 1) once DNS is pointed there.

---

## 11. Legal 🟡
- [ ] Review `app/privacy/page.tsx` — it's set for Outends / Nigeria, but read
  it once and adjust anything that doesn't match how you actually handle data.
  Note it should now also mention that submitted contact/planner details are
  stored in a database (Supabase), not just emailed.

---

### Run it locally
```bash
npm install     # first time only
npm run dev
```
Then open http://localhost:3000

### Quick "find all placeholders" search
Search the project for these tokens: `TODO`, `placeholder`, `Sample`, `[`.
