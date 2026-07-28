import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { AssistantChat } from '@/components/chatbot/AssistantChat'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Marvel Develops Academy — 8-Week AI & Coding Bootcamp',
  description:
    'Learn to build real apps and websites using AI in 8 weeks — no experience needed. Marvel Develops Academy: hands-on training starting August 17, 2026.',
  keywords:
    'coding bootcamp Nigeria, AI coding course, learn to code online, Marvel Develops Academy, web development training, Claude Code, beginner coding',
  openGraph: {
    title: 'Marvel Develops Academy — 8-Week AI & Coding Bootcamp',
    description:
      'Learn to build real apps and websites using AI in 8 weeks. No experience needed. Starts August 17, 2026.',
    url: 'https://marveldevelops.com/academy',
    siteName: 'Marvel Develops',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Marvel Develops Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvel Develops Academy — 8-Week AI & Coding Bootcamp',
    description:
      'Learn to build real apps and websites using AI in 8 weeks. No experience needed. Starts August 17, 2026.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://marveldevelops.com/academy',
  },
}

/**
 * Academy layout — simplified navbar (logo + Register CTA) and footer.
 * Does NOT reuse the main Navbar/Footer components whose links
 * (Services/Work/About) don't apply to the Academy page.
 *
 * AssistantChat is rendered here with pageContext="academy" so the AI
 * leads with Academy-relevant information for visitors on this page.
 */
export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Academy Navbar — logo + single CTA only                             */}
      {/* ------------------------------------------------------------------ */}
      <header className="fixed left-0 right-0 top-0 z-50 bg-navy-deep/90 backdrop-blur-[20px] shadow-[0_1px_0_rgba(255,255,255,0.07)]">
        <nav className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-[var(--container-pad-mobile)] py-4 lg:px-[var(--container-pad-desktop)]">
          {/* Logo — links back to main site */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/brand-logo.svg"
              alt="Marvel Develops"
              width={36}
              height={36}
              className="h-8 w-8 brightness-0 invert lg:h-9 lg:w-9"
              priority
            />
            <span className="font-display text-xl font-black tracking-tight text-white lg:text-[22px]">
              Marvel Develops{' '}
              <span className="text-gold">Academy</span>
            </span>
          </Link>

          {/* Register CTA */}
          <a
            href="#register"
            id="academy-nav-cta"
            className="rounded-full bg-gold px-5 py-2.5 font-sans text-[14px] font-semibold text-navy-deep transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(245,158,11,0.4)] active:scale-[0.97]"
          >
            Register Interest
          </a>
        </nav>
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* ------------------------------------------------------------------ */}
      {/* Academy Footer — minimal                                             */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-white/10 bg-navy-deep py-10 text-center text-white">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          <p className="mb-2 font-display text-lg font-bold">
            Marvel Develops <span className="text-gold">Academy</span>
          </p>
          <p className="mb-4 font-sans text-sm text-white/50">
            An initiative of Marvel Develops &middot; marveldevelops.com
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-sm text-white/40">
            <a
              href="https://wa.me/2349030891731"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:marvellousadepoju79@gmail.com"
              className="hover:text-gold transition-colors"
            >
              Email
            </a>
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="mt-6 font-sans text-xs text-white/25">
            &copy; {new Date().getFullYear()} Marvel Develops. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot — pageContext="academy" directs AI to lead with Academy info */}
      <AssistantChat pageContext="academy" />

      {/* Sonner toast container */}
      <Toaster />
    </>
  )
}
