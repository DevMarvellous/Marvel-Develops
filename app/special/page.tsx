'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ArrowRight, CheckCircle2, Gift, Sparkles, MessageCircle, Check, Loader2 } from 'lucide-react'

const perks = [
  'Full-custom web software or workflow automation built specifically for your business.',
  'Zero development fee — 100% free build phase.',
  'Direct 1-on-1 collaboration with Lead Architect Marvellous Adepoju.',
  'Dedicated deployment & launch support.',
]

export default function SpecialPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          businessName: formData.company,
          email: formData.email,
          whatsapp: formData.phone,
          industry: 'Special Initiative',
          service: '10 Free Software Build',
          message: formData.message || 'No description provided (will discuss on call)',
        }),
      })

      if (!res.ok) throw new Error('Failed to submit')
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep py-24 text-white lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
          <div className="grain-overlay" />
          
          <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] text-center lg:px-[var(--container-pad-desktop)]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-mono text-[12px] uppercase tracking-wider text-gold backdrop-blur">
              <Gift className="h-4 w-4" />
              Limited Partner Initiative &middot; 10 Spots Available
            </div>

            <h1 className="mx-auto mb-6 max-w-4xl font-display text-[clamp(32px,5.5vw,56px)] font-bold leading-[1.1] tracking-tight">
              We&apos;re Building <span className="text-gradient">10 Custom Softwares</span> For 10 Businesses &mdash; 100% Free.
            </h1>

            <p className="mx-auto mb-10 max-w-2xl font-sans text-lg text-white/70 leading-relaxed">
              To expand our agency&apos;s featured case studies and portfolio proof, Marvel Develops is sponsoring full custom software development for 10 selected businesses in exchange for a video testimonial.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#apply"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-sans text-base font-semibold text-navy-deep transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(245,158,11,0.4)] active:scale-[0.97]"
              >
                Apply For a Free Spot
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/2349030891731?text=Hi%20Marvellous%2C%20I%27m%20interested%20in%20the%2010%20free%20software%20initiative"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-sans text-base font-semibold text-white backdrop-blur transition-all duration-250 hover:border-white/40 hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Breakdown */}
        <section className="px-[var(--container-pad-mobile)] py-20 lg:px-[var(--container-pad-desktop)] lg:py-28">
          <div className="mx-auto max-w-[var(--container-max)]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <SectionHeader
                  label="The Initiative"
                  headline="Why are we giving away free custom software?"
                />
                <p className="mb-6 font-sans text-lg leading-relaxed text-text-mid">
                  As an ambitious software agency, real-world case studies and video reviews from active business owners are worth more than traditional advertising.
                </p>
                <p className="mb-8 font-sans text-lg leading-relaxed text-text-mid">
                  We are taking 10 selected businesses through a full software engineering sprint. We design, build, and deploy your web app, booking system, or automation workflow without charging any dev fee. In return, all we ask is an honest video review and permission to feature your case study on our website &amp; social channels.
                </p>
                
                <div className="space-y-4">
                  {perks.map((perk) => (
                    <div key={perk} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <span className="font-sans text-base text-text-dark font-medium">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form container */}
              <div id="apply" className="rounded-[28px] border border-border bg-gray-white p-8 shadow-[var(--shadow-card)] lg:p-10">
                {formState === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                      <Check className="h-8 w-8 text-gold" />
                    </div>
                    <h3 className="mb-2 font-sans text-2xl font-bold text-text-dark">Application Received!</h3>
                    <p className="mb-6 font-sans text-text-mid">Lead Architect Marvellous Adepoju will review your details. Next step: Schedule your 15-minute call to review project eligibility.</p>
                    
                    <div className="flex flex-col gap-3 w-full">
                      <a
                        href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/marvellousadepoju79/30min"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-royal-blue px-6 py-4 font-sans text-base font-semibold text-white shadow-md transition-all hover:bg-royal-blue-dark"
                      >
                        📅 Schedule Call on Calendly &rarr;
                      </a>
                      <a
                        href="https://wa.me/2349030891731?text=Hi%20Marvellous%2C%20I%20just%20applied%20for%20the%20free%20software%20initiative"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm font-semibold text-text-mid hover:text-royal-blue"
                      >
                        Or message directly on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-royal-blue font-bold">
                        <Sparkles className="h-4 w-4 text-gold" />
                        Spot Application
                      </div>
                      <h3 className="font-display text-2xl font-bold text-text-dark">Claim 1 of 10 Free Spots</h3>
                      <p className="mt-1 font-sans text-sm text-text-mid">Fill out this quick form and Lead Architect Marvellous Adepoju will get back to you within 24 hours.</p>
                    </div>

                    {formState === 'error' && (
                      <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        Something went wrong. Please chat us on WhatsApp or try again.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-dark">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. David Williams"
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-text-dark outline-none transition-colors focus:border-royal-blue"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-dark">
                          Business Name &amp; Website / Page *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. Apex Logistics / @apexlogistics"
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-text-dark outline-none transition-colors focus:border-royal-blue"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-dark">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="david@example.com"
                            className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-text-dark outline-none transition-colors focus:border-royal-blue"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-dark">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+234..."
                            className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-text-dark outline-none transition-colors focus:border-royal-blue"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-dark">
                          What software tool or automation does your business need? (Optional)
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Briefly describe your manual problem or tool idea (or leave blank to discuss on call)..."
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-text-dark outline-none transition-colors focus:border-royal-blue"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formState === 'loading'}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-deep py-4 font-sans text-base font-semibold text-white transition-all hover:bg-royal-blue disabled:opacity-70"
                      >
                        {formState === 'loading' ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
