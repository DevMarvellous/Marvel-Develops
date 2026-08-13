'use client'

import { PageLoader } from '@/components/PageLoader'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { Services } from '@/components/sections/Services'
import { WorkTeaser } from '@/components/sections/WorkTeaser'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Stats } from '@/components/sections/Stats'
import { FAQ } from '@/components/sections/FAQ'
import { CTABand } from '@/components/sections/CTABand'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'
import { AssistantChat } from '@/components/chatbot/AssistantChat'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'

export default function Home() {
  return (
    <PageLoader>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <WorkTeaser />
        <WhyUs />
        <Process />
        <Stats />
        <FAQ />
        <CTABand />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <AssistantChat />
    </PageLoader>
  )
}
