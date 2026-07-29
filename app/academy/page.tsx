import { AcademyHero } from '@/components/academy/AcademyHero'
import { AcademyWhy } from '@/components/academy/AcademyWhy'
import { AcademyFormatAndSupport } from '@/components/academy/AcademyFormatAndSupport'
import { AcademyCurriculum } from '@/components/academy/AcademyCurriculum'
import { AcademyProjects } from '@/components/academy/AcademyProjects'
import { AcademyTestimonials } from '@/components/academy/AcademyTestimonials'
import { AcademyInstructor } from '@/components/academy/AcademyInstructor'
import { AcademyPricing } from '@/components/academy/AcademyPricing'
import { AcademyFAQ } from '@/components/academy/AcademyFAQ'
import { AcademyRegisterForm } from '@/components/academy/AcademyRegisterForm'
import { AcademyFinalCTA } from '@/components/academy/AcademyFinalCTA'
import { MobileStickyCTA } from '@/components/academy/MobileStickyCTA'

/**
 * /academy — Marvel Develops Academy landing page.
 *
 * Section order (per spec):
 *  1. Hero
 *  2. Why This Training
 *  3. Full Curriculum
 *  4. Real Projects (from lib/portfolio.ts)
 *  5. Testimonials          ← TODO: replace placeholder quotes with real content
 *  6. About the Instructor  ← TODO: refine bio copy
 *  7. Pricing & Payment Plan
 *  8. FAQ
 *  9. Registration Form
 * 10. Final CTA
 */
export default function AcademyPage() {
  return (
    <>
      {/* 1 — Hero */}
      <AcademyHero />

      {/* 2 — Why This Training */}
      <AcademyWhy />

      {/* 3 — Format & Support */}
      <AcademyFormatAndSupport />

      {/* 4 — Full 8-Week Curriculum */}
      <AcademyCurriculum />

      {/* 4 — Real Projects Built By Marvel Develops */}
      <AcademyProjects />

      {/* 5 — Testimonials (TODO: replace PLACEHOLDER content) */}
      {/* <AcademyTestimonials /> */}

      {/* 6 — About the Instructor (TODO: refine bio copy) */}
      <AcademyInstructor />

      {/* 7 — Pricing & Payment Plan */}
      <AcademyPricing />

      {/* 8 — FAQ */}
      <AcademyFAQ />

      {/* 9 — Registration Form (lead capture only — no payment) */}
      <AcademyRegisterForm />

      {/* 10 — Final CTA */}
      <AcademyFinalCTA />

      <MobileStickyCTA />
    </>
  )
}
