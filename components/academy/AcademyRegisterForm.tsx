'use client'

import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

const ease = [0.16, 1, 0.3, 1]

interface FormState {
  fullName: string
  phone: string
  email: string
  registeringFor: string
  message: string
  honeypot: string // hidden anti-bot field
}

const initialForm: FormState = {
  fullName: '',
  phone: '',
  email: '',
  registeringFor: '',
  message: '',
  honeypot: '',
}

export function AcademyRegisterForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [form, setForm] = useState<FormState>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || submitted) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/academy-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          registeringFor: form.registeringFor,
          message: form.message || undefined,
          honeypot: form.honeypot,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
      toast.success("You're registered!", {
        description: "We've got your details. We'll be in touch soon about the August cohort.",
        duration: 6000,
      })
    } catch {
      toast.error('Something went wrong', {
        description: "Please try again or message us directly on WhatsApp.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:bg-white focus:outline-none transition-colors duration-200'
  const labelClass = 'mb-1.5 block font-sans text-[14px] font-semibold text-text-dark'

  return (
    <section
      ref={sectionRef}
      id="register"
      className="bg-royal-blue-soft py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-12 text-center"
        >
          <SectionHeader
            label="Register Interest"
            headline={<>Secure your spot.</>}
            subtext="Slots are limited for the August 2026 cohort. Fill in your details and we'll be in touch with next steps."
            centered
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="mx-auto max-w-lg"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 rounded-[24px] border border-border bg-white p-10 text-center shadow-[var(--shadow-card)]">
              <CheckCircle2 className="h-12 w-12 text-royal-blue" />
              <h3 className="font-display text-2xl font-bold text-text-dark">You&apos;re registered!</h3>
              <p className="font-sans text-[15px] leading-relaxed text-text-mid">
                We&apos;ve received your details and will be in touch shortly about the August 2026 cohort.
                In the meantime, feel free to message us on WhatsApp with any questions.
              </p>
              <a
                href="https://wa.me/2349030891731"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 font-sans text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Message on WhatsApp
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[24px] border border-border bg-white p-7 shadow-[var(--shadow-card)] lg:p-9"
            >
              {/* Honeypot — hidden from real users, traps bots */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                aria-hidden="true"
                className="absolute opacity-0 h-0 w-0 pointer-events-none"
              />

              <div className="grid gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="academy-fullName" className={labelClass}>
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <input
                    id="academy-fullName"
                    name="fullName"
                    type="text"
                    required
                    maxLength={200}
                    placeholder="e.g. Chioma Okonkwo"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="academy-phone" className={labelClass}>
                    Phone / WhatsApp Number <span className="text-gold">*</span>
                  </label>
                  <input
                    id="academy-phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={40}
                    placeholder="+234 XXX XXX XXXX"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Email (required) */}
                <div>
                  <label htmlFor="academy-email" className={labelClass}>
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input
                    id="academy-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Registering for */}
                <div>
                  <label htmlFor="academy-registeringFor" className={labelClass}>
                    Registering for <span className="text-gold">*</span>
                  </label>
                  <select
                    id="academy-registeringFor"
                    name="registeringFor"
                    required
                    value={form.registeringFor}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select one…
                    </option>
                    <option value="Myself">Myself</option>
                    <option value="My child">My child</option>
                    <option value="Someone else">Someone else</option>
                  </select>
                </div>

                {/* Message (optional) */}
                <div>
                  <label htmlFor="academy-message" className={labelClass}>
                    Message{' '}
                    <span className="font-normal text-text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="academy-message"
                    name="message"
                    rows={3}
                    maxLength={2000}
                    placeholder="Any questions or things we should know?"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                id="academy-register-submit"
                disabled={isSubmitting}
                className="mt-7 w-full rounded-full bg-royal-blue py-4 font-sans text-base font-semibold text-white shadow-[var(--shadow-hover)] transition-all duration-250 hover:-translate-y-0.5 hover:bg-royal-blue-dark active:scale-[0.97] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </span>
                ) : (
                  'Register Interest →'
                )}
              </button>

              <p className="mt-4 text-center font-sans text-[12px] text-text-muted">
                This is a lead-capture form only. No payment is taken here.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
