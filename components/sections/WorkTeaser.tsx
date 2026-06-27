'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { featuredProjects } from '@/lib/portfolio'

const ease = [0.16, 1, 0.3, 1]

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
              label="Selected Work"
              headline={<>Products we&apos;ve<br />shipped.</>}
            />
          </motion.div>
          <Link
            href="/work"
            className="group mb-12 hidden items-center gap-2 font-sans text-sm font-semibold text-royal-blue lg:mb-16 lg:inline-flex"
          >
            View all work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, ease, delay: index * 0.1 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-all duration-400 hover:-translate-y-2 hover:border-royal-blue hover:shadow-[var(--shadow-hover)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-light">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-navy-deep/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-text-dark">{project.title}</h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-text-muted transition-colors group-hover:text-royal-blue" />
                  </div>
                  <p className="flex-1 font-sans text-[14px] leading-relaxed text-text-mid">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link href="/work" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal-blue">
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
