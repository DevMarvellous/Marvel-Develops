// ============================================================================
// PLACEHOLDER PORTFOLIO DATA — replace with real Outends projects.
// Each project powers the /work grid and its /work/[slug] case-study page.
//
// Where each field shows up:
//   summary   → short line on the home page "Selected Work" cards
//   overview  → longer paragraph on the /work page cards (more detail than home)
//   problem   → "The challenge" section on the case-study page
//   solution  → "What we built" section on the case-study page
//   highlights→ bulleted "Key things we delivered" list on the case-study page
// Swap `image` for a real screenshot in /public.
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
  /** Path under /public (placeholder for now). */
  image: string
  liveUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'fleetpay-payments-dashboard',
    title: 'FleetPay — Payments Dashboard',
    category: 'Dashboard & Reporting',
    client: 'Sample Fintech Client',
    year: '2026',
    summary:
      'A live payments dashboard that gave a finance team a single, clear view of transactions, payouts, and disputes.',
    overview:
      'FleetPay is a payments dashboard built for a finance team that needed to see everything in one place. Instead of switching between three tools and spreadsheets, the whole team now works from a single screen that updates in real time — from a quick health check in the morning to digging into a specific transaction or dispute.',
    problem:
      'The client was running their payments across three separate tools plus a pile of spreadsheets. Nobody had a live picture of money coming in and going out, so the finance team spent the first hour of every day stitching reports together by hand. Worse, payment disputes could sit unnoticed for days, which meant lost money and unhappy customers. As the business grew, this way of working simply could not keep up.',
    solution:
      'We designed and built one clear dashboard that pulls every payment into a single, live view. The team can see transactions as they happen, filter and search in seconds, and get reports generated automatically instead of by hand. We added a simple workflow for handling disputes so nothing slips through the cracks, and gave each staff member the right level of access for their role. The result is a tool the whole finance team actually enjoys using — and trusts.',
    highlights: [
      'Live transaction feed that updates in real time',
      'Automatic daily and monthly reports — no more manual spreadsheets',
      'A simple step-by-step way to track and resolve disputes',
      'Secure logins with different access levels for each staff role',
      'Clear charts so anyone can understand performance at a glance',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    image: '/placeholder.jpg',
    featured: true,
  },
  {
    slug: 'medtrack-clinic-app',
    title: 'MedTrack — Clinic Mobile App',
    category: 'Mobile App',
    client: 'Sample Healthcare Client',
    year: '2025',
    summary:
      'A mobile app that let a clinic network manage appointments, records, and reminders from one place.',
    overview:
      'MedTrack is a mobile app for a clinic network that was still running on phone calls and paper files. Patients can now book and manage appointments from their phones, staff can pull up records instantly, and reminders go out on their own — all from one app that works on both Android and iPhone.',
    problem:
      'Every appointment at the clinic was booked over the phone, and patient records lived in paper folders. This made busy days chaotic: staff were tied up on calls, files went missing, and patients often forgot appointments because reminders had to be sent by hand. The clinic wanted to modernise without making things complicated for older patients or non-technical staff.',
    solution:
      'We built a clean, easy-to-use app for Android and iPhone where patients can book, reschedule, and cancel appointments in under a minute. Records moved from paper into a secure digital system that staff can search instantly, and appointment reminders now send automatically — cutting down on no-shows and freeing staff from the phones. A simple admin area lets the team manage everything without any technical know-how.',
    highlights: [
      'Online booking that takes patients under a minute',
      'Secure digital patient records, searchable in seconds',
      'Automatic appointment reminders to reduce no-shows',
      'Works on both Android and iPhone from a single app',
      'A plain, simple admin area for non-technical staff',
    ],
    stack: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL'],
    image: '/placeholder.jpg',
    featured: true,
  },
  {
    slug: 'shopflow-inventory-system',
    title: 'ShopFlow — Inventory Management System',
    category: 'Management System',
    client: 'Sample Retail Client',
    year: '2025',
    summary:
      'A management system that helps a retail business track inventory, suppliers, and orders across all its locations.',
    overview:
      'ShopFlow is a custom management system for a retailer that had outgrown spreadsheets. It keeps stock, suppliers, and orders in sync across every store, warns staff before things run out, and gives the owner one clear view of the whole business — built to keep working smoothly as they open more locations.',
    problem:
      'The retailer started with spreadsheets, then tried a few off-the-shelf tools, but none of them fit the way their stores actually run. Stock counts were always slightly wrong, popular items kept running out, and the owner had no single view across locations. Every new store made the mess bigger, and the team was wasting hours each week just trying to keep numbers straight.',
    solution:
      'We built a management system designed around exactly how their business works. Each store has its own live inventory, suppliers and orders are tracked in one place, and the system warns staff before stock runs low. The owner gets clear reports across every location, and because we built it custom, it can grow with the business — adding a new store is now a few clicks, not a new spreadsheet.',
    highlights: [
      'Live inventory tracked separately for every location',
      'Supplier and purchase-order management in one place',
      'Low-stock alerts so popular items never run out',
      'Clear reports across all stores for the owner',
      'Built to scale — adding a new store takes minutes',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    image: '/placeholder.jpg',
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
