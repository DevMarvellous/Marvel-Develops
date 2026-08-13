'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/2349030891731?text=Hi%20Marvellous%2C%20I%20have%20a%20question%20about%20a%20software%20project"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_4px_20px_rgba(37,211,102,0.40)] transition-all hover:bg-[#20ba5a]"
      aria-label="Chat with Founder on WhatsApp"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
      <MessageCircle className="h-5 w-5 fill-white text-[#25D366]" />
      <span className="font-sans text-sm font-semibold tracking-wide">Chat with Founder</span>
    </motion.a>
  )
}
