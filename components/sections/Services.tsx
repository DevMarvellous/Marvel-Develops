'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Monitor, Smartphone, BarChart3, ClipboardList, Boxes, Zap } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Websites & Web Apps',
    description: 'Fast, professional websites and online tools that work smoothly on every device.',
    icon: Monitor,
  },
  {
    number: '02',
    title: 'Mobile Apps',
    description: 'Apps for Android and iPhone that your customers will actually enjoy using.',
    icon: Smartphone,
  },
  {
    number: '03',
    title: 'Dashboards & Reporting',
    description: 'See your business at a glance — sales, customers, and performance, all in one clear place.',
    icon: BarChart3,
  },
  {
    number: '04',
    title: 'Management Systems',
    description: 'Software to run the day-to-day: inventory, bookings, records, staff, and more.',
    icon: ClipboardList,
  },
  {
    number: '05',
    title: 'Custom Software',
    description: 'Tools built around exactly how your business works — not the other way around.',
    icon: Boxes,
  },
  {
    number: '06',
    title: 'Automations & Workflows',
    description: 'Cut the repetitive work — reminders, follow-ups, status updates, and reports that run themselves.',
    icon: Zap,
  },
]

const ease = [0.16, 1, 0.3, 1]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 400, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 400, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    const maxTilt = 8
    rotateX.set((mouseY / (rect.height / 2)) * -maxTilt)
    rotateY.set((mouseX / (rect.width / 2)) * maxTilt)
    x.set(mouseX * 0.05)
    y.set(mouseY * 0.05)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    x.set(0)
    y.set(0)
  }

  const Icon = service.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, x, y, transformStyle: 'preserve-3d' }}
      className="group relative cursor-default rounded-[var(--radius-card)] border border-border bg-white p-7 transition-all duration-400 hover:-translate-y-2 hover:border-royal-blue hover:shadow-[var(--shadow-hover)] active:scale-[0.98]"
    >
      {/* Gold border trace on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-[var(--radius-card)] border-2 border-transparent bg-gradient-to-r from-gold via-gold to-gold bg-clip-border" style={{ clipPath: 'inset(0 0 0 0 round var(--radius-card))' }} />
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-royal-blue-soft">
          <Icon className="h-6 w-6 stroke-royal-blue stroke-[1.5]" />
        </div>
        <h3 className="mb-3 font-display text-xl font-bold text-text-dark">{service.title}</h3>
        <p className="font-sans text-[15px] leading-relaxed text-text-mid">
          {service.description}
        </p>
        </div>
        </motion.div>

  )
}

export function Services() {
  const [showAll, setShowAll] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section id="services" ref={sectionRef} className="bg-gray-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            number="01"
            label="Services"
            headline={<>What we do<br />for our clients.</>}
            subtext="From everyday tools to complete systems, we build software that makes your business easier to run."
          />
        </motion.div>

        {/* Service Cards Grid
             Mobile  (<sm)  : 1 col — cards 0–2 visible, 3–5 hidden behind toggle
             Tablet  (sm–lg): 2 col — cards 0–3 visible, 4–5 hidden behind toggle
             Desktop (lg+)  : 3 col — all 6 always visible, no toggle */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={
                index < 3
                  ? 'block'
                  : index === 3
                  ? showAll ? 'block' : 'hidden sm:block'
                  : showAll ? 'block' : 'hidden lg:block'
              }
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>

        {/* Show All Button — hidden on desktop where all 6 are always visible */}
        {isMounted && (
          <div className="mt-8 text-center lg:hidden">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-lg border border-royal-blue/30 px-4 py-3 font-sans text-sm font-semibold text-royal-blue transition-colors hover:bg-royal-blue/5"
            >
              {showAll ? 'Show less' : 'Show all services'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
