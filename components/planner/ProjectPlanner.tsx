'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Check, Pencil, ArrowRight } from 'lucide-react'
import type { Message, PlannerSummary } from '@/lib/types'

const OPENING_MESSAGE =
  "Hi! I'm the Marvel Develops Project Planner. Tell me a bit about your business and the problem you're trying to solve — I'll help you figure out what to build."

const CONTACT_LINK = 'https://wa.me/2349030891731'

export function ProjectPlanner() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: OPENING_MESSAGE }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<PlannerSummary | null>(null)
  const [editingSummary, setEditingSummary] = useState(false)
  const [reviewData, setReviewData] = useState({ fullName: '', email: '', whatsapp: '', businessName: '', honeypot: '' })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, summary])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    const history = messages
    setInput('')
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

  if (submitState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-text-dark">Plan received!</h3>
        <p className="mb-1 font-sans text-text-mid">We&apos;ll review your brief and be in touch within 24 hours.</p>
        <p className="mb-8 font-sans text-sm text-text-muted">Check your email for a confirmation.</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="/work"
            className="inline-flex items-center gap-2 rounded-full bg-royal-blue px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-royal-blue-dark"
          >
            See our work <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={CONTACT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-semibold text-text-mid hover:text-text-dark"
          >
            Or chat us on WhatsApp →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">

      {/* Chat area */}
      <div ref={chatContainerRef} className="max-h-[45vh] overflow-y-auto p-6 sm:max-h-[52vh]">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <span className="font-sans text-[11px] font-bold text-gold">AI</span>
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'rounded-tr-sm bg-royal-blue text-white'
                    : 'rounded-tl-sm border border-border bg-gray-white text-text-dark'
                }`}
              >
                <p className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

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

      {/* Input or review form */}
      {!summary ? (
        <div className="border-t border-border bg-gray-white/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
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

          {/* Project brief card */}
          <div className="bg-navy-deep/[0.03] px-6 py-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-text-muted">Your Project Brief</p>
              <button
                onClick={() => setEditingSummary((v) => !v)}
                className="flex items-center gap-1 rounded-lg px-2 py-2.5 font-sans text-[12px] text-text-muted transition-colors hover:bg-border hover:text-text-dark"
              >
                <Pencil className="h-3 w-3" />
                {editingSummary ? 'Done' : 'Edit'}
              </button>
            </div>

            {/* Tags row */}
            <div className="mb-3 flex flex-wrap gap-2">
              {summary.serviceCategory && (
                <span className="rounded-full bg-royal-blue/10 px-3 py-1 font-sans text-[12px] font-medium text-royal-blue">
                  {summary.serviceCategory}
                </span>
              )}
              {summary.industry && (
                <span className="rounded-full bg-gold/10 px-3 py-1 font-sans text-[12px] font-medium text-gold-dark">
                  {summary.industry}
                </span>
              )}
              {summary.timeline && summary.timeline.toLowerCase() !== 'not specified' && (
                <span className="rounded-full bg-border px-3 py-1 font-sans text-[12px] font-medium text-text-mid">
                  {summary.timeline}
                </span>
              )}
              {summary.budget && summary.budget.toLowerCase() !== 'not specified' && (
                <span className="rounded-full bg-border px-3 py-1 font-sans text-[12px] font-medium text-text-mid">
                  {summary.budget}
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
              <p className="font-sans text-[14px] leading-relaxed text-text-mid">{summary.fullSummary}</p>
            )}
          </div>

          {/* Contact fields */}
          <div className="px-6 py-5">
            <p className="mb-1 font-display text-lg font-bold text-text-dark">Almost done — where should we send this?</p>
            <p className="mb-5 font-sans text-sm text-text-muted">We&apos;ll review your brief and get back to you within 24 hours.</p>

            {submitState === 'error' && (
              <div className="mb-4 rounded-xl bg-red-50 p-4 font-sans text-sm text-red-600">
                Something went wrong. Please{' '}
                <a href="mailto:marvellousadepoju79@gmail.com" className="font-semibold underline">email us directly</a>.
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
                    placeholder="John Doe"
                    required
                    value={reviewData.fullName}
                    onChange={(e) => setReviewData((p) => ({ ...p, fullName: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-base text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-[12px] font-semibold text-text-dark">Business Name</label>
                  <input
                    type="text"
                    placeholder="Acme Co."
                    value={reviewData.businessName}
                    onChange={(e) => setReviewData((p) => ({ ...p, businessName: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-base text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-sans text-[12px] font-semibold text-text-dark">Email Address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={reviewData.email}
                    onChange={(e) => setReviewData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-base text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-[12px] font-semibold text-text-dark">WhatsApp Number <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    required
                    value={reviewData.whatsapp}
                    onChange={(e) => setReviewData((p) => ({ ...p, whatsapp: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-base text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmitPlan}
                disabled={submitState === 'loading' || !reviewData.fullName || !reviewData.email || !reviewData.whatsapp}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-royal-blue px-6 py-4 font-sans text-base font-bold text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] transition-all hover:bg-royal-blue-dark disabled:opacity-50"
              >
                {submitState === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending your plan...
                  </>
                ) : (
                  <>
                    Send this to Marvel Develops
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center font-sans text-[12px] text-text-muted">
                Or reach us directly on{' '}
                <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-text-mid hover:text-text-dark">
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
