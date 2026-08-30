'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Insights' },
  { href: '/academy', label: 'Academy' },
  { href: '/plan', label: '✨ AI Planner' },
]


export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Solid (light) chrome whenever scrolled, OR on any non-home page (whose
  // hero is light, so a transparent white-text navbar would be invisible).
  const solid = isScrolled || !isHome

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          solid
            ? 'bg-white/90 backdrop-blur-[20px] shadow-[0_1px_0_var(--border)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-[var(--container-pad-mobile)] py-4 lg:px-[var(--container-pad-desktop)]">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <Image
              src="/brand-logo.svg"
              alt="Marvel Develops"
              width={40}
              height={40}
              className={`h-8 w-8 transition-all duration-300 lg:h-9 lg:w-9`}
              priority
            />
            <span
              className={`font-display text-2xl font-black tracking-tight transition-colors duration-300 lg:text-[26px] ${
                solid ? 'text-royal-blue' : 'text-white'
              }`}
            >
              Marvel Develops
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-sans text-[15px] font-medium transition-colors duration-200 ${
                  solid ? 'text-text-dark hover:text-royal-blue' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`relative z-10 p-2 lg:hidden ${solid ? 'text-text-dark' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col justify-between bg-navy-deep bg-grid p-8"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-white/80 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-7 py-12">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="font-display text-2xl font-semibold text-white transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center font-sans text-xs text-white/40">
                marveldevelops.com
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
