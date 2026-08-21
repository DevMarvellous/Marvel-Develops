'use client'

import { useState, useEffect } from 'react'
import { TableOfContentsItem } from '@/lib/blog'
import { List } from 'lucide-react'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.1,
      }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items || items.length === 0) return null

  return (
    <nav className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <List className="h-4 w-4 text-royal-blue" />
        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy-deep">
          Table of Contents
        </h4>
      </div>

      <ul className="mt-4 space-y-2.5 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block leading-relaxed transition-all duration-200 ${
                  isActive
                    ? 'font-semibold text-royal-blue translate-x-1'
                    : 'text-text-muted hover:text-navy-deep hover:translate-x-0.5'
                }`}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
