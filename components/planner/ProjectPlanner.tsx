'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Check, Pencil, ArrowRight, MessageCircle, Calendar, Sparkles, Building2, Hotel, Zap, Scale, Smartphone } from 'lucide-react'
import type { Message, PlannerSummary } from '@/lib/types'

const OPENING_MESSAGE =
  "Hi! I'm the Marvel Develops Project Planner. Pick a quick-start focus below or tell me about your business idea — I'll help you structure a clear software plan."

const CONTACT_LINK = 'https://wa.me/2349030891731'
const CALENDLY_LINK = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/marvellousadepoju79/30min'

const QUICK_START_CHIPS = [
  { label: 'Real Estate & Property System', icon: Building2, prompt: 'I want to plan a Real Estate & Property Management System for my business.' },
  { label: 'Hotel & Short-Let Booking', icon: Hotel, prompt: 'I want to plan a Hotel & Short-Let Booking Engine for my business.' },
  { label: 'Workflow & Lead Automation', icon: Zap, prompt: 'I want to plan an Automated Workflow & Lead Follow-up Tool.' },
  { label: 'Legal / Professional Portal', icon: Scale, prompt: 'I want to plan a Client Portal for a Legal & Professional firm.' },
  { label: 'Custom Mobile or Web App', icon: Smartphone, prompt: 'I want to plan a Custom Web App or Mobile Application.' },
]

