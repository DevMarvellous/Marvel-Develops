'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Video, PlayCircle, MessageCircle, FileCheck2 } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const items = [
  {
    icon: Video,
    title: 'Live Online Classes',
    description: 'Join real-time sessions where we build together and you can ask questions as we code.',
    animateFrom: { x: -40, opacity: 0 },
  },
  {
    icon: PlayCircle,
    title: 'Recordings Available',
    description: 'Missed a class? No problem. Every session is recorded and made available so you can catch up at your own pace.',
    animateFrom: { y: 40, opacity: 0 },
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Q&A Group',
    description: 'Get direct support outside of class hours. Share your screen, ask questions, and interact with other students in the community.',
    animateFrom: { y: 40, opacity: 0 },
  },
  {
    icon: FileCheck2,
    title: 'Projects & Feedback',
    description: 'Work on individual assignments and group projects. Receive detailed feedback on your code to help you improve.',
    animateFrom: { x: 40, opacity: 0 },
  },
]

export function AcademyFormatAndSupport() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            label="Format & Support"
            headline={<>How the training<br />is delivered.</>}
            subtext="We ensure you have everything you need to succeed, from live instruction to community support and practical feedback."
          />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={item.animateFrom}
                animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease, delay: index * 0.1 }}
                className="rounded-[20px] border border-border bg-white p-6 shadow-[var(--shadow-card)] lg:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue-soft">
                  <Icon className="h-6 w-6 stroke-royal-blue stroke-[1.5]" />
                </div>
                <h3 className="mb-3 font-display text-lg font-bold text-text-dark">
                  {item.title}
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-text-mid">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
