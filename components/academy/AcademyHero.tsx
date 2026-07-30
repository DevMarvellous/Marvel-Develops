'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, CalendarDays } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function AcademyHero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-svh overflow-hidden bg-navy-deep text-white"
    >
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      {/* Ambient glows */}
      {isMounted && (
        <>
          <div
            className="pointer-events-none absolute -right-[100px] -top-[100px] h-[560px] w-[560px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(79,70,229,0.40) 0%, transparent 65%)',
              animation: 'float1 14s ease-in-out infinite',
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-[120px] -left-[80px] h-[460px] w-[460px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.20) 0%, transparent 70%)',
              animation: 'float2 18s ease-in-out infinite',
            }}
          />
        </>
      )}

      {/* Grain + bottom fade */}
      <div className="grain-overlay" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-white to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-svh max-w-[var(--container-max)] flex-col items-center justify-center px-[var(--container-pad-mobile)] py-28 text-center lg:px-[var(--container-pad-desktop)] lg:py-36">

        {/* Date badge / pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-gold backdrop-blur"
        >
          <CalendarDays className="h-3.5 w-3.5" />
          8 Weeks&nbsp;&nbsp;|&nbsp;&nbsp;Starts Monday, August 17, 2026
        </motion.div>

        {/* Headline */}
        <h1 className="mb-6 max-w-4xl font-display text-[clamp(34px,6vw,64px)] font-bold leading-[1.07] tracking-tight">
          {['Marvel Develops', null].map((line, i) =>
            line ? (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.22 + i * 0.12 }}
                className="block"
              >
                {line}
              </motion.span>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.34 }}
                className="block"
              >
                <span className="text-gradient">Academy</span>
              </motion.span>
            )
          )}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="mb-10 max-w-xl font-sans text-lg font-normal leading-relaxed text-white/65"
        >
          Learn to build real apps and websites using AI — no experience needed.
          8-week hands-on training for beginners.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.78 }}
        >
          <button
            id="academy-hero-cta"
            onClick={scrollToRegister}
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-9 py-4 font-sans text-base font-semibold text-navy-deep shadow-[0_4px_24px_rgba(245,158,11,0.35)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(245,158,11,0.45)] active:scale-[0.97]"
          >
            Reserve Your Spot
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.0 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            'No prior experience needed',
            'Real projects — not just theory',
            'Certificate on completion',
            'Live interactive sessions',
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-2 font-sans text-sm text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center text-white/30"
      >
        <ArrowDown className="h-5 w-5" style={{ animation: 'bounce-gentle 2s ease-in-out infinite' }} />
      </motion.div>
    </section>
  )
}
