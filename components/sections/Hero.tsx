'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, ArrowRight, ShieldCheck, Users, Repeat, Calendar } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const trust = [
  { icon: ShieldCheck, label: '100% Software ownership' },
  { icon: Users, label: 'Fixed prices & delivery dates' },
  { icon: Repeat, label: '30 Days free support after launch' },
]

export function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section id="home" className="relative min-h-svh overflow-hidden bg-navy-deep text-white">
      {/* Grid field */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      {/* Glows */}
      {isMounted && (
        <>
          <div
            className="pointer-events-none absolute -right-[120px] -top-[120px] h-[560px] w-[560px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(79,70,229,0.40) 0%, transparent 65%)',
              animation: 'float1 14s ease-in-out infinite',
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-[120px] -left-[100px] h-[460px] w-[460px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)',
              animation: 'float2 18s ease-in-out infinite',
            }}
          />
        </>
      )}

      {/* Grain + bottom fade into the next (light) section */}
      <div className="grain-overlay" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-white to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-svh max-w-[var(--container-max)] flex-col items-center justify-center px-[var(--container-pad-mobile)] py-24 text-center lg:px-[var(--container-pad-desktop)] lg:py-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          Software agency &middot; Building since 2026
        </motion.div>

        {/* Headline */}
        <h1 className="mb-7 max-w-4xl font-display text-[clamp(34px,6vw,60px)] font-bold leading-[1.08] tracking-tight">
          {['Custom software built to', 'grow your business &', null].map((line, i) =>
            line ? (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.12 }}
                className="block"
              >
                {line}
              </motion.span>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.12 }}
                className="block"
              >
                <span className="text-gradient">save you time.</span>
              </motion.span>
            )
          )}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mb-10 max-w-2xl font-sans text-lg font-normal leading-relaxed text-white/75"
        >
          Stop struggling with software that doesn&apos;t fit your business. We build custom websites,
          mobile apps, and management tools made to fit exactly how you operate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/marvellousadepoju79/30min"}
            target={process.env.NEXT_PUBLIC_CALENDLY_URL ? "_blank" : undefined}
            rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? "noopener noreferrer" : undefined}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-base font-semibold text-navy-deep transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)] active:scale-[0.97] sm:w-auto"
          >
            <Calendar className="h-4 w-4 text-royal-blue" />
            Book a Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/work"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-sans text-base font-semibold text-white backdrop-blur transition-all duration-250 hover:border-white/40 hover:bg-white/10 sm:w-auto"
          >
            See our case studies
          </Link>
        </motion.div>

        {/* Micro-copy promise */}
        <p className="mt-3 font-sans text-xs text-white/50">
          ⚡ 15-Min Call &middot; Zero Sales Pressure &middot; Free Technical Audit
        </p>

        {/* AI planner nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.95 }}
          className="mt-5"
        >
          <Link
            href="/plan"
            className="inline-flex items-center gap-1.5 px-1 py-3 font-sans text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            Not sure what you need? Plan it with AI &rarr;
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.0 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          {trust.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 font-sans text-sm text-white/55">
              <Icon className="h-4 w-4 text-gold" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center text-white/40"
      >
        <ChevronDown className="h-5 w-5" style={{ animation: 'bounce-gentle 2s ease-in-out infinite' }} />
      </motion.div>
    </section>
  )
}
