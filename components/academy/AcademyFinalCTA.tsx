'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, MessageCircle } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function AcademyFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-deep py-[var(--section-py-mobile)] text-white lg:py-[var(--section-py-desktop)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="grain-overlay" />

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] text-center lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-gold">
            First Cohort — Enrolling Now
          </p>

          <h2 className="mb-5 font-display text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.1] tracking-tight">
            Ready to start building?
          </h2>
          <p className="mb-10 mx-auto max-w-lg font-sans text-lg leading-relaxed text-white/65">
            This is our first cohort, and classes start Monday, August 17, 2026. Reserve your spot now so you don't miss the first two weeks of foundations.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={scrollToRegister}
              id="academy-final-cta-btn"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 font-sans text-base font-semibold text-navy-deep shadow-[0_4px_24px_rgba(245,158,11,0.35)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(245,158,11,0.45)] active:scale-[0.97] sm:w-auto"
            >
              Reserve Your Spot
              <ArrowDown className="h-4 w-4" />
            </button>

            <a
              href="https://wa.me/2349030891731?text=Hi%2C%20I%27m%20interested%20in%20Marvel%20Develops%20Academy%20(August%202026)"
              target="_blank"
              rel="noopener noreferrer"
              id="academy-final-whatsapp"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 font-sans text-base font-semibold text-white backdrop-blur transition-all duration-250 hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Message on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
