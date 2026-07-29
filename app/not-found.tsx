'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AssistantChat } from '@/components/chatbot/AssistantChat'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <h1 className="mb-4 font-serif text-[120px] font-bold italic leading-none text-gold lg:text-[180px]">
          404
        </h1>
        <h2 className="mb-3 font-sans text-2xl font-bold text-white lg:text-3xl">
          {"This page doesn't exist."}
        </h2>
        <p className="mb-8 font-sans text-lg text-text-white-muted">
          {"But we do. Let's get you back."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-royal-blue px-8 py-4 font-sans text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-royal-blue-dark hover:shadow-[var(--shadow-hover)]"
        >
          &larr; Back to Home
        </Link>
        <p className="mt-6 font-sans text-sm text-text-white-muted">
          Or chat with our assistant if you need help
        </p>
      </motion.div>

      {/* Assistant is still visible */}
      <AssistantChat />
    </main>
  )
}
