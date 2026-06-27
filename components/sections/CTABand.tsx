'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

export function CTABand() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="bg-white px-[var(--container-pad-mobile)] py-12 lg:px-[var(--container-pad-desktop)] lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto max-w-[var(--container-max)] overflow-hidden rounded-[28px] bg-royal-blue px-8 py-14 text-center lg:px-16 lg:py-20"
      >
        {/* Glows */}
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.30) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)' }}
        />
        <div className="grain-overlay" />

        <div className="relative">
          <h2 className="mx-auto mb-4 max-w-2xl font-display text-[clamp(28px,4vw,46px)] font-bold leading-tight text-white">
            Have a project in mind? Let&apos;s build it.
          </h2>
          <p className="mx-auto mb-9 max-w-xl font-sans text-lg text-white/80">
            Tell us what you&apos;re trying to solve. We&apos;ll tell you how we&apos;d approach it —
            no pitch, just a real conversation.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-base font-semibold text-royal-blue transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)] active:scale-[0.97]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/plan"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-3.5 font-sans text-base font-semibold text-white backdrop-blur transition-all duration-250 hover:bg-white/10"
            >
              <Sparkles className="h-4 w-4" />
              Plan my project with AI
            </Link>
            <a
              href="https://wa.me/2349030891731?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Outends"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-3.5 font-sans text-base font-semibold text-white backdrop-blur transition-all duration-250 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
