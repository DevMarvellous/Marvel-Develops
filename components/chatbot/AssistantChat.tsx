'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, Loader2 } from 'lucide-react'
import type { Message } from '@/lib/types'

// Assistant name + opening line for Marvel Develops. (Name is a working placeholder.)
const ASSISTANT_NAME = 'Otto'
const OPENING_MESSAGE = `Hey, I'm ${ASSISTANT_NAME} — the Marvel Develops assistant. I can walk you through what we build, how we work, or help you figure out what your project needs. What's on your mind?`

const CONTACT_LINK = 'https://wa.me/2349030891731'

const MAX_MESSAGES = 20

export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-open on desktop after 10 seconds (only once per session)
  useEffect(() => {
    const wasAutoOpened = sessionStorage.getItem('assistant-auto-opened')
    const isMobile = window.innerWidth < 1024

    if (!wasAutoOpened && !isMobile) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasAutoOpened(true)
        sessionStorage.setItem('assistant-auto-opened', 'true')
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Add opening message when chat opens for first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: OPENING_MESSAGE }])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    // Check rate limit
    if (messageCount >= MAX_MESSAGES) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I've hit my limit for now! Chat the team directly: ${CONTACT_LINK}`
      }])
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    setMessageCount(prev => prev + 1)

    try {
      // Lazy-load the fetch wrapper so it's not in the initial page bundle.
      // The actual AI SDK now lives only in the server route, never shipped to the browser.
      const { sendChatMessage } = await import('@/lib/chat-client')
      const response = await sendChatMessage(messages, userMessage)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Oops, I'm having trouble connecting. Chat the team directly: ${CONTACT_LINK}`
      }])
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {isMounted && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-royal-blue text-white shadow-[0_4px_20px_rgba(79,70,229,0.40)] transition-transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close chat' : `Open chat with ${ASSISTANT_NAME}`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Sparkles className="h-6 w-6 fill-white" />
          )}
        </motion.button>
      )}


      {/* Tooltip (desktop only) */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-navy px-3 py-2 font-sans text-[13px] text-white lg:block">
          Ask {ASSISTANT_NAME}
          <div className="absolute right-5 top-full border-4 border-transparent border-t-navy" />
        </div>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute bottom-20 right-0 flex h-[70vh] w-[90vw] max-w-[340px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:h-[480px]"
          >

            {/* Header */}
            <div className="flex items-center gap-3 bg-gold px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10">
                <Sparkles className="h-5 w-5 fill-navy text-navy" />
              </div>
              <div>
                <p className="font-sans text-[15px] font-bold text-navy">{ASSISTANT_NAME}</p>
                <p className="font-sans text-xs text-navy/70">AI Assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto p-1 text-navy/50 transition-colors hover:text-navy"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.role === 'user'
                          ? 'bg-royal-blue text-white'
                          : 'border border-gold/20 bg-gray-white text-text-dark shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap font-sans text-[14px] leading-relaxed">
                        {message.content.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                          part.match(/^https?:\/\//) ? (
                            <a
                              key={i}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-gold/50 underline-offset-2 hover:text-royal-blue transition-colors break-all"
                            >
                              {part}
                            </a>
                          ) : part
                        )}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl bg-gray-white px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-border bg-gray-white px-4 py-2.5 font-sans text-[14px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue text-white transition-colors hover:bg-royal-blue-dark disabled:opacity-50"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
