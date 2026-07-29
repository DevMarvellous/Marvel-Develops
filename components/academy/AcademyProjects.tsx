'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { projects } from '@/lib/portfolio'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Pull specific projects by slug, in display order
const FEATURED_SLUGS = [
  'harvester-church-website',
  'fraogo-operations-platform',
  'brandsor-brand-identity-platform',
]

const featuredProjects = FEATURED_SLUGS.map((slug) =>
  projects.find((p) => p.slug === slug)
).filter(Boolean) as typeof projects

export function AcademyProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      className="bg-gray-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-14"
        >
          <SectionHeader
            label="Real Projects"
            headline={<>Built by Marvel Develops.<br />Yours to aspire to.</>}
            subtext="These are real, live projects that Marvel Develops has shipped. You'll be building things like this by the end of the programme."
          />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
            >
              {/* Screenshot */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-light">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                  {project.category}
                </p>
                <h3 className="mb-2 font-display text-lg font-bold text-text-dark">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 font-sans text-[14px] leading-relaxed text-text-mid">
                  {project.summary}
                </p>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-royal-blue underline-offset-4 transition-colors hover:underline"
                  >
                    View live site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
