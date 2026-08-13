import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectPlanner } from '@/components/planner/ProjectPlanner'
import { Calendar, MessageCircle, ShieldCheck, Sparkles, Zap, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Project Planner — Marvel Develops',
  description: 'Use our AI Project Planner to define requirements, tech stack, and scope for your custom software, real estate system, hotel booking, or automation idea.',
  alternates: {
    canonical: '/plan',
  },
  openGraph: {
    title: 'AI Project Planner | Marvel Develops',
    description: 'Define requirements, tech stack, and scope for your custom software, real estate system, hotel booking, or automation idea.',
    url: 'https://marveldevelops.com/plan',
  },
}

const CALENDLY_LINK = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/marvellousadepoju79/30min'

export default function PlanPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-white pb-20 pt-24 sm:pt-28 xl:pt-32">
        <div className="mx-auto max-w-4xl xl:max-w-7xl px-[var(--container-pad-mobile)] sm:px-6 xl:px-[var(--container-pad-desktop)]">
          
          {/* Header */}
          <header className="mb-6 max-w-3xl">
            <p className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              AI Guided Architecture
            </p>
            <h1 className="font-display text-[clamp(26px,3.8vw,42px)] font-bold leading-[1.1] tracking-tight text-text-dark">
              Not sure what you need? Let&apos;s structure it.
            </h1>
            <p className="mt-2 text-base leading-relaxed text-text-mid">
              Pick a focus chip or tell us your business goal. Our AI will structure your requirements and recommend a clean tech architecture.
            </p>
          </header>

          <div className="grid gap-8 xl:grid-cols-12 xl:items-start">
            {/* Main Planner (Takes full width on iPad & Mobile, 7 cols on large desktop) */}
            <div className="w-full xl:col-span-7">
              <ProjectPlanner />
            </div>

            {/* Sidebar (Stacks as 3 wide cards on iPad, 5 cols sticky sidebar on large desktop) */}
            <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-1 xl:col-span-5 xl:sticky xl:top-28">
              
              {/* How it works card */}
              <div className="rounded-2xl border border-border/80 bg-white p-5 sm:p-6 shadow-sm">
                <h3 className="mb-4 font-display text-base sm:text-lg font-bold text-text-dark flex items-center gap-2">
                  <Zap className="h-5 w-5 text-royal-blue" />
                  How AI Planning Works
                </h3>
                
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 font-mono text-xs font-bold text-royal-blue mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-text-dark">Select Focus or Goal</p>
                      <p className="font-sans text-xs text-text-mid leading-relaxed">Click a quick-start chip (Real Estate, Hotel, Automations) or describe your bottleneck.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 font-mono text-xs font-bold text-royal-blue mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-text-dark">AI Scope &amp; Tech Rec</p>
                      <p className="font-sans text-xs text-text-mid leading-relaxed">AI generates a clear project brief with recommended architecture and timeline.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 font-mono text-xs font-bold text-royal-blue mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-text-dark">Direct Handoff &amp; Quote</p>
                      <p className="font-sans text-xs text-text-mid leading-relaxed">Schedule a 15-min call or send the brief on WhatsApp to get your fixed quote.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="rounded-2xl border border-border/80 bg-white p-5 sm:p-6 shadow-sm">
                <h3 className="mb-3 font-display text-base font-bold text-text-dark flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                  Our Client Commitments
                </h3>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2 font-sans text-xs text-text-mid font-medium">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>🔒 100% Confidential (NDAs available)</span>
                  </li>
                  <li className="flex items-center gap-2 font-sans text-xs text-text-mid font-medium">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>🔑 Complete software &amp; source code ownership</span>
                  </li>
                  <li className="flex items-center gap-2 font-sans text-xs text-text-mid font-medium">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>🛡️ 30 Days free support after launch</span>
                  </li>
                </ul>
              </div>

              {/* Direct Booking Card */}
              <div className="rounded-2xl border border-royal-blue/20 bg-royal-blue/5 p-5 sm:p-6 text-center md:col-span-3 xl:col-span-1">
                <p className="font-sans text-sm font-bold text-text-dark">Prefer to talk directly right now?</p>
                <p className="mt-1 font-sans text-xs text-text-mid mb-4">Skip the planner and speak directly with Lead Architect Marvellous Adepoju.</p>
                
                <div className="flex flex-col sm:flex-row xl:flex-col gap-2.5 justify-center">
                  <a
                    href={CALENDLY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-royal-blue px-4 py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-royal-blue-dark shadow-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    Book 15-Min Strategy Call
                  </a>
                  <a
                    href="https://wa.me/2349030891731?text=Hi%20Marvellous%2C%20I%27d%20like%20to%20discuss%20a%20software%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-whatsapp/30 bg-whatsapp/10 px-4 py-3 font-sans text-sm font-semibold text-whatsapp transition-colors hover:bg-whatsapp/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
