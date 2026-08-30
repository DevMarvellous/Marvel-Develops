'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { featuredProjects } from '@/lib/portfolio'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function WorkTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="work" ref={sectionRef} className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <SectionHeader
              number="02"
              label="Case Studies"
              headline={<>Real problems we&apos;ve<br />solved.</>}
            />
          </motion.div>
          <Link
            href="/work"
            className="group mb-12 hidden items-center gap-2 font-sans text-sm font-semibold text-royal-blue lg:mb-16 lg:inline-flex"
          >
            View all case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, ease, delay: index * 0.12 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-blue hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-light">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-navy-deep/80 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1.5 flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-text-dark group-hover:text-royal-blue transition-colors line-clamp-1">{project.title}</h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-royal-blue" />
                  </div>
                  <p className="flex-1 font-sans text-[13px] leading-relaxed text-text-mid line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Link href="/work" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal-blue">
            View all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
