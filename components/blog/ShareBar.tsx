'use client'

import { useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'

interface ShareBarProps {
  title: string
  slug: string
}

export function ShareBar({ title, slug }: ShareBarProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://marveldevelops.com/blog/${slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      fullUrl
    )}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareOnX = () => {
    const text = `Check out this breakdown from @marvel_14_code: "${title}"`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(fullUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
        <Share2 className="h-3.5 w-3.5" />
        Share Insight:
      </span>

      {/* Share to LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-text-dark shadow-sm transition-colors hover:border-[#0077B5] hover:bg-[#0077B5]/5 hover:text-[#0077B5]"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
        </svg>
        LinkedIn
      </button>

      {/* Share to X */}
      <button
        onClick={shareOnX}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-text-dark shadow-sm transition-colors hover:border-black hover:bg-black/5 hover:text-black"
        aria-label="Share on X"
      >
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X (Twitter)
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-text-dark shadow-sm transition-colors hover:border-royal-blue hover:bg-royal-blue/5 hover:text-royal-blue"
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-600" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy Link
          </>
        )}
      </button>
    </div>
  )
}
