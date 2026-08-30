import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Marvel Develops',
  description: 'Privacy policy for Marvel Develops',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
            Legal
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold text-text-dark lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mb-12 font-sans text-lg text-text-mid">
            Last updated: June 2026
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                Who We Are
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                Marvel Develops is a software agency based in Ede, Osun State, Nigeria.
                We design and build custom software — web, mobile, and SaaS — for businesses.
              </p>
              <p className="mt-4 font-sans leading-relaxed text-text-mid">
                <strong className="text-text-dark">Contact:</strong> marveldevelops@gmail.com
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                What Data We Collect
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                When you submit our contact form, we collect:
              </p>
              <ul className="mt-4 space-y-2 font-sans text-text-mid">
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Your full name
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Business name
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Email address
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  WhatsApp/phone number
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Industry and service requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Project description
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                How We Use Your Data
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                We use the information you provide solely to:
              </p>
              <ul className="mt-4 space-y-2 font-sans text-text-mid">
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Respond to your inquiry
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Understand your project requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Provide you with a proposal if requested
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Communicate about potential projects
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                Data Sharing
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                <strong className="text-text-dark">We do not sell your data to third parties.</strong> Your information 
                is only used internally to respond to your inquiry and provide our services.
              </p>
              <p className="mt-4 font-sans leading-relaxed text-text-mid">
                We may use third-party services (like email providers) to communicate with you, 
                but your data is never shared for marketing purposes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                AI Assistant
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                Our website includes an AI assistant, powered by Google Gemini.
                Conversations with the assistant are not stored permanently and are only used to provide
                helpful responses during your session.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                Your Rights
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                You have the right to:
              </p>
              <ul className="mt-4 space-y-2 font-sans text-text-mid">
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Request access to your personal data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Request correction of inaccurate data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Request deletion of your data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Withdraw consent at any time
                </li>
              </ul>
              <p className="mt-4 font-sans leading-relaxed text-text-mid">
                To exercise these rights, contact us at{' '}
                <a href="mailto:marveldevelops@gmail.com" className="text-royal-blue hover:underline">
                  marveldevelops@gmail.com
                </a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                Governing Law
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                This privacy policy is governed under the laws of the Federal Republic of Nigeria.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text-dark">
                Contact Us
              </h2>
              <p className="font-sans leading-relaxed text-text-mid">
                If you have any questions about this privacy policy, please contact us:
              </p>
              <ul className="mt-4 space-y-2 font-sans text-text-mid">
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Email: marveldevelops@gmail.com
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  Phone: +234 903 089 1731
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">&#9670;</span>
                  WhatsApp: +234 903 089 1731
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal-blue transition-colors hover:text-royal-blue-dark"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
