import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Sparkles,
  Quote,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  Linkedin,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  BlogPost,
} from '@/lib/blog'
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar'
import { ShareBar } from '@/components/blog/ShareBar'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ArticleCTA } from '@/components/blog/ArticleCTA'
import { BlogCard } from '@/components/blog/BlogCard'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return { title: 'Insight — Marvel Develops' }
  }

  const url = `https://marveldevelops.com/blog/${post.slug}`

  return {
    title: `${post.title} — Marvel Develops`,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Marvel Develops Insights`,
      description: post.metaDescription || post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Marvel Develops`,
      description: post.metaDescription || post.excerpt,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, 2)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Schema.org structured data for Google Rich Snippets
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: 'https://marveldevelops.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Marvel Develops',
      url: 'https://marveldevelops.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://marveldevelops.com/brand-logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://marveldevelops.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <ReadingProgressBar />
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-[#F8FAFC] pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          {/* Top Breadcrumb & Back button */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal-blue transition-colors hover:text-royal-blue-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              All Insights &amp; Breakdowns
            </Link>

            <span className="rounded-full bg-royal-blue/10 px-3 py-1 font-mono text-xs font-semibold text-royal-blue">
              {post.category}
            </span>
          </div>

          {/* Article Header */}
          <header className="mx-auto max-w-3xl text-center lg:max-w-4xl">
            <h1 className="font-display text-[clamp(28px,4.5vw,46px)] font-black leading-[1.15] tracking-tight text-navy-deep">
              {post.title}
            </h1>

            <p className="mt-5 font-sans text-lg leading-relaxed text-text-muted">
              {post.excerpt}
            </p>

            {/* Author & Metadata Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-y border-border/80 py-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-royal-blue/20">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-sans font-bold text-navy-deep">
                    {post.author.name}
                  </p>
                  <p className="font-sans text-[11px] text-text-muted">
                    Full-Stack System Architect
                  </p>
                </div>
              </div>

              <div className="h-4 w-[1px] bg-border hidden sm:block" />

              <div className="flex items-center gap-4 font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Related Case Study Spotlight (If linked) */}
          {post.relatedCaseStudySlug && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-royal-blue/30 bg-royal-blue/5 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-gold flex-shrink-0" />
                  <p className="font-sans text-xs font-medium text-navy-deep sm:text-sm">
                    This article breaks down the software system behind our live client project:
                  </p>
                </div>
                <Link
                  href={`/work/${post.relatedCaseStudySlug}`}
                  className="inline-flex items-center gap-1 font-sans text-xs font-bold text-royal-blue hover:underline"
                >
                  View Full Portfolio Case Study
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Main Content Layout with Sticky Sidebar */}
          <div className="mx-auto mt-12 grid max-w-6xl gap-12 lg:grid-cols-12">
            {/* Left Sticky Column: Table of Contents & Sharing (Large Screens) */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-6">
                <TableOfContents items={post.toc} />
                <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <ShareBar title={post.title} slug={post.slug} />
                </div>
              </div>
            </aside>

            {/* Right Column: Article Content */}
            <article className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-10 lg:col-span-8 lg:p-12">
              <div className="space-y-12">
                {post.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-32">
                    {section.heading && (
                      <h2 className="font-display text-2xl font-bold tracking-tight text-navy-deep md:text-3xl">
                        {section.heading}
                      </h2>
                    )}

                    {section.subheading && (
                      <h3 className="mt-4 font-display text-lg font-semibold text-royal-blue">
                        {section.subheading}
                      </h3>
                    )}

                    <div className="mt-4 space-y-4 font-sans text-base leading-relaxed text-text-dark/90 md:text-[17px]">
                      {section.paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    {/* Highlighted Quote Callout */}
                    {section.quote && (
                      <div className="my-8 rounded-2xl border-l-4 border-royal-blue bg-royal-blue/5 p-6 md:p-8">
                        <Quote className="mb-3 h-6 w-6 text-royal-blue/40" />
                        <blockquote className="font-display text-lg font-semibold italic text-navy-deep md:text-xl">
                          &ldquo;{section.quote.text}&rdquo;
                        </blockquote>
                        {section.quote.author && (
                          <div className="mt-3 font-sans text-xs font-semibold text-text-muted">
                            — {section.quote.author}
                            {section.quote.role && ` (${section.quote.role})`}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Metric Cards Banner */}
                    {section.metrics && section.metrics.length > 0 && (
                      <div className="my-8 grid gap-4 sm:grid-cols-3">
                        {section.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-border bg-[#F8FAFC] p-5 text-center shadow-xs"
                          >
                            <p className="font-display text-2xl font-black text-royal-blue md:text-3xl">
                              {m.value}
                            </p>
                            <p className="mt-1 font-sans text-xs font-bold uppercase tracking-wider text-navy-deep">
                              {m.label}
                            </p>
                            {m.description && (
                              <p className="mt-1 font-sans text-[11px] text-text-muted">
                                {m.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Callout Notice Boxes */}
                    {section.callout && (
                      <div
                        className={`my-8 rounded-2xl border p-5 md:p-6 ${
                          section.callout.type === 'warning'
                            ? 'border-amber-200 bg-amber-50/70 text-amber-900'
                            : section.callout.type === 'insight'
                            ? 'border-royal-blue/30 bg-royal-blue/5 text-navy-deep'
                            : 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {section.callout.type === 'warning' ? (
                            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 flex-shrink-0" />
                          ) : section.callout.type === 'insight' ? (
                            <Lightbulb className="mt-0.5 h-5 w-5 text-royal-blue flex-shrink-0" />
                          ) : (
                            <Info className="mt-0.5 h-5 w-5 text-emerald-600 flex-shrink-0" />
                          )}
                          <div>
                            <p className="font-sans font-bold text-sm">
                              {section.callout.title}
                            </p>
                            <p className="mt-1 font-sans text-sm leading-relaxed opacity-90">
                              {section.callout.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bullet Points */}
                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="my-6 space-y-3 font-sans text-sm text-text-dark md:text-base">
                        {section.bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-royal-blue flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Share Bar for Mobile/Tablet */}
              <div className="mt-12 border-t border-border pt-6 lg:hidden">
                <ShareBar title={post.title} slug={post.slug} />
              </div>

              {/* Author Bio Box */}
              <div className="mt-12 rounded-2xl border border-border bg-[#F8FAFC] p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-royal-blue flex-shrink-0">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-lg font-bold text-navy-deep">
                        {post.author.name}
                      </h4>
                      {post.author.linkedin && (
                        <a
                          href={post.author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-royal-blue hover:text-royal-blue-dark"
                          aria-label="LinkedIn profile"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="font-sans text-xs font-semibold text-royal-blue">
                      {post.author.role}
                    </p>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-text-muted">
                      Full-stack engineer and software architect helping founders and businesses replace messy manual spreadsheets with tailored, high-converting web applications and automated systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Inline Article CTA */}
              <div className="mt-12">
                <ArticleCTA variant="inline" />
              </div>
            </article>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="mx-auto mt-20 max-w-6xl border-t border-border/80 pt-16">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-gold">
                    Keep Reading
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-navy-deep">
                    More Engineering &amp; Strategy Breakdowns
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="font-sans text-sm font-semibold text-royal-blue hover:underline"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.slug} post={rPost} />
                ))}
              </div>
            </section>
          )}

          {/* Bottom Conversion Section */}
          <section className="mx-auto mt-20 max-w-6xl">
            <ArticleCTA variant="banner" />
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
