# Agency Landing Page — Boilerplate

A reusable, single-page marketing site for an agency / service business. It ships
with neutral placeholder branding (default fonts and colors) so you can drop in a
new brand quickly. See **TASKS.md** for the full checklist of what to fill in.

## ✨ What's included
- Single-page layout: Hero, Services, Industries, Why Us, Value strip, Process, Contact, Footer
- Animated section reveals (Framer Motion)
- Contact form wired to **EmailJS**
- On-site **AI assistant** widget (Google Gemini)
- Floating WhatsApp button
- Privacy policy page + custom 404
- First-visit page loader

## 🛠 Tech Stack
- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS v4 (brand tokens in `app/globals.css`)
- **Animation:** Framer Motion
- **UI primitives:** shadcn/ui (Radix) in `components/ui`
- **Forms:** EmailJS
- **AI:** Google Gemini (`@google/genai`)

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file (see `.env.example`) and add your keys:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```

## 🎨 Rebranding
Start with **TASKS.md** — it lists every placeholder (company name, contact details,
copy, colors, fonts, logo, AI prompt) and the exact file to edit.

## 📄 License
All rights reserved. © 2026 Your Company Name.
# Marvel Develops
