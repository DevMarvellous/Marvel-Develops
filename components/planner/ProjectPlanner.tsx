'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Check } from 'lucide-react'
import type { Message, PlannerSummary } from '@/lib/types'

const OPENING_MESSAGE =
  "Hi! I'm the Marvel Develops Project Planner. Tell me a bit about your business and the problem you're trying to solve — I'll help you figure out what to build."

const CONTACT_LINK = 'https://wa.me/2349030891731'

export function ProjectPlanner() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: OPENING_MESSAGE }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<PlannerSummary | null>(null)
  const [reviewData, setReviewData] = useState({ fullName: '', email: '', whatsapp: '', businessName: '', honeypot: '' })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
          <Check className="h-8 w-8 text-gold" />
        </div>
        <h3 className="mb-2 font-display text-xl font-bold text-text-dark">Plan sent!</h3>
        <p className="mb-4 font-sans text-text-mid">We&apos;ll get back to you within 24 hours.</p>
        <a
          href={CONTACT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm font-semibold text-whatsapp hover:underline"
        >
          Or chat us directly &rarr;
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-white">
      {/* Chat area */}
      <div className="max-h-[50vh] overflow-y-auto p-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  message.role === 'user'
                    ? 'bg-royal-blue text-white'
                    : 'border border-gold/20 bg-gray-white text-text-dark'
                }`}
              >
                <p className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl bg-gray-white px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input or review form */}
      {!summary ? (
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-blue text-white transition-colors hover:bg-royal-blue-dark disabled:opacity-50"
              aria-label="Send"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-border p-6">
          <h3 className="mb-4 font-sans text-lg font-bold text-text-dark">Almost done — where should we send this?</h3>
          {submitState === 'error' && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              Something went wrong. Please{' '}
              <a href="mailto:marvellousadepoju79@gmail.com" className="underline">email us directly</a>.
            </div>
          )}
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
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={reviewData.fullName}
                onChange={(e) => setReviewData((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
              />
              <input
                type="text"
                placeholder="Business Name"
                value={reviewData.businessName}
                onChange={(e) => setReviewData((p) => ({ ...p, businessName: e.target.value }))}
                className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={reviewData.email}
                onChange={(e) => setReviewData((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
              />
              <input
                type="tel"
                placeholder="WhatsApp Number *"
                required
                value={reviewData.whatsapp}
                onChange={(e) => setReviewData((p) => ({ ...p, whatsapp: e.target.value }))}
                className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
              />
            </div>
            <textarea
              rows={3}
              value={summary.fullSummary}
              onChange={(e) => setSummary({ ...summary, fullSummary: e.target.value })}
              className="w-full resize-none rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark focus:border-royal-blue focus:outline-none"
            />
            <button
              onClick={handleSubmitPlan}
              disabled={submitState === 'loading' || !reviewData.fullName || !reviewData.email || !reviewData.whatsapp}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-sans text-base font-bold text-navy transition-all hover:bg-gold-light disabled:opacity-60"
            >
              {submitState === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send this to Marvel Develops'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
