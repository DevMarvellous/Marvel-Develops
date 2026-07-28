'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Quote } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

// TODO: Replace PLACEHOLDER text below with real testimonial quotes, names, and roles.
const testimonials = [
  {
    quote:
      'PLACEHOLDER — Replace this with a real testimonial quote from a student or parent. This should describe what they got out of the training in their own words.',
    name: 'PLACEHOLDER Name',
    role: 'Student · Marvel Develops Academy',
  },
  {
    quote:
      'PLACEHOLDER — Replace this with a second real testimonial. Ideally from a parent registering their child, or someone who had zero experience before joining.',
    name: 'PLACEHOLDER Name',
    role: 'PLACEHOLDER Role',
  },
]

export function AcademyTestimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-14 text-center"
        >
          <SectionHeader
            label="Testimonials"
            headline={<>What people are saying.</>}
            centered
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.15 }}
              className="relative rounded-[20px] border border-border bg-gray-white p-7 shadow-[var(--shadow-card)] lg:p-9"
            >
              {/* Quote icon */}
              <Quote className="mb-5 h-8 w-8 text-gold opacity-60" />

              <p className="mb-6 font-sans text-[16px] leading-relaxed text-text-mid italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-blue-soft font-display text-sm font-bold text-royal-blue">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans text-[14px] font-semibold text-text-dark">{t.name}</p>
                  <p className="font-sans text-[13px] text-text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
