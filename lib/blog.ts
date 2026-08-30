// ============================================================================
// BLOG & INSIGHTS DATA — powers /blog and /blog/[slug]
//
// Structured as zero-database, statically generated, high-converting content
// tailored for LinkedIn distribution, B2B founders, and enterprise clients.
// ============================================================================

export interface Author {
  name: string
  role: string
  avatar: string
  linkedin?: string
  x?: string
}

export interface TableOfContentsItem {
  id: string
  title: string
  level?: number
}

export interface MetricHighlight {
  label: string
  value: string
  description?: string
}

export interface ContentSection {
  id: string
  heading?: string
  subheading?: string
  paragraphs: string[]
  quote?: {
    text: string
    author?: string
    role?: string
  }
  callout?: {
    title: string
    text: string
    type?: 'tip' | 'warning' | 'insight'
  }
  codeBlock?: {
    language: string
    filename?: string
    code: string
  }
  bulletPoints?: string[]
  metrics?: MetricHighlight[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: 'Case Breakdown' | 'Strategy' | 'Engineering' | 'AI & Automation'
  publishedAt: string
  readTime: string
  coverImage?: string
  featured?: boolean
  published: boolean
  tags: string[]
  author: Author
  metaDescription: string
  toc: TableOfContentsItem[]
  sections: ContentSection[]
  relatedCaseStudySlug?: string
}

export const defaultAuthor: Author = {
  name: 'Marvellous Adepoju',
  role: 'Founder & Full-Stack System Architect at Marvel Develops',
  avatar: '/founder.jpg',
  linkedin: 'https://www.linkedin.com/in/marveldevelops',
  x: 'https://x.com/marvel_14_code',
}

export const blogCategories = [
  'All',
  'Case Breakdown',
  'Strategy',
  'Engineering',
  'AI & Automation',
] as const

export type BlogCategory = (typeof blogCategories)[number]

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-we-engineered-11-area-operations-platform-logistics',
    title: 'How We Engineered an 11-Area Operations Suite for a Logistics Company',
    excerpt:
      'The complete architectural and operational breakdown of building Fraogo — eliminating hundreds of manual customer enquiry calls, automating 8 email triggers, and centralizing logistics across continents.',
    category: 'Case Breakdown',
    publishedAt: '2026-08-10',
    readTime: '7 min read',
    featured: true,
    published: true,
    tags: ['Case Study', 'System Architecture', 'Logistics', 'Next.js', 'Automation'],
    author: defaultAuthor,
    metaDescription:
      'A deep dive into how Marvel Develops built Fraogo: a multi-service operations platform featuring self-serve tracking, an 11-area admin panel, and automated workflows.',
    relatedCaseStudySlug: 'fraogo-operations-platform',
    toc: [
      { id: 'the-operational-bottleneck', title: 'The Multi-Service Bottleneck' },
      { id: 'core-architectural-goals', title: 'Core Architectural Goals' },
      { id: 'key-systems-delivered', title: 'The 3 Core Systems We Built' },
      { id: 'automated-workflows', title: 'Eliminating Friction with 8 Automated Triggers' },
      { id: 'technical-stack-decisions', title: 'Why Next.js, Server Actions & Supabase' },
      { id: 'business-impact-metrics', title: 'The Business Impact & Takeaways' },
    ],
    sections: [
      {
        id: 'the-operational-bottleneck',
        heading: 'The Multi-Service Bottleneck: When WhatsApp & Spreadsheets Break',
        paragraphs: [
          'Fraogo is a fast-growing logistics and procurement firm operating both within Nigeria and across international supply chains. Their services span international procurement, local delivery, home relocation logistics, bulk commodities supply, and a vetted vendor hire marketplace.',
          'As order volume expanded, manual workflows began creating severe operational friction. Every single order update required a phone call or manual WhatsApp exchange. Invoices were manually drafted in word processors, and external vendor applications were reviewed without automated identity checks.',
        ],
        quote: {
          text: 'If your business relies on humans answering "Where is my order?" 50 times a day, you don’t have a staffing problem — you have a systems architecture problem.',
          author: 'Marvellous Adepoju',
          role: 'Founder, Marvel Develops',
        },
        callout: {
          title: 'The Hidden Cost of Fragmented Tools',
          text: 'Using 6 different tools (WhatsApp, Excel, Google Forms, manual PDFs) creates data silos where tracking an order history takes 15 minutes of manual cross-referencing per customer.',
          type: 'warning',
        },
      },
      {
        id: 'core-architectural-goals',
        heading: 'Core Architectural Goals',
        paragraphs: [
          'When we sat down with the leadership team, our objective was clear: we were not just building a pretty website. We were building an operational command center that could handle 10x current order volume without requiring new administrative hires.',
          'We established four primary non-negotiables for the architecture:',
        ],
        bulletPoints: [
          'Zero-friction self-serve order tracking: customers inspect live timeline stages with a single tracking code.',
          'Unified operations hub: 11 distinct operational areas accessible under a single authenticated dashboard.',
          'Integrated billing: one-click branded PDF invoice generation, storage, and direct email dispatch.',
          'Zero-touch automated customer lifecycle emails: automated triggers for submissions, stage advances, and vendor approvals.',
        ],
      },
      {
        id: 'key-systems-delivered',
        heading: 'The 3 Core Systems We Built',
        paragraphs: [
          'Instead of deploying disconnected third-party plugins, we architected three cohesive modules that share the same data layer:',
          '1. **Customer Front-End & Multi-Form Hub**: Six dedicated service submission workflows tailored with specific field validations (e.g. international cargo weight, pickup coordinates, vehicle requirements).',
          '2. **Vetted Vendor Marketplace**: A public vendor directory with NIN document verification workflows and direct hire requests routed straight into the operations pipeline.',
          '3. **11-Area Operations Command Suite**: A high-density admin interface allowing operators to update cargo statuses, manage bulk supply quotations, compose customer emails with attachments, and publish blog articles via external contributor links.',
        ],
        metrics: [
          { label: 'Operational Areas', value: '11 Modules', description: 'Centralized into 1 command suite' },
          { label: 'Status Calls Reduced', value: '-85%', description: 'Via real-time self-serve tracking' },
          { label: 'Invoice Creation', value: '< 45s', description: 'Down from 15+ mins per order' },
        ],
      },
      {
        id: 'automated-workflows',
        heading: 'Eliminating Friction with 8 Automated Triggers',
        paragraphs: [
          'One of the largest time-sinks in logistics is status communication. We implemented eight automated lifecycle triggers:',
          'When an order stage advances in the admin panel, the system automatically compiles an email update with order reference IDs and direct tracking links. When a vendor is vetted and approved, the system generates a secure dashboard magic link and notifies them immediately.',
        ],
        callout: {
          title: 'Engineering Insight: Resilient Email Architecture',
          text: 'Transactional emails are dispatched asynchronously via dedicated server actions with retry fallbacks, ensuring customer notifications never block UI updates or cause request timeouts.',
          type: 'insight',
        },
      },
      {
        id: 'technical-stack-decisions',
        heading: 'Why Next.js, Server Actions & Supabase',
        paragraphs: [
          'For a business-critical system with high read volume on tracking and heavy write operations in the admin panel, we chose:',
        ],
        bulletPoints: [
          'Next.js 16 (App Router): Gives us instant server-side rendering for public marketing pages and blazing fast client-side navigation inside the operational dashboard.',
          'TypeScript & Prisma: Absolute type-safety across all 6 order types and admin mutations, eliminating runtime data anomalies.',
          'Supabase (PostgreSQL with RLS): Row-Level Security policies ensure vendor records, customer orders, and internal financial records remain strictly segregated and guarded.',
          'Tailwind CSS v4: Allowed us to build a high-density, ergonomic UI designed specifically for dispatchers and operators who work in the platform 8+ hours a day.',
        ],
      },
      {
        id: 'business-impact-metrics',
        heading: 'The Business Impact & Key Takeaways',
        paragraphs: [
          'Within the first month of deploying the platform, the client reported an 85% drop in incoming order status phone calls and cut their billing turnaround from 24 hours down to under 2 minutes.',
          'The lesson for growing businesses is straightforward: software is not an overhead expense. When tailored directly to your operational bottlenecks, custom software is a direct multiplier on profit margin and team efficiency.',
        ],
      },
    ],
  },
  {
    slug: 'custom-software-vs-off-the-shelf-saas',
    title: 'Custom Software vs Off-The-Shelf SaaS: When Is It Time to Build Your Own?',
    excerpt:
      'A practical financial and strategic guide for founders and business owners on evaluating subscription SaaS bloat versus building tailored internal software.',
    category: 'Strategy',
    publishedAt: '2026-08-04',
    readTime: '6 min read',
    featured: false,
    published: true,
    tags: ['ROI', 'B2B Strategy', 'Cost Optimization', 'Software Architecture'],
    author: defaultAuthor,
    metaDescription:
      'Compare the total cost of ownership between monthly subscription SaaS bloat and custom software development. Discover the exact inflection points when building makes sense.',
    toc: [
      { id: 'the-saas-subscription-trap', title: 'The SaaS Subscription Trap' },
      { id: 'when-saas-makes-sense', title: 'When You SHOULD Use Off-The-Shelf Tools' },
      { id: 'the-3-inflection-points', title: 'The 3 Inflection Points to Build Custom' },
      { id: 'total-cost-comparison', title: 'Financial Model: 3-Year Total Cost Comparison' },
      { id: 'how-to-start-without-overspending', title: 'How to Build Without Overspending' },
    ],
    sections: [
      {
        id: 'the-saas-subscription-trap',
        heading: 'The SaaS Subscription Trap: The $1,500/Month Frankenstein Stack',
        paragraphs: [
          'Every growing company starts the same way: you need a CRM, so you sign up for HubSpot or Salesforce. You need form submissions, so you subscribe to Typeform. You need automation, so you pay for Zapier. You need customer tracking, so you add Monday or ClickUp.',
          'Before long, your business is paying $1,200–$3,000 every month for 7 disconnected software subscriptions. Worse, your team spends 20% of their workday copy-pasting data between tabs because none of these tools are tailored to your exact business logic.',
        ],
        quote: {
          text: 'Off-the-shelf SaaS forces your business to conform to their software. Custom software conforms to the exact way your business makes money.',
          author: 'Marvellous Adepoju',
          role: 'Founder, Marvel Develops',
        },
      },
      {
        id: 'when-saas-makes-sense',
        heading: 'When You SHOULD Use Off-The-Shelf Tools',
        paragraphs: [
          'Let’s be balanced: building custom software for everything is a terrible idea. If a business problem is not a core differentiator, you should almost always buy off-the-shelf.',
        ],
        bulletPoints: [
          'Commodity functions: Accounting (QuickBooks, Xero), Email delivery (Resend, Google Workspace), Video conferencing (Zoom, Google Meet).',
          'Pre-product-market fit: If you don’t yet know what your workflow will look like next month, do not build custom software yet.',
          'Temporary prototypes: Validating a simple landing page idea or one-off campaign.',
        ],
      },
      {
        id: 'the-3-inflection-points',
        heading: 'The 3 Inflection Points to Build Custom',
        paragraphs: [
          'How do you know when your company has outgrown commercial SaaS? There are three clear inflection points:',
        ],
        bulletPoints: [
          '1. **Seat-Based Pricing Penalties**: When adding 15 team members or field operators increases your software bill by $800/month, commercial pricing models begin punishing your company’s growth.',
          '2. **The "Zapier Spiderweb" Problem**: If your core client journey relies on 12 Zapier webhooks and one broken payload crashes customer onboarding, your stack is dangerously fragile.',
          '3. **Proprietary Process Differentiation**: If the way you onboard clients, fulfill orders, or manage vendor quality is your unique competitive advantage, you cannot run it on the same generic template your competitors use.',
        ],
        callout: {
          title: 'The Competitive Advantage Rule',
          text: 'If a workflow directly impacts how fast you close deals, deliver orders, or retain customers, owning the intellectual property gives your business an unfair advantage.',
          type: 'tip',
        },
      },
      {
        id: 'total-cost-comparison',
        heading: 'Financial Model: 3-Year Total Cost Comparison',
        paragraphs: [
          'Consider a 20-person logistics or service firm evaluating a commercial enterprise suite vs a custom web platform:',
        ],
        metrics: [
          { label: 'Commercial SaaS (3 Yrs)', value: '$54,000+', description: '20 seats × $75/mo + add-ons + Zapier' },
          { label: 'Custom Build + Hosting', value: '$8,500 - $14,000', description: 'One-time build + minimal server costs' },
          { label: '3-Year Net Savings', value: '$40,000+', description: 'Plus 100% ownership of your digital IP' },
        ],
      },
      {
        id: 'how-to-start-without-overspending',
        heading: 'How to Build Without Overspending: The Modular Approach',
        paragraphs: [
          'The biggest mistake businesses make with custom software is trying to build an all-in-one ERP in version 1.0.',
          'The smart approach is **Modular Replacement**: identify your single most expensive manual bottleneck (e.g. order tracking or quotation generation), build a lean custom tool for that specific area in 3–4 weeks, and expand iteratively as your revenue scales.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-scope-and-ship-saas-mvp-in-6-weeks',
    title: 'Scoping and Shipping a Scalable SaaS MVP in 6 Weeks: The Engineering Playbook',
    excerpt:
      'How non-technical founders and fast-moving teams can scope, architect, and launch a production-grade software product in 42 days without cutting corners on security or UX.',
    category: 'Engineering',
    publishedAt: '2026-07-28',
    readTime: '8 min read',
    featured: false,
    published: true,
    tags: ['SaaS', 'MVP', 'Full-Stack', 'Next.js', 'Product Strategy'],
    author: defaultAuthor,
    metaDescription:
      'The step-by-step engineering roadmap for launching a custom SaaS MVP in 6 weeks. Learn how to ruthlessly prioritize features and select the right tech stack.',
    toc: [
      { id: 'why-most-mvps-fail', title: 'Why Most MVPs Take 9 Months (and Die)' },
      { id: 'the-6-week-milestone-breakdown', title: 'The 6-Week Milestone Breakdown' },
      { id: 'the-ruthless-scope-filter', title: 'The Ruthless Scope Filter' },
      { id: 'modern-stack-acceleration', title: 'Tech Stack That Ships at 10x Speed' },
      { id: 'launch-readiness-checklist', title: 'Production Launch Readiness Checklist' },
    ],
    sections: [
      {
        id: 'why-most-mvps-fail',
        heading: 'Why Most MVPs Take 9 Months (and Die Before Launch)',
        paragraphs: [
          'The number one killer of early-stage SaaS ideas is not lack of funding or bad marketing. It is **scope creep disguised as perfectionism**.',
          'Founders spend four months arguing over micro-interactions, building complex multi-tenant billing tiers before they have a single paying customer, and rewriting backend frameworks three times. By month seven, team momentum evaporates and the market window closes.',
        ],
        quote: {
          text: 'An MVP is not a half-baked product. An MVP is the simplest complete solution that delivers immediate, undeniable value to a real user.',
          author: 'Marvellous Adepoju',
          role: 'Founder, Marvel Develops',
        },
      },
      {
        id: 'the-6-week-milestone-breakdown',
        heading: 'The 6-Week Milestone Breakdown',
        paragraphs: [
          'When we build MVPs and client platforms at Marvel Develops, we execute in tightly sequenced two-week sprints:',
        ],
        bulletPoints: [
          'Week 1–2: **Data Architecture & Core Engine** — database schema modeling, authentication flows, and primary business logic APIs.',
          'Week 3–4: **High-Conversion UI & Primary User Journey** — the main workflow where users input data, trigger algorithms, and receive core value.',
          'Week 5: **Billing, Email Triggers & Polish** — Stripe/Paystack billing integration, automated confirmation emails, and error state handling.',
          'Week 6: **QA, Security Audits & Public Launch** — load testing, OpenGraph social cards, SEO metadata, analytics, and domain launch.',
        ],
      },
      {
        id: 'the-ruthless-scope-filter',
        heading: 'The Ruthless Scope Filter',
        paragraphs: [
          'To ship in 6 weeks, every single proposed feature must pass a binary question:',
          '*"If we launch without this feature, will the user fail to achieve their primary goal?"*',
          'If the answer is no, it belongs in Version 2.0 backlog.',
        ],
        callout: {
          title: 'What to Cut From Your MVP',
          text: 'Social logins with 5 different providers (start with 1-click Google + Email), complex customizable dashboards (build 1 clean default view), and custom reporting suites (deliver CSV export instead).',
          type: 'warning',
        },
      },
      {
        id: 'modern-stack-acceleration',
        heading: 'The Modern Tech Stack That Ships at 10x Speed',
        paragraphs: [
          'In 2026, building software from scratch does not mean writing boilerplate infrastructure. We rely on a battle-tested full-stack stack:',
        ],
        bulletPoints: [
          'Next.js 16 (React 19 + TypeScript): One unified codebase for front-end interface, server actions, and API endpoints.',
          'Tailwind CSS v4 + Radix UI primitives: Accessible, bespoke design system without heavy component library bloat.',
          'Supabase (Postgres): Instant auth, secure Row-Level Security, real-time events, and automatic database backups.',
          'Google Gemini 2.0 (`@google/genai`): Adding high-IQ AI features (smart summaries, project planners, data categorization) in hours instead of weeks.',
        ],
      },
      {
        id: 'launch-readiness-checklist',
        heading: 'Production Launch Readiness Checklist',
        paragraphs: [
          'Before pointing your DNS to production, ensure these 5 pillars are locked down:',
        ],
        bulletPoints: [
          '1. Automated transactional emails with reliable deliverability.',
          '2. End-to-end payment webhook verification with error fallbacks.',
          '3. Google Search Console & Schema.org JSON-LD indexing markup.',
          '4. Privacy policy, terms, and clean cookie consent compliance.',
          '5. OpenGraph preview banner generation for high-click social sharing on LinkedIn & X.',
        ],
      },
    ],
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAllPosts(): BlogPost[] {
  return blogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getFeaturedPost(): BlogPost | undefined {
  const published = getAllPosts()
  return published.find((p) => p.featured) || published[0]
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && post.published)
}

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPost[] {
  const current = getPostBySlug(currentSlug)
  if (!current) return []

  const others = getAllPosts().filter((p) => p.slug !== currentSlug)

  // Prioritize matching category or tags
  const matching = others.filter(
    (p) =>
      p.category === current.category ||
      p.tags.some((tag) => current.tags.includes(tag))
  )

  if (matching.length >= limit) {
    return matching.slice(0, limit)
  }

  // Backfill with other recent posts
  const remaining = others.filter((p) => !matching.includes(p))
  return [...matching, ...remaining].slice(0, limit)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.filter((p) => p.published).map((p) => p.category)))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.filter((p) => p.published).forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return Array.from(tags)
}
