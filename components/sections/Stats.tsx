'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '100%', label: 'The software we build is yours to keep' },
  { value: 'Weekly', label: 'Clear progress updates you can actually see' },
  { value: 'End to end', label: 'We handle design, building, and launch' },
  { value: 'Always', label: 'We stay with you after launch, not vanish' },
]

const ease = [0.16, 1, 0.3, 1]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-deep py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: index * 0.1 }}
              className="text-center lg:text-left"
            >
              <p className="font-display text-[28px] font-bold leading-tight tracking-tight text-white break-words sm:text-4xl lg:text-5xl">
                <span className="text-gradient">{stat.value}</span>
              </p>
              <p className="mx-auto mt-2 max-w-[180px] font-sans text-sm leading-relaxed text-white/55 lg:mx-0">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
