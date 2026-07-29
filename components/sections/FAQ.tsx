'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on what you need, but we keep it clear. After a quick chat we give you an honest price up front — no surprises and no confusing line items.',
  },
  {
    q: 'How long does it take to build?',
    a: 'Smaller projects often take a few weeks; bigger ones take longer. Either way, we share progress regularly so you always know where things stand.',
  },
  {
    q: 'Do I own what you build?',
    a: 'Yes, completely. Whatever we build belongs to you — you will never be locked in or dependent on us to keep it running.',
  },
  {
    q: 'What happens after launch?',
    a: 'We do not disappear. We help you fix issues, make improvements, and keep things running — for as long as you need us.',
  },
  {
    q: 'Can you improve software I already have?',
    a: 'Absolutely. We can build something new, improve what you already have, or work alongside your existing team — whatever helps most.',
  },
  {
    q: "I'm not sure what I need yet. Can you still help?",
    a: "That is completely fine — most people start there. Tell us the problem you are facing and we will help you figure out the right solution. Just reach out.",
  },
]

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section id="faq" ref={sectionRef} className="bg-gray-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--container-pad-mobile)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            number="05"
            label="FAQ"
            headline={<>Questions,<br />answered.</>}
            subtext="The things people ask us most. Still unsure? Send a message — we reply fast."
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
