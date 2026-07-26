// ============================================================================
// PORTFOLIO DATA — powers the /work grid and /work/[slug] case-study pages.
//
// Fields:
//   summary   → short teaser on home-page "Selected Work" cards
//   overview  → longer description on /work page cards
//   problem   → "The challenge" section on the case-study page
//   solution  → "What we built" section on the case-study page
//   highlights→ bulleted "Key things we delivered" on the case-study page
//   image     → path under /public (drop screenshots into /public/work/)
// ============================================================================

export interface Project {
  slug: string
  title: string
  category: string
  client: string
  year: string
  /** Short teaser used on the home-page cards. */
  summary: string
  /** Longer description shown on the /work page cards. */
  overview: string
  /** Case-study body. */
  problem: string
  solution: string
  /** Key things delivered — bulleted on the case-study page. */
  highlights: string[]
  stack: string[]
  /** Path under /public (drop screenshots into /public/work/). */
  image: string
  liveUrl?: string
  featured?: boolean
  /** Set to false to hide from the site without deleting the entry. */
  published?: boolean
}

export const projects: Project[] = [
  {
    slug: 'fraogo-operations-platform',
    title: 'Fraogo — Operations Platform',
    category: 'Management System',
    client: 'Fraogo',
    year: '2025–2026',
    summary:
      'A full-stack business platform — customer portal, vendor marketplace, self-serve order tracking, and an 11-area admin suite — built for a multi-service logistics and procurement company.',
    overview:
      'Fraogo runs logistics, procurement, and vendor services across Nigeria and internationally. We built the entire platform from scratch: six customer-facing service forms, a vendor marketplace where customers browse and hire vetted vendors directly, a self-serve tracking page so customers never have to call for a status update, and a full admin panel covering 11 operational areas — from live order management and vendor application review to an invoice generator that builds, saves, and emails branded PDFs directly to clients.',
    problem:
      'Fraogo operates across multiple service lines — Nigeria procurement, international procurement, delivery, relocation logistics, bulk supply, and a vendor hire marketplace — all managed manually. Staff were handling every customer status enquiry by phone. Invoices were built by hand. Vendor applications had no formal review process, and there was no single view of the whole business. As order volume grew, the gaps became impossible to ignore.',
    solution:
      'We designed and built a complete business platform. On the customer side: six submission forms covering every service line, a vendor marketplace where customers can browse, filter, and hire vetted vendors directly, and a self-serve tracking page that shows a live order status timeline — eliminating status calls to staff entirely.\n\nInside the business: a full admin panel with 11 management areas — procurement orders (Nigeria + international), logistics (delivery + relocation), bulk supply, vendor applications (with NIN document review), vendor hire requests, contact messages, a blog CMS with private contributor links for external writers, an invoice generator that builds, saves, prints, and emails branded PDFs with attachments, manual email compose for any customer from any order card, and in-panel admin password management.\n\nEight automated email triggers handle every stage of the customer and vendor journey — from order submission confirmations to vendor approval emails with a private dashboard magic link — with zero manual sending required.',
    highlights: [
      'Six customer-facing service forms — from local delivery to international procurement',
      'Vendor marketplace: NIN document review, public profiles, and direct hire by customers',
      'Self-serve order tracking page — customers follow live status timelines without calling staff',
      'Invoice generator: build, save, download as PDF, print, and email branded PDF to client',
      'Admin panel covering 11 operational areas: orders, logistics, vendors, blog, invoices, and more',
      'Eight automated email triggers — every customer and vendor touchpoint handled without manual effort',
      'Blog CMS with private contributor links so external writers can publish without admin access',
      'Manual email compose with optional image attachments, sent directly from any order card',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'Supabase', 'Resend', 'Vercel'],
    image: '/work/fraogo.png',
    liveUrl: 'https://fraogo.com',
    featured: true,
  },
  {
    slug: 'brandsor-brand-identity-platform',
    title: 'Brandsor — Brand Identity Platform',
    category: 'Web App',
    client: 'Founder / Builder',
    year: '2026',
    summary:
      'An AI-assisted platform for building and sharing a complete brand identity — name, logo, palette, typography, guidelines, and a shareable public profile — all in one place.',
    overview:
      'Brandsor is my own startup, built for indie founders and freelance designers who create brand identities repeatedly. The core idea: building a brand is slow and scattered across a dozen disconnected tools with nothing polished to show at the end. Brandsor keeps the whole identity in one workspace — AI-generated names and starter kits, a full brand editor, versioned snapshots as the brand evolves, and a public profile page with its own link. Live at brandsor.xyz, currently in active testing with a small group of early testers.',
    problem:
      'Building a cohesive brand identity is slow, expensive, and scattered. A name generator here, a color picker there, fonts in one tab, guidelines in a doc, screenshots in a folder — with no single source of truth, no history of what changed, and nothing polished to share with a client or investor. Agencies cost thousands. Doing it yourself is a mess of tabs with nothing to show at the end.',
    solution:
      'I built a complete brand workspace. When you create a brand, an AI starter kit (powered by Google Gemini) drafts a first-cut color palette, font pairing, tagline options, and brand-voice guidelines instantly. From there, the workspace gives you a logo uploader, a color palette picker, curated Google Font pairings, tagline and alternate-name lists, and a rich-text guidelines editor. You can save immutable version snapshots as the brand evolves, and publish it as a public profile page with its own link and an auto-generated social preview image — ready to send to a client or post anywhere. Row-level security enforces a public/private toggle on every workspace, and export delivers a PNG brand card and a JSON data file.',
    highlights: [
      'AI brand-name generator with taglines — results in seconds via Google Gemini',
      'AI "Brand Starter": drafts a first-cut palette, font pairing, tagline options, and brand-voice guidelines on brand creation',
      'Full brand workspace: logo upload, color palette picker, Google Font pairings, tagline lists, and rich-text guidelines editor (TipTap)',
      'Version snapshots — immutable saved copies of a brand\'s state over time',
      'Public brand profile pages with unique links and auto-generated social preview (OG) images',
      'Export: PNG brand card and full JSON brand data',
      'Row-level security throughout — public/private toggle enforced per workspace',
      'Google sign-in, installable PWA, and an anonymous "try the generator" demo for visitors',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Google Gemini', 'TipTap', 'Vercel'],
    image: '/work/brandsor.png',
    liveUrl: 'https://brandsor.xyz',
    featured: true,
  },
  {
    slug: 'rael-real-estate-tech',
    title: 'RAEL — Real Estate Tech Platform',
    category: 'Website or Web App',
    client: 'RAEL',
    year: '2026',
    summary:
      'A showcase website and integrated AI assistant for a real estate technology company — designed and built to establish their brand and answer visitor questions in real time.',
    overview:
      'RAEL is a real estate tech company that provides software solutions for businesses in the property space. We handled the full product: UI/UX design, a professional showcase website, and an integrated AI assistant that handles visitor questions and FAQs in real time — so the team spends less time answering the same questions and more time on serious leads.',
    problem:
      'RAEL needed a professional web presence that matched the credibility of the software they sell. They also needed a way to handle incoming visitor questions at scale — the kind of FAQs that would otherwise eat up the team\'s time.',
    solution:
      'We designed the UI/UX from scratch, then built a fast, professional showcase website that clearly communicates what RAEL does and who it\'s for. We integrated an AI assistant trained on the company\'s information — it handles common questions and FAQs in real time, qualifying visitors before they ever reach the team.',
    highlights: [
      'Full UI/UX design — built the visual identity and layout from scratch',
      'Professional showcase website clearly communicating the company\'s offer',
      'Integrated AI assistant handling FAQs and visitor questions in real time',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/work/rael.png',
    featured: true,
    published: false,
  },
  {
    slug: 'harvester-church-website',
    title: 'The Harvester — RCCG Church Website',
    category: 'Website or Web App',
    client: 'The Harvester RCCG',
    year: '2025',
    summary:
      'A clean, well-designed website for a RCCG church — built to showcase their community and give visitors everything they need in one place.',
    overview:
      'The Harvester is an RCCG church in Nigeria that needed a website as welcoming and well-presented as their community. We designed and built a clean, visually distinctive site that works as the church\'s digital home — giving visitors a clear picture of who they are and how to get involved.',
    problem:
      'The Harvester church had no dedicated digital footprint. Visitors looking for service times, location, or information about the community had nowhere to go online — everything relied on word of mouth and social media posts that easily got buried. They needed a custom web platform that could clearly communicate their mission and serve as a welcoming digital home for new visitors.',
    solution:
      'We developed a lightning-fast custom website using a modern frontend architecture built on Native HTML5, CSS3, and JavaScript. We designed a highly responsive, mobile-first interface that drastically improved their online visibility and local SEO. This digital home makes it effortless for visitors to find service times and contact the administration, establishing a highly professional and reliable web presence for the church community.',
    highlights: [
      'Clean, distinctive design that reflects the character of the community',
      'Fast, mobile-first build — works perfectly on any device',
      'Clear layout for service times, location, and contact information',
      'Custom frontend architecture for lightning-fast load times',
    ],
    stack: ['Native HTML5', 'Vanilla CSS3', 'JavaScript'],
    image: '/work/harvester.png',
    liveUrl: 'https://theharvesterministry.com',
    featured: true,
  },
]

export const publishedProjects = projects.filter((p) => p.published !== false)
export const featuredProjects = publishedProjects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
