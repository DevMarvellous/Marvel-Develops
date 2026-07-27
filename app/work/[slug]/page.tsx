import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, Check } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { projects, getProject } from '@/lib/portfolio'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Case Study — Marvel Develops' }
  const canonicalUrl = `https://marveldevelops.com/work/${project.slug}`
  return {
    title: `${project.title} — Marvel Develops`,
    description: project.overview || project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study | Marvel Develops`,
      description: project.overview || project.summary,
      url: canonicalUrl,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} Case Study | Marvel Develops`,
      description: project.overview || project.summary,
      images: [project.image],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-24 pt-32 lg:pt-40">
        <article className="mx-auto max-w-4xl px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal-blue transition-colors hover:text-royal-blue-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
            <span className="text-gold">{project.category}</span>
            <span>&middot;</span>
            <span>{project.client}</span>
            <span>&middot;</span>
            <span>{project.year}</span>
          </div>

          <h1 className="mb-5 font-display text-[clamp(28px,4.5vw,46px)] font-bold leading-[1.1] tracking-tight text-text-dark">
            {project.title}
          </h1>
          <p className="mb-10 max-w-2xl font-sans text-lg leading-relaxed text-text-mid">
            {project.summary}
          </p>

          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-gray-light">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>

          {/* Body */}
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="space-y-10">
              <section>
                <h2 className="mb-3 font-display text-xl font-bold text-text-dark">The challenge</h2>
                <p className="font-sans text-[16px] leading-relaxed text-text-mid">{project.problem}</p>
              </section>
              <section>
                <h2 className="mb-3 font-display text-xl font-bold text-text-dark">What we built</h2>
                <p className="font-sans text-[16px] leading-relaxed text-text-mid">{project.solution}</p>
              </section>
              <section>
                <h2 className="mb-4 font-display text-xl font-bold text-text-dark">Key things we delivered</h2>
                <ul className="space-y-3">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span className="font-sans text-[16px] leading-relaxed text-text-mid">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-gray-white p-6">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                Tech stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-white px-3 py-1 font-sans text-[13px] font-medium text-text-dark"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal-blue hover:underline"
                >
                  Visit live site
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </aside>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-[var(--radius-card)] border border-border bg-royal-blue-soft p-8 text-center lg:p-12">
            <h2 className="mb-3 font-display text-2xl font-bold text-text-dark">
              Want something like this built?
            </h2>
            <p className="mx-auto mb-6 max-w-md font-sans text-text-mid">
              Tell us about your project and we&apos;ll show you how we&apos;d approach it.
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-royal-blue px-7 py-3.5 font-sans text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-royal-blue-dark hover:shadow-[var(--shadow-hover)]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
