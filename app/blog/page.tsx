import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getAllPosts } from '@/lib/blog'
import { BlogFilter } from '@/components/blog/BlogFilter'
import { ArticleCTA } from '@/components/blog/ArticleCTA'
import { Sparkles, ShieldCheck, Zap, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Software & Automation Insights for Businesses — Marvel Develops',
  description:
    'Practical breakdowns on custom software, workflow automation, and tech strategy that help modern businesses scale and cut manual work.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Software & Automation Insights | Marvel Develops',
    description:
      'Practical breakdowns on custom software, workflow automation, and tech strategy that help businesses scale.',
    url: 'https://marveldevelops.com/blog',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC] pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          {/* Header */}
          <header className="mb-12 max-w-3xl lg:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-deep">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Software &amp; Automation Insights
            </div>
            <h1 className="mb-5 font-display text-[clamp(32px,5vw,52px)] font-black leading-[1.08] tracking-tight text-navy-deep">
              Practical software, automations &amp; business guides.
            </h1>
            <p className="font-sans text-lg leading-relaxed text-text-muted">
              Deep dives into how custom software, AI, and automations help businesses run faster, eliminate manual work, and scale profit.
            </p>

            {/* Quick Trust Highlights */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border/70 pt-6 text-xs text-text-muted">
              <div className="flex items-center gap-2 font-mono">
                <ShieldCheck className="h-4 w-4 text-royal-blue" />
                <span>Zero Fluff or Jargon</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Zap className="h-4 w-4 text-gold" />
                <span>Real Business Breakdowns</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <span>Actionable Guides</span>
              </div>
            </div>
          </header>

          {/* Interactive Filter & Articles Grid */}
          <div className="mb-20">
            <BlogFilter posts={posts} />
          </div>

          {/* Bottom Conversion Section */}
          <section className="mt-16">
            <ArticleCTA variant="banner" />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
