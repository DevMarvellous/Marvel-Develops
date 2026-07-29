'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function AcademyInstructor() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

      {/* Ambient glow — matches FounderIntro.tsx */}
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

      <div className="relative mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--container-pad-mobile)] py-[var(--section-py-mobile)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-[var(--container-pad-desktop)] lg:py-[var(--section-py-desktop)]">
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            About the Instructor
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mb-4 font-display text-[clamp(26px,4vw,42px)] font-bold leading-[1.15] tracking-tight"
          >
            Marvellous Adepoju
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="mb-2 font-sans text-base text-white/60"
          >
            Full-Stack Developer &amp; Architect &middot; Founder, Marvel Develops
          </motion.p>

          {/*
            TODO: Refine the instructor bio copy below with Marvellous's specific
            teaching credentials, experience, and personal approach to training.
            Current text is a working placeholder based on the About page content.
          */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.42 }}
            className="mb-8 space-y-4 font-sans text-[15px] leading-relaxed text-white/65"
          >
            <p>
              Marvellous Adepoju is a Software Engineer with over 2 years of experience developing custom software solutions and automations for businesses.
            </p>
            <p>
              He is a member of the International Association of Project Managers (IAPM) Nigeria and an official Realtor at Lifepage International.
            </p>
            <p>
              He builds clean, reliable tools that solve actual business problems without unnecessary jargon, and is currently pursuing his degree in Computer Engineering at Redeemer&apos;s University.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
          >
            <a
              href="https://wa.me/2349030891731?text=Hi%20Marvellous%2C%20I%27d%20like%20to%20know%20more%20about%20Marvel%20Develops%20Academy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-sans text-base font-semibold text-white backdrop-blur transition-all duration-250 hover:border-white/40 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Message Marvellous
            </a>
          </motion.div>
        </div>

        {/* Portrait — reuses the same /founder.jpg used on /about */}
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
              alt="Marvellous Adepoju — Instructor, Marvel Develops Academy"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, rgba(15,23,42,0.75) 0%, rgba(79,70,229,0.45) 55%, rgba(245,158,11,0.18) 100%)',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
          <div className="absolute -bottom-5 -right-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gold text-navy-deep shadow-[0_8px_30px_rgba(245,158,11,0.35)]">
            <span className="font-display text-2xl font-black">MA</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
