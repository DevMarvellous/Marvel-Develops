'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Rocket, FolderOpen, Brain } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const reasons = [
  {
    icon: Rocket,
    title: 'You ship real things.',
    description:
      'Every week ends with something you built and deployed yourself — not a half-finished exercise you delete after class. By week 8, you have a live portfolio and a project you can show anyone.',
    animateFrom: { x: -60, opacity: 0 },
  },
  {
    icon: Brain,
    title: 'AI is your co-pilot, not a gimmick.',
    description:
      'You\'ll learn to use tools like Claude Code the way working developers actually use them — to build faster and smarter, not to skip understanding what you\'re building.',
    animateFrom: { y: 60, opacity: 0 },
  },
  {
    icon: FolderOpen,
    title: 'No abandoned theory.',
    description:
      'Most courses end with a certificate and nothing to show for it. This training is structured so every topic leads directly to something deployable — HTML on day one leads to a live website by week two.',
    animateFrom: { x: 60, opacity: 0 },
  },
]

export function AcademyWhy() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="bg-royal-blue-soft py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            label="Why This Training"
            headline={<>What makes this<br />different.</>}
            subtext="Most courses leave you with nothing tangible to show. This one is built around the opposite — every week ends with something real that you shipped."
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={reason.animateFrom}
                animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease }}
                className="rounded-[20px] border border-border bg-white p-5 shadow-[var(--shadow-card)] lg:p-9"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue-soft">
                  <Icon className="h-6 w-6 stroke-royal-blue stroke-[1.5]" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-text-dark">
                  {reason.title}
                </h3>
                <p className="font-sans text-[15px] leading-relaxed text-text-mid">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
