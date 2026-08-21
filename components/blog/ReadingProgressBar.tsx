'use client'

import { useState, useEffect } from 'react'

export function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        )
      }
    }

    window.addEventListener('scroll', updateScrollCompletion)
    return () => window.removeEventListener('scroll', updateScrollCompletion)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-royal-blue via-royal-blue to-gold transition-all duration-150 ease-out"
      style={{ width: `${completion}%` }}
    />
  )
}
