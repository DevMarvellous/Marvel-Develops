'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const values = [
  'Senior Engineers',
  '2-Week Sprints',
  'Transparent Pricing',
  'Post-Launch Support',
]

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ValueStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  return (
    <section ref={sectionRef} className="bg-royal-blue py-10 lg:py-12">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        {/* Mobile: 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 text-center lg:hidden">
          {values.map((value, index) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: index * 0.1 }}
              className="font-sans text-base font-semibold text-white"
            >
              {value}
            </motion.div>
          ))}
        </div>

        {/* Desktop: Single Row */}
        <div className="hidden items-center justify-center gap-6 lg:flex">
          {values.map((value, index) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: index * 0.1 }}
              className="flex items-center gap-6"
            >
              <span className="font-sans text-lg font-semibold text-white">{value}</span>
              {index < values.length - 1 && (
                <span className="text-gold">&#9670;</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
