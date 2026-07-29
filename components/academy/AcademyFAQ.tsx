'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACADEMY_PRICING, formatNaira } from '@/lib/academy-config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const ease = [0.16, 1, 0.3, 1]

const faqs = [
  {
    q: 'Does my child need a laptop?',
    a: 'Yes — a working laptop or desktop computer is required to participate. A phone alone is not enough for coding work. The laptop does not need to be powerful; a standard everyday laptop is fine.',
  },
  {
    q: 'Do I need any coding experience before starting?',
    a: 'None at all. The programme is designed specifically for beginners — we start from the very basics and build up from there. If you can use a browser, you can start.',
  },
  {
    q: 'Is this online or in-person?',
    a: 'Fully online. All sessions are held live via Zoom or Google Meet, so you can join from anywhere. Recordings will be available for each session in case you need to review a lesson.',
  },
  {
    q: 'What if I miss a class?',
    a: 'All sessions are recorded. If you miss one, you can watch the recording and catch up before the next class. We will also have group support so you can ask questions between sessions.',
  },
  {
    q: 'What happens if I want a refund?',
    a: 'You are entitled to a full refund if you withdraw before the end of week 2. After week 2 begins, no refunds are issued — this is to protect the integrity of the programme for everyone enrolled.',
  },
  {
    q: 'Do I get a certificate?',
    a: 'Yes. Everyone who completes the full 8-week programme receives a certificate of completion from Marvel Develops.',
  },
  {
    q: 'Do I need to pay extra for AI tools during the training?',
    a: `No — access to the AI Pro tools used throughout the programme is included in the ${formatNaira(ACADEMY_PRICING.totalPrice)} programme cost. You will not be asked to pay for any extra subscriptions or tools.`,
  },
]

export function AcademyFAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--container-pad-mobile)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            label="FAQ"
            headline={<>Questions,<br />answered.</>}
            subtext="Still unsure? Send a message on WhatsApp — we reply fast."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-white px-6">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="font-display text-base font-semibold text-text-dark hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-[15px] leading-relaxed text-text-mid">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
