import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { publishedProjects as projects } from '@/lib/portfolio'

export const metadata: Metadata = {
  title: 'Case Studies — Marvel Develops',
  description: 'Selected software engineering projects built by Marvel Develops — custom web applications, mobile apps, and SaaS platforms.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Case Studies & Portfolio | Marvel Develops',
    description: 'Selected software engineering projects built by Marvel Develops — custom web applications, mobile apps, and SaaS platforms.',
    url: 'https://marveldevelops.com/work',
  },
}

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          <header className="mb-8 max-w-3xl lg:mb-20">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
              Case Studies
            </p>
            <h1 className="mb-5 font-display text-[clamp(30px,5vw,50px)] font-bold leading-[1.08] tracking-tight text-text-dark">
              Real problems we&apos;ve solved.
            </h1>
            <p className="font-sans text-lg leading-relaxed text-text-mid">
              A selection of products we&apos;ve designed and built end to end. Each one
              started as a real business problem.
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-royal-blue hover:shadow-[var(--shadow-hover)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-light">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy-deep/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl font-bold text-text-dark">{project.title}</h2>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-text-muted transition-colors group-hover:text-royal-blue" />
                  </div>
                  <p className="mb-5 flex-1 font-sans text-[15px] leading-relaxed text-text-mid">
                    {project.overview}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-royal-blue">
                    Read the full story
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
