import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, Smartphone, BarChart3, ClipboardList, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FounderIntro } from '@/components/about/FounderIntro'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'About — Marvel Develops',
  description: 'Marvellous Adepoju, founder & system architect of Marvel Develops — building custom web applications, mobile apps, dashboards, and management systems for businesses.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Marvellous Adepoju — Marvel Develops',
    description: 'Marvellous Adepoju, founder & system architect of Marvel Develops — building custom web applications, mobile apps, dashboards, and management systems for businesses.',
    url: 'https://marveldevelops.com/about',
  },
}

const bio = [
  "Marvellous Adepoju is a Computer Engineering student at Redeemer's University, Nigeria, and the person behind every project Marvel Develops ships. He has been in software development for two years.",
  "He started because he kept watching businesses struggle with software that didn't fit how they actually operated. So he builds the kind he'd want to use himself: clean, reliable, and made around the actual problem — not what's fashionable.",
  "Today that means websites, mobile apps, dashboards, and management systems for founders and business owners who just want something that works. No jargon, no bloat, and no disappearing after launch.",
]

const focusAreas = [
  { icon: Monitor, label: 'Websites & web apps', description: 'Fast, professional, and built to convert.' },
  { icon: Smartphone, label: 'Mobile apps', description: 'For Android and iPhone, made to feel effortless.' },
  { icon: BarChart3, label: 'Dashboards & reporting', description: 'Turning raw data into clear decisions.' },
  { icon: ClipboardList, label: 'Management systems', description: 'Built around how your business actually runs.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <FounderIntro />

        {/* Bio */}
        <section className="px-[var(--container-pad-mobile)] py-20 lg:px-[var(--container-pad-desktop)] lg:py-28">
          <div className="mx-auto max-w-[var(--container-max)]">
            <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
              <SectionHeader label="Bio" headline="The short version." />
              <div className="space-y-5 font-sans text-lg leading-relaxed text-text-mid">
                {bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Focus areas */}
        <section className="bg-gray-white px-[var(--container-pad-mobile)] py-20 lg:px-[var(--container-pad-desktop)] lg:py-28">
          <div className="mx-auto max-w-[var(--container-max)]">
            <SectionHeader
              label="Focus"
              headline="What I focus on."
              centered
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {focusAreas.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="rounded-[var(--radius-card)] border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-royal-blue hover:shadow-[var(--shadow-hover)]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-royal-blue-soft">
                    <Icon className="h-5 w-5 text-royal-blue" />
                  </div>
                  <p className="mb-1.5 font-display text-base font-bold text-text-dark">{label}</p>
                  <p className="font-sans text-sm leading-relaxed text-text-mid">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-[var(--container-pad-mobile)] py-20 lg:px-[var(--container-pad-desktop)] lg:py-24">
          <div className="mx-auto max-w-[var(--container-max)] rounded-[28px] border border-border bg-royal-blue-soft p-10 text-center lg:p-16">
            <h2 className="mb-3 font-display text-2xl font-bold text-text-dark lg:text-3xl">
              Got a project in mind?
            </h2>
            <p className="mx-auto mb-8 max-w-md font-sans text-text-mid">
              Tell me what you&apos;re trying to solve, and I&apos;ll show you how I&apos;d approach it.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/plan"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-royal-blue px-7 py-3.5 font-sans text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-royal-blue-dark hover:shadow-[var(--shadow-hover)]"
              >
                Plan a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-royal-blue/30 bg-white px-7 py-3.5 font-sans text-base font-semibold text-royal-blue transition-all hover:bg-royal-blue-soft"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
