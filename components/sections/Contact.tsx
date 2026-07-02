'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { ContactFormData } from '@/lib/types'
import { Check, Loader2, MessageCircle, Phone, Mail } from 'lucide-react'

const industries = [
  'Fintech',
  'Healthcare',
  'E-commerce & Retail',
  'Education',
  'Logistics',
  'Startups',
  'Other',
]

const services = [
  'Website or Web App',
  'Mobile App',
  'Dashboard & Reporting',
  'Management System',
  'Custom Software',
  "Not sure yet — let's talk",
]

const ease = [0.16, 1, 0.3, 1]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [isMounted, setIsMounted] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    setIsMounted(true)
  }, [])
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessName: '',
    email: '',
    whatsapp: '',
    industry: '',
    service: '',
    message: '',
    honeypot: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Request failed')
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-navy py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <SectionHeader
              number="07"
              label="Contact"
              headline={<span className="font-serif italic text-text-white">Have something<br />in mind?</span>}
              subtext="Tell us what you're building. We'll tell you how we'd approach it. No pitch. Just a real conversation."
              dark
            />

            {/* Contact Channels */}
            <div className="mt-8 space-y-6">
              <a
                href="https://wa.me/2349030891731"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp/20">
                  <MessageCircle className="h-5 w-5 text-whatsapp" />
                </div>
                <div>
                  <p className="font-sans text-sm text-text-white-muted">Chat with us on WhatsApp</p>
                  <p className="font-sans text-base font-medium text-white transition-colors group-hover:text-whatsapp">
                    +234 903 089 1731
                  </p>
                </div>
              </a>

              <a
                href="tel:+2349030891731"
                className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
                  <Phone className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-sans text-sm text-text-white-muted">Call us directly</p>
                  <p className="font-sans text-base font-medium text-white transition-colors group-hover:text-gold">
                    +234 903 089 1731
                  </p>
                </div>
              </a>

              <a
                href="mailto:marvellousadepoju79@gmail.com"
                className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-blue/30">
                  <Mail className="h-5 w-5 text-royal-blue-soft" />
                </div>
                <div>
                  <p className="font-sans text-sm text-text-white-muted">Send us an email</p>
                  <p className="font-sans text-base font-medium text-white transition-colors group-hover:text-royal-blue-soft">
                    marvellousadepoju79@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="rounded-2xl bg-white p-6 lg:p-8"
          >
            {isMounted && (
              <>
                {formState === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                      <Check className="h-8 w-8 text-gold" />
                    </div>
                    <h3 className="mb-2 font-sans text-xl font-bold text-text-dark">Message received!</h3>
                    <p className="mb-4 font-sans text-text-mid">{"We'll get back to you within 24 hours."}</p>
                    <a
                      href="https://wa.me/2349030891731"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm font-semibold text-whatsapp hover:underline"
                    >
                      Or chat us directly &rarr;
                    </a>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-6 font-sans text-lg font-bold text-text-dark">Start Your Project</h3>

                    {formState === 'error' && (
                      <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        Something went wrong. Please{' '}
                        <a href="mailto:marvellousadepoju79@gmail.com" className="underline">
                          email us directly
                        </a>
                        .
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="fullName" className="sr-only">Full Name</label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Full Name *"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3.5 font-sans text-[15px] text-text-dark placeholder:text-text-muted transition-all focus:border-royal-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-royal-blue/10"
                          />
                        </div>
                        <div>
                          <label htmlFor="businessName" className="sr-only">Business Name</label>
                          <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            placeholder="Business Name *"
                            required
                            value={formData.businessName}
                            onChange={handleChange}
                            className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3.5 font-sans text-[15px] text-text-dark placeholder:text-text-muted transition-all focus:border-royal-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-royal-blue/10"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="email" className="sr-only">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email Address *"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3.5 font-sans text-[15px] text-text-dark placeholder:text-text-muted transition-all focus:border-royal-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-royal-blue/10"
                          />
                        </div>
                        <div>
                          <label htmlFor="whatsapp" className="sr-only">WhatsApp Number</label>
                          <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            placeholder="WhatsApp Number *"
                            required
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3.5 font-sans text-[15px] text-text-dark placeholder:text-text-muted transition-all focus:border-royal-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-royal-blue/10"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="industry" className="sr-only">Industry</label>
                          <select
                            id="industry"
                            name="industry"
                            required
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3.5 font-sans text-[15px] text-text-dark transition-all focus:border-royal-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-royal-blue/10"
                          >
                            <option value="" disabled>Industry *</option>
                            {industries.map(ind => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="service" className="sr-only">What do you need?</label>
                          <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3.5 font-sans text-[15px] text-text-dark transition-all focus:border-royal-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-royal-blue/10"
                          >
                            <option value="" disabled>What do you need? *</option>
                            {services.map(svc => (
                              <option key={svc} value={svc}>{svc}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="sr-only">Tell us about your project</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Describe your business and what you're trying to solve..."
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full resize-none rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3.5 font-sans text-[15px] text-text-dark placeholder:text-text-muted transition-all focus:border-royal-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-royal-blue/10"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formState === 'loading'}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-sans text-base font-bold text-navy transition-all hover:bg-gold-light hover:shadow-[0_0_24px_var(--gold-glow)] disabled:opacity-70"
                      >
                        {formState === 'loading' ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <span>&rarr;</span>
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
