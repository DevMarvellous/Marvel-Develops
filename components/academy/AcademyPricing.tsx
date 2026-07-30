'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACADEMY_PRICING, formatNaira } from '@/lib/academy-config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BadgeCheck, CreditCard, Info } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function AcademyPricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const [isEarlyBird, setIsEarlyBird] = useState(false)

  useEffect(() => {
    if (ACADEMY_PRICING.earlyBird.enabled) {
      const now = new Date()
      const deadline = new Date(ACADEMY_PRICING.earlyBird.deadline)
      setIsEarlyBird(now < deadline)
    }
  }, [])

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-gray-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-8 lg:mb-12 text-center"
        >
          <SectionHeader
            label="Pricing"
            headline={<>Simple, honest pricing.</>}
            subtext="Pay in full or spread it across the programme. No hidden fees."
            centered
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="mx-auto max-w-xl"
        >
          <div className="overflow-hidden rounded-[24px] border border-border bg-white shadow-[var(--shadow-card)]">
            {/* Price header */}
            <div className="border-b border-border bg-navy-deep px-8 py-8 text-center text-white">
              <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">
                Total Investment
              </p>
              
              {isEarlyBird ? (
                <>
                  <p className="font-display text-[clamp(48px,7vw,72px)] font-black leading-none tracking-tight text-white">
                    {formatNaira(ACADEMY_PRICING.earlyBird.price)}
                  </p>
                  <p className="mt-2 inline-flex items-center justify-center rounded-full bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gold">
                    if you register before {new Date(ACADEMY_PRICING.earlyBird.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — then {formatNaira(ACADEMY_PRICING.totalPrice)}
                  </p>
                </>
              ) : (
                <div className="flex items-baseline gap-4">
                  <p className="font-display text-[clamp(48px,7vw,72px)] font-black leading-none tracking-tight text-white">
                    {formatNaira(ACADEMY_PRICING.totalPrice)}
                  </p>
                  <p className="font-display text-[clamp(28px,4vw,36px)] font-bold text-white/60">
                    / $33
                  </p>
                </div>
              )}
              
              <p className="mt-3 font-sans text-sm text-white/55">
                8 weeks &middot; Online &middot; Practical Cohort
              </p>
            </div>

            {/* Payment plan */}
            <div className="px-8 py-8">
              <div className="mb-2 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-royal-blue" />
                <p className="font-sans text-[14px] font-semibold text-text-dark">
                  Pay in 3 instalments
                </p>
              </div>
              <p className="mb-5 font-sans text-[13px] text-text-muted">
                Spread the cost across the programme — same total, more flexibility.
              </p>

              <div className="space-y-3">
                {ACADEMY_PRICING.installments.map((inst, i) => (
                  <div
                    key={inst.label}
                    className="flex items-center justify-between rounded-xl border border-border bg-gray-white px-5 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-royal-blue-soft font-mono text-[11px] font-bold text-royal-blue">
                        {i + 1}
                      </span>
                      <span className="font-sans text-[14px] text-text-dark">{inst.label}</span>
                    </div>
                    <span className="font-display text-[16px] font-bold text-text-dark">
                      {formatNaira(inst.amount)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <p className="font-sans text-[14px] text-text-mid">
                    Certificate of completion awarded at the end of the programme.
                  </p>
                </div>
              </div>

              {/* Refund policy */}
              <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-border bg-gray-white p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                <p className="font-sans text-[13px] leading-relaxed text-text-mid">
                  <span className="font-semibold text-text-dark">Refund policy:</span> Full refund
                  if you withdraw before the end of week 2. No refund after week 2 begins.
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={scrollToRegister}
                id="academy-pricing-cta"
                className="mt-7 w-full rounded-full bg-gold py-4 font-sans text-base font-semibold text-navy-deep shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(245,158,11,0.4)] active:scale-[0.97]"
              >
                Reserve Your Spot
              </button>
            </div>
          </div>
          
          <p className="mt-6 text-center font-sans text-[13px] leading-relaxed text-text-muted px-4">
            Most coding bootcamps in Nigeria cost ₦150,000 and up — this includes AI tool access most programmes charge extra for.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
