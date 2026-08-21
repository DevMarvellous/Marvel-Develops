'use client'

import { useState, useMemo } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { BlogPost, blogCategories, BlogCategory } from '@/lib/blog'
import { BlogCard } from './BlogCard'

interface BlogFilterProps {
  posts: BlogPost[]
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchQuery])

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0]
  }, [posts])

  return (
    <div className="space-y-12">
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-royal-blue text-white shadow-sm'
                  : 'bg-white text-text-muted hover:bg-gray-100 hover:text-text-dark border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search breakdowns, keywords..."
            className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 font-sans text-sm text-navy-deep placeholder:text-text-muted/60 focus:border-royal-blue focus:outline-none focus:ring-2 focus:ring-royal-blue/20"
          />
        </div>
      </div>

      {/* Featured Spotlight (Only show if on 'All' and no search query active) */}
      {selectedCategory === 'All' && searchQuery.trim() === '' && featuredPost && (
        <div className="pt-2">
          <BlogCard post={featuredPost} featured={true} />
        </div>
      )}

      {/* Grid of Filtered Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts
            .filter((p) =>
              selectedCategory === 'All' && searchQuery.trim() === ''
                ? p.slug !== featuredPost?.slug
                : true
            )
            .map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-white/50 p-12 text-center">
          <p className="font-display text-lg font-bold text-navy-deep">
            No articles match your search
          </p>
          <p className="mt-1 font-sans text-sm text-text-muted">
            Try resetting your search query or choosing another category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All')
              setSearchQuery('')
            }}
            className="mt-4 rounded-full bg-royal-blue px-5 py-2 font-sans text-xs font-semibold text-white hover:bg-royal-blue-dark"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
