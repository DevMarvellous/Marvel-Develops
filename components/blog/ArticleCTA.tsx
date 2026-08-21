import Link from 'next/link'
import { Calendar, Sparkles, ArrowRight } from 'lucide-react'

interface ArticleCTAProps {
  variant?: 'inline' | 'banner'
}

export function ArticleCTA({ variant = 'banner' }: ArticleCTAProps) {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    'https://calendly.com/marvellousadepoju79/30min'

  if (variant === 'inline') {
    return (
      <div className="my-8 rounded-2xl border border-royal-blue/20 bg-gradient-to-br from-royal-blue/5 via-white to-gold/5 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-royal-blue">
          <Sparkles className="h-4 w-4 text-gold" />
          <span>Have a system bottleneck in your business?</span>
        </div>
        <p className="mt-2 font-sans text-sm text-text-dark">
          We engineer tailored web systems, management platforms, and AI workflows that eliminate manual friction.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-royal-blue px-4 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-royal-blue-dark"
          >
            <Calendar className="h-3.5 w-3.5" />
            Book 30-Min Strategy Call
          </Link>
          <Link
            href="/plan"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 font-sans text-xs font-semibold text-navy-deep transition-colors hover:border-royal-blue"
          >
            AI Scope Planner
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-navy-deep p-8 text-white shadow-xl md:p-12">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-gold">
          <Sparkles className="h-3.5 w-3.5" />
          Engineering & Strategy
        </span>

        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
          Ready to turn operational bottlenecks into custom software?
        </h3>

        <p className="mt-4 font-sans text-sm leading-relaxed text-text-white-muted md:text-base">
          Whether you need a full-scale operations suite like Fraogo, an automated customer platform, or a fast-shipped SaaS MVP, we engineer end-to-end solutions that scale with your revenue.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-royal-blue px-7 py-3.5 font-sans text-sm font-semibold text-white shadow-md transition-all hover:bg-royal-blue-dark hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" />
            Book a Strategy Call
          </Link>

          <Link
            href="/plan"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4 text-gold" />
            Try the AI Scope Planner
          </Link>
        </div>
      </div>
    </div>
  )
}
