import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectPlanner } from '@/components/planner/ProjectPlanner'

export const metadata: Metadata = {
  title: 'Plan My Project — Marvel Develops',
  description: 'Use our AI Project Planner to define requirements, tech stack, and scope for your web app, mobile app, or SaaS idea.',
  alternates: {
    canonical: '/plan',
  },
  openGraph: {
    title: 'AI Project Planner | Marvel Develops',
    description: 'Use our AI Project Planner to define requirements, tech stack, and scope for your web app, mobile app, or SaaS idea.',
    url: 'https://marveldevelops.com/plan',
  },
}

export default function PlanPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-white pb-16 pt-28 lg:pt-32">
        <div className="mx-auto max-w-2xl px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          <header className="mb-6">
            <p className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              AI Project Planner
            </p>
            <h1 className="font-display text-[clamp(24px,3.5vw,36px)] font-bold leading-[1.1] tracking-tight text-text-dark">
              Not sure what you need? Let&apos;s figure it out.
            </h1>
            <p className="mt-2 max-w-lg text-base leading-relaxed text-text-mid">
              Answer a few quick questions and we&apos;ll put together a clear plan you can send straight to our team.
            </p>
          </header>

          <ProjectPlanner />
        </div>
      </main>
      <Footer />
    </>
  )
}
