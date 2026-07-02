import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectPlanner } from '@/components/planner/ProjectPlanner'

export const metadata: Metadata = {
  title: 'Plan My Project — Marvel Develops',
  description: 'Answer a few quick questions and our AI will help you figure out what to build — then send it straight to our team.',
}

export default function PlanPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-2xl px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          <header className="mb-10 lg:mb-14">
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              AI Project Planner
            </p>
            <h1 className="font-display text-[clamp(28px,4.5vw,46px)] font-bold leading-[1.1] tracking-tight text-text-dark">
              Not sure what you need? Let&apos;s figure it out.
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-mid">
              Answer a few quick questions and we&apos;ll put together a clear plan
              you can send straight to our team — no jargon, no commitment.
            </p>
          </header>

          <ProjectPlanner />
        </div>
      </main>
      <Footer />
    </>
  )
}
