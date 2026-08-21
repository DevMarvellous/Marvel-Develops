import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react'
import { BlogPost } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white via-white to-royal-blue/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-royal-blue/30 hover:shadow-xl md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-blue/10 px-3 py-1 font-mono text-xs font-semibold text-royal-blue">
              <Sparkles className="h-3 w-3 text-gold" />
              Featured Insight
            </span>
            <span className="rounded-full bg-navy-deep/5 px-3 py-1 font-mono text-xs font-medium text-text-dark">
              {post.category}
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-display text-2xl font-bold tracking-tight text-navy-deep transition-colors duration-200 group-hover:text-royal-blue md:text-3xl lg:text-4xl">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h3>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-muted md:text-lg">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-[11px] text-text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal-blue transition-all duration-200 group-hover:gap-3 group-hover:text-royal-blue-dark"
          >
            Read Breakdown
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-royal-blue/30 hover:shadow-lg">
      <div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="rounded-full bg-royal-blue/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-royal-blue">
            {post.category}
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-navy-deep transition-colors duration-200 group-hover:text-royal-blue">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-text-muted">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-6 border-t border-border/50 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-text-muted">{formattedDate}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-sans font-semibold text-royal-blue transition-colors group-hover:text-royal-blue-dark"
          >
            Read
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