export function ProjectPlanner() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: OPENING_MESSAGE }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<PlannerSummary | null>(null)
  const [editingSummary, setEditingSummary] = useState(false)
  const [reviewData, setReviewData] = useState({ fullName: '', email: '', whatsapp: '', businessName: '', honeypot: '' })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hasStarted, setHasStarted] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, summary])

  const sendUserMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return

    setHasStarted(true)
    setInput('')
    const history = messages
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, message: userMessage }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()

      if (data.done && data.summary) {
        setSummary(data.summary as PlannerSummary)
        setMessages((prev) => [...prev, { role: 'assistant', content: data.summary.fullSummary }])
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `I'm having trouble right now. Chat the team directly: ${CONTACT_LINK}` },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    sendUserMessage(input)
  }

  const handleChipClick = (prompt: string) => {
    sendUserMessage(prompt)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSubmitPlan = async () => {
    if (!summary || !reviewData.fullName || !reviewData.email || !reviewData.whatsapp) return
    setSubmitState('loading')

    try {
      const res = await fetch('/api/planner/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: reviewData.fullName,
          email: reviewData.email,
          whatsapp: reviewData.whatsapp,
          businessName: reviewData.businessName,
          industry: summary.industry,
          service: summary.serviceCategory,
          summary: summary.fullSummary,
          details: { ...summary, transcript: messages },
          honeypot: reviewData.honeypot,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  // Construct pre-filled WhatsApp message URL with project summary
  const getWhatsAppBriefUrl = () => {
    if (!summary) return CONTACT_LINK
    const text = `Hi Marvellous! I used your AI Planner on Marvel Develops.\n\n*Industry:* ${summary.industry}\n*Service:* ${summary.serviceCategory}\n*Summary:* ${summary.fullSummary}\n\nI'd like to discuss building this!`
    return `https://wa.me/2349030891731?text=${encodeURIComponent(text)}`
  }

  if (submitState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-text-dark">Project Brief Received!</h3>
        <p className="mb-1 font-sans text-text-mid">Founder Marvellous Adepoju will review your plan and respond within 24 hours.</p>
        <p className="mb-8 font-sans text-sm text-text-muted">A copy of your brief has been emailed to our system.</p>
        
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={CALENDLY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-royal-blue px-6 py-3.5 font-sans text-sm font-semibold text-white transition-all hover:bg-royal-blue-dark hover:shadow-md"
          >
            <Calendar className="h-4 w-4" />
            Book Strategy Call Now
          </a>
          <a
            href={getWhatsAppBriefUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-6 py-3.5 font-sans text-sm font-semibold text-whatsapp transition-colors hover:bg-whatsapp/20"
          >
            <MessageCircle className="h-4 w-4" />
            Send Brief on WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/80 bg-white shadow-md">
      {/* Chat header */}
      <div className="flex items-center gap-2.5 border-b border-border/80 bg-navy-deep px-4 sm:px-6 py-3.5 sm:py-4 text-white">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20">
          <Sparkles className="h-4 w-4 text-gold" />
        </div>
        <div>
          <h2 className="font-sans text-sm sm:text-base font-bold">AI Project Architecture Planner</h2>
          <p className="font-sans text-[11px] sm:text-xs text-white/60">Guided scope &amp; instant architecture recommendation</p>
        </div>
      </div>

      {/* Chat area */}
      <div ref={chatContainerRef} className="max-h-[52vh] sm:max-h-[58vh] xl:max-h-[54vh] overflow-y-auto p-4 sm:p-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <span className="font-sans text-[11px] font-bold text-gold">AI</span>
                </div>
              )}
              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'rounded-tr-sm bg-royal-blue text-white'
                    : 'rounded-tl-sm border border-border/80 bg-gray-white text-text-dark'
                }`}
              >
                <p className="whitespace-pre-wrap font-sans text-[14px] sm:text-[15px] leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Quick-Start Chips (Only visible before user sends first message) */}
          {!hasStarted && (
            <div className="mt-4 pt-2">
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-text-muted">
                ⚡ Select a quick-start industry or goal:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_START_CHIPS.map((chip) => {
                  const Icon = chip.icon
                  return (
                    <button
                      key={chip.label}
                      onClick={() => handleChipClick(chip.prompt)}
                      className="group flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2.5 font-sans text-xs font-semibold text-text-dark transition-all hover:border-royal-blue hover:bg-royal-blue/5 hover:text-royal-blue"
                    >
                      <Icon className="h-4 w-4 text-royal-blue group-hover:scale-110 transition-transform" />
                      {chip.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-end gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15">
                <span className="font-sans text-[11px] font-bold text-gold">AI</span>
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-gray-white px-4 py-3.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input or Summary & Closing Actions */}
      {!summary ? (
        <div className="border-t border-border bg-gray-white/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your business goal or answer..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-border bg-white px-4 py-3 font-sans text-base text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-blue text-white transition-colors hover:bg-royal-blue-dark disabled:opacity-40"
              aria-label="Send"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 hidden text-center font-sans text-[11px] text-text-muted sm:block">Press Enter to send · Shift+Enter for new line</p>
        </div>
      ) : (
        <div className="border-t border-border">
          {/* Project Brief Summary Card */}
          <div className="bg-navy-deep/[0.03] px-6 py-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-text-muted">Generated Architecture &amp; Brief</p>
              <button
                onClick={() => setEditingSummary((v) => !v)}
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-sans text-[12px] text-text-muted transition-colors hover:bg-border hover:text-text-dark"
              >
                <Pencil className="h-3 w-3" />
                {editingSummary ? 'Done' : 'Edit Brief'}
              </button>
            </div>

            {/* Tags row */}
            <div className="mb-3 flex flex-wrap gap-2">
              {summary.serviceCategory && (
                <span className="rounded-full bg-royal-blue/10 px-3 py-1 font-sans text-[12px] font-semibold text-royal-blue">
                  Category: {summary.serviceCategory}
                </span>
              )}
              {summary.industry && (
                <span className="rounded-full bg-gold/10 px-3 py-1 font-sans text-[12px] font-semibold text-gold-dark">
                  Industry: {summary.industry}
                </span>
              )}
              {summary.timeline && summary.timeline.toLowerCase() !== 'not specified' && (
                <span className="rounded-full bg-border px-3 py-1 font-sans text-[12px] font-medium text-text-mid">
                  Timeline: {summary.timeline}
                </span>
              )}
            </div>

            {editingSummary ? (
              <textarea
                rows={4}
                value={summary.fullSummary}
                onChange={(e) => setSummary({ ...summary, fullSummary: e.target.value })}
                className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 font-sans text-[14px] text-text-dark focus:border-royal-blue focus:outline-none"
              />
            ) : (
              <p className="font-sans text-[14px] leading-relaxed text-text-dark font-medium">{summary.fullSummary}</p>
            )}

            {/* Recommended Architecture Box */}
            <div className="mt-4 rounded-xl border border-royal-blue/20 bg-royal-blue/5 p-4">
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-royal-blue">
                💡 Recommended Marvel Architecture &amp; Delivery:
              </p>
              <p className="mt-1 font-sans text-xs text-text-mid leading-relaxed">
                • <strong>Tech Stack:</strong> Modern Next.js TypeScript Web App + Cloud Database + WhatsApp API Integration<br />
                • <strong>Includes:</strong> Custom Admin Dashboard + Mobile-Responsive User Interface + 30 Days Free Post-Launch Support
              </p>
            </div>
          </div>

          {/* 3 High-Converting Handoff Actions */}
          <div className="px-6 py-6">
            <p className="mb-2 font-display text-lg font-bold text-text-dark">Ready to bring this plan to life?</p>
            <p className="mb-5 font-sans text-sm text-text-muted">Choose how you&apos;d like to connect with founder Marvellous Adepoju:</p>

            {/* Instant Handoff Buttons */}
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <a
                href={CALENDLY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-royal-blue px-4 py-3.5 font-sans text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal-blue-dark"
              >
                <Calendar className="h-4 w-4" />
                Book Strategy Call (Calendly)
              </a>
              <a
                href={getWhatsAppBriefUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-whatsapp/30 bg-whatsapp/10 px-4 py-3.5 font-sans text-sm font-semibold text-whatsapp transition-colors hover:bg-whatsapp/20"
              >
                <MessageCircle className="h-4 w-4" />
                Send Brief on WhatsApp
              </a>
            </div>

            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <span className="relative bg-white px-3 font-sans text-xs uppercase tracking-wider text-text-muted font-semibold">Or send to our email system</span>
            </div>

            {/* Email form */}
            {submitState === 'error' && (
              <div className="mb-4 rounded-xl bg-red-50 p-4 font-sans text-sm text-red-600">
                Something went wrong. Please{' '}
                <a href="mailto:marveldevelops@gmail.com" className="font-semibold underline">email us directly</a>.
              </div>
            )}

            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              value={reviewData.honeypot}
              onChange={(e) => setReviewData((p) => ({ ...p, honeypot: e.target.value }))}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-sans text-[12px] font-semibold text-text-dark">Full Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. David Williams"
                    required
                    value={reviewData.fullName}
                    onChange={(e) => setReviewData((p) => ({ ...p, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-gray-white px-4 py-3 font-sans text-sm text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-[12px] font-semibold text-text-dark">Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Realty"
                    value={reviewData.businessName}
                    onChange={(e) => setReviewData((p) => ({ ...p, businessName: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-gray-white px-4 py-3 font-sans text-sm text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-sans text-[12px] font-semibold text-text-dark">Email Address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    placeholder="david@example.com"
                    required
                    value={reviewData.email}
                    onChange={(e) => setReviewData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-gray-white px-4 py-3 font-sans text-sm text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-[12px] font-semibold text-text-dark">WhatsApp Number <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    placeholder="+234..."
                    required
                    value={reviewData.whatsapp}
                    onChange={(e) => setReviewData((p) => ({ ...p, whatsapp: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-gray-white px-4 py-3 font-sans text-sm text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmitPlan}
                disabled={submitState === 'loading' || !reviewData.fullName || !reviewData.email || !reviewData.whatsapp}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-deep py-3.5 font-sans text-sm font-semibold text-white transition-all hover:bg-royal-blue disabled:opacity-50"
              >
                {submitState === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting Plan...
                  </>
                ) : (
                  <>
                    Submit Plan Brief to Email
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
