'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Shield, Infinity, Gauge, BadgeCheck, type LucideIcon } from 'lucide-react'

type Reason = {
  icon: LucideIcon
  title: string
  description: string
  // Optional guarantee badge shown on the card.
  guarantee?: string
  animateFrom: { x?: number; y?: number; opacity: number }
}

const reasons: Reason[] = [
  {
    icon: Shield,
    title: 'Experienced people, not beginners.',
    description: "Your project is handled by people who've built this kind of software before — no practicing on your time or money.",
    animateFrom: { x: -60, opacity: 0 },
  },
  {
    icon: Infinity,
    title: "We don't disappear after launch.",
    description: 'We stay on to help, fix, and improve things — not vanish once the work is delivered.',
    // TODO: confirm the exact terms you want to promise (length / what's covered).
    guarantee: '30 days of free support after launch — guaranteed.',
    animateFrom: { y: 60, opacity: 0 },
  },
  {
    icon: Gauge,
    title: 'Built to last and to grow.',
    description: 'We build software that runs smoothly today and can grow right alongside your business.',
    animateFrom: { x: 60, opacity: 0 },
  },
]

const ease = [0.16, 1, 0.3, 1]

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="bg-royal-blue-soft py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            number="03"
            label="Why Us"
            headline={<>Why businesses<br />choose us.</>}
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={reason.animateFrom}
                animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease }}
                className="rounded-[20px] border border-border bg-white p-9 shadow-[var(--shadow-card)]"
              >
                <Icon className="mb-5 h-10 w-10 stroke-royal-blue stroke-[1.5]" />
                <h3 className="mb-3 font-display text-xl font-bold text-text-dark">
                  {reason.title}
                </h3>
                <p className="font-sans text-[15px] leading-relaxed text-text-mid">
                  {reason.description}
                </p>
                {reason.guarantee && (
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-gold" />
                    <span className="font-sans text-[13px] font-semibold text-text-dark">
                      {reason.guarantee}
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
