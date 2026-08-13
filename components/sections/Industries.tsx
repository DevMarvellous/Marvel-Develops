'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Landmark, Stethoscope, ShoppingCart, GraduationCap, Truck, Rocket, Building2, Hotel, Scale } from 'lucide-react'

const industries = [
  { name: 'Fintech', icon: Landmark },
  { name: 'Real Estate & Property', icon: Building2 },
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Hospitality & Hotels', icon: Hotel },
  { name: 'E-commerce & Retail', icon: ShoppingCart },
  { name: 'Legal & Professional', icon: Scale },
  { name: 'Education', icon: GraduationCap },
  { name: 'Logistics & Transport', icon: Truck },
  { name: 'Startups & SaaS', icon: Rocket },
]

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section id="industries" ref={sectionRef} className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            number="02"
            label="Industries"
            headline={<>We speak your<br />industry&apos;s language.</>}
          />
        </motion.div>

        {/* Industry Tiles Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, ease, delay: index * 0.08 }}
                className="group relative cursor-default overflow-hidden rounded-[14px] border border-border bg-gray-white p-7 text-center transition-all duration-350"
              >
                {/* Flood fill effect on hover */}
                <div className="absolute inset-x-0 bottom-0 h-0 bg-royal-blue transition-all duration-350 group-hover:h-full" style={{ borderRadius: 'inherit' }} />
                
                <div className="relative z-10">
                  <Icon className="mx-auto mb-3 h-9 w-9 stroke-royal-blue stroke-[1.5] transition-colors duration-350 group-hover:stroke-white" />
                  <p className="font-sans text-[15px] font-semibold text-text-dark transition-colors duration-350 group-hover:text-white">
                    {industry.name}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
