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
      <main className="min-h-screen bg-gray-white pb-20 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Column (Main Planner) */}
            <div className="lg:col-span-7">
              <header className="mb-6">
                <p className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  AI Guided Architecture
                </p>
                <h1 className="font-display text-[clamp(26px,3.5vw,38px)] font-bold leading-[1.1] tracking-tight text-text-dark">
                  Not sure what you need? Let&apos;s structure it.
                </h1>
                <p className="mt-2 text-base leading-relaxed text-text-mid">
                  Pick a focus chip or tell us your business goal. Our AI will structure your requirements and recommend a clean tech architecture.
                </p>
              </header>

              <ProjectPlanner />
            </div>

            {/* Right Column (Sidebar & Direct Actions) */}
            <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28">
              
              {/* How it works card */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-display text-lg font-bold text-text-dark flex items-center gap-2">
                  <Zap className="h-5 w-5 text-royal-blue" />
                  How AI Planning Works
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 font-mono text-xs font-bold text-royal-blue">
                      1
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-dark">Select Your Focus or Goal</p>
                      <p className="font-sans text-xs text-text-mid leading-relaxed">Click a quick-start chip (Real Estate, Hotel, Automations) or describe your bottleneck.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 font-mono text-xs font-bold text-royal-blue">
                      2
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-dark">AI Scope &amp; Tech Recommendation</p>
                      <p className="font-sans text-xs text-text-mid leading-relaxed">The AI generates a clean project brief with recommended architecture and timeline.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 font-mono text-xs font-bold text-royal-blue">
                      3
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-dark">Direct Handoff &amp; Fixed Quote</p>
                      <p className="font-sans text-xs text-text-mid leading-relaxed">Schedule a 15-minute call or send the brief on WhatsApp to get your fixed quote.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
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
              <div className="rounded-2xl border border-royal-blue/20 bg-royal-blue/5 p-6 text-center">
                <p className="font-sans text-sm font-bold text-text-dark">Prefer to talk directly right now?</p>
                <p className="mt-1 font-sans text-xs text-text-mid mb-4">Skip the planner and speak directly with Lead Architect Marvellous Adepoju.</p>
                
                <div className="flex flex-col gap-2.5">
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
