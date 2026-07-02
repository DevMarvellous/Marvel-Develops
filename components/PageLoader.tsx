'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface PageLoaderProps {
  children: ReactNode
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem('site-visited')
    if (visited) {
      setHasVisited(true)
      setIsLoading(false)
    } else {
      localStorage.setItem('site-visited', 'true')
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [])

  if (hasVisited) {
    return <>{children}</>
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 font-serif text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              <Image
                src="/brand-logo.svg"
                alt="Brand Symbol"
                width={80}
                height={80}
                className="h-16 w-16 brightness-0 invert md:h-20 md:w-20"
              />
              Marvel Develops
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  )
}
