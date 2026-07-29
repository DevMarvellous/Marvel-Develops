'use client'

export function MobileStickyCTA() {
  const scrollToRegister = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-navy-deep px-4 py-3 md:hidden border-t border-gold/20 shadow-[0_-4px_24px_rgba(10,15,30,0.4)]">
      <a
        href="#register"
        onClick={scrollToRegister}
        className="flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 font-sans text-[15px] font-bold text-navy-deep shadow-[0_4px_16px_rgba(245,158,11,0.25)] transition-all active:scale-[0.98]"
      >
        Reserve Your Spot
      </a>
    </div>
  )
}
