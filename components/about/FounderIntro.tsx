'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageCircle } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

export function FounderIntro() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

      {isMounted && (
        <div
          className="pointer-events-none absolute -left-[140px] -top-[100px] h-[520px] w-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 65%)',
            animation: 'float1 16s ease-in-out infinite',
          }}
        />
      )}

      <div className="grain-overlay" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-white to-transparent" />

      <div className="relative mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--container-pad-mobile)] py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-[var(--container-pad-desktop)] lg:py-36">
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Founder
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mb-8 font-display text-[clamp(30px,4.4vw,48px)] font-bold leading-[1.15] tracking-tight"
          >
            &ldquo;I build the software businesses{' '}
            <span className="text-gradient">actually run on</span> &mdash;
            not what&apos;s trendy.&rdquo;
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="mb-9"
          >
            <p className="font-display text-xl font-bold text-white">Marvellous Adepoju</p>
            <p className="font-sans text-base text-white/60">Founder, Marvel Develops</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/plan"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-base font-semibold text-navy-deep transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)] active:scale-[0.97]"
            >
              Plan a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/2349030891731?text=Hi%20Marvellous%2C%20I%27d%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-sans text-base font-semibold text-white backdrop-blur transition-all duration-250 hover:border-white/40 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Message me
            </a>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute -inset-3 -z-10 rounded-[28px] border border-gold/25" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-navy">
            <Image
              src="/founder.jpg"
              alt="Marvellous Adepoju, founder of Marvel Develops"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, rgba(15,23,42,0.75) 0%, rgba(79,70,229,0.45) 55%, rgba(245,158,11,0.18) 100%)',
                mixBlendMode: 'multiply',
              }}
            />
            <div className="absolute inset-0 bg-navy-deep/10" />
          </div>
          <div className="absolute -bottom-5 -right-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gold text-navy-deep shadow-[0_8px_30px_rgba(245,158,11,0.35)]">
            <span className="font-display text-2xl font-black">MA</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
