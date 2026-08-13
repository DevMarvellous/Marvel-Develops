# Marvel Develops — Setup Checklist

## ✅ Completed Tasks
- [x] **Domain & Live Hosting**: Purchased `marveldevelops.com` and connected via Cloudflare & Vercel.
- [x] **Google Search Console**: Verified property and successfully submitted `sitemap.xml`.
- [x] **SEO & Schema.org**: Fully implemented `ProfessionalService` JSON-LD schema, dynamic portfolio sitemaps (`sitemap.ts`), crawler rules (`robots.ts`), canonical links, and page meta tags across all pages.
- [x] **Footer Social Links**: Updated Facebook (`facebook.com/marveldevelops`), Instagram (`@marvel_develops`), and X (`@marvel_14_code`).
- [x] **Brand Logos & Assets**: Transparent marks, colored navbars, and favicons/apple-touch-icons are generated and implemented.
- [x] **Social Media Preview Banner**: Generated `og-image.png` using the dark brand lockup logo.
- [x] **Curriculum PDF**: 8-week bootcamp curriculum PDF generated and placed in `public/academy/curriculum.pdf`.

---

## 📌 Pending Manual Tasks (Action Required)

### 1. Academy Launch: Update Placeholder Copy
- [ ] **Testimonials**: Replace the placeholder names, companies, and quotes in `components/academy/AcademyTestimonials.tsx`.
- [ ] **Instructor Bio**: Update your personal backstory and achievements in `components/academy/AcademyInstructor.tsx` (it currently has placeholder text).

### 2. Academy Launch: Email Verification & Testing
- [ ] **Brevo Sender Auth**: Log into your Brevo dashboard and verify that `marveldevelops@gmail.com` is an authenticated sender. (The free tier requires this for the `FROM` address to work).
- [ ] **Test Registration**: Submit a dummy registration on `/academy` locally or on Vercel to confirm that BOTH the admin notification email and the registrant confirmation email arrive successfully.

### 3. Vercel Environment Variables
Ensure these exactly match your `.env.local` inside **Vercel → Project Settings → Environment Variables**:
- [ ] `GEMINI_API_KEY`
- [ ] `BREVO_SMTP_USER`
- [ ] `BREVO_SMTP_KEY`
- [ ] `ADMIN_NOTIFICATION_EMAIL`
- [ ] `ADMIN_PASSWORD`
- [ ] `NEXT_PUBLIC_GA_ID`

### 4. Google Business Profile & Local SEO
- [ ] Go to [google.com/business](https://google.com/business) and click "Manage Now".
- [ ] Register business name as **"Marvel Develops"** and type as "Service business / Software Development".
- [ ] Add website URL: `https://marveldevelops.com`.
- [ ] Complete phone verification to put your business on Google Maps & Local Search.

### 5. Future / Optional Improvements
- [ ] **Resend Email Setup**: Verify `marveldevelops.com` domain on Resend and swap Nodemailer/Brevo SMTP to Resend API.
- [ ] **RAEL Portfolio Release**: Flip `published: false` to `published: true` in `lib/portfolio.ts` when the RAEL real estate project ships.
- [ ] **TikTok Link**: Provide real profile URL or request removal from footer if not in use.
