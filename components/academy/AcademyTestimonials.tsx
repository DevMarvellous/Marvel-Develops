'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Quote } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const testimonials = [
  {
    quote:
      'The Marvel Develops Academy was exactly what I needed. Learning to build real, deployed applications with modern tools and AI gave me the confidence to start my career in tech. The hands-on capstone project was fantastic.',
    name: 'Emmanuel Adegeye',
    role: 'Student · Marvel Develops Academy',
  },
  {
    quote:
      'I started this program with absolutely zero experience, and by the end of it I was building full-stack web applications. The instructors break everything down so clearly, and the AI tools we learned are game-changers.',
    name: 'David Omotayo',
    role: 'Graduate · Marvel Develops Academy',
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
