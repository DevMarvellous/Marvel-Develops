'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BadgeCheck, Download } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const phases = [
  {
    id: 'weeks-1-2',
    label: 'Weeks 1–2',
    title: 'Web Foundations',
    topics: [
      'HTML, CSS, JavaScript fundamentals',
      'Git & GitHub basics',
      'Terminal / command line basics',
      'Deploying a static site to Vercel with a custom domain',
    ],
    outcome: 'Build and deploy your first live website.',
  },
  {
    id: 'weeks-3-4',
    label: 'Weeks 3–4',
    title: 'Full-Stack Development',
    topics: [
      'JavaScript deep dive: DOM, fetch/APIs',
      'Node.js basics',
      'One backend framework (Express)',
      'One database, CRUD operations',
      'Deploying a full-stack app',
    ],
    outcome: 'Build and deploy your first working app with a backend.',
  },
  {
    id: 'weeks-5-7',
    label: 'Weeks 5–7',
    title: 'AI-Powered Development',
    topics: [
      'AI models & APIs overview',
      'Prompt engineering fundamentals',
      'Claude Code hands-on (setup, workflows, real usage)',
      'Automating tasks with Claude Code',
      'Claude Skills & MCP (Model Context Protocol) — conceptual + light hands-on',
      'Capstone project build (spans into week 7)',
    ],
    outcome: 'Ship a real project using AI-assisted development tools.',
  },
  {
    id: 'week-8',
    label: 'Week 8',
    title: 'Portfolio & Launch',
    topics: [
      'Finish and deploy capstone project',
      'Build a personal portfolio site',
      'Resume / LinkedIn / GitHub presence',
      'Storytelling: how to talk about your work to employers/clients',
    ],
    outcome: 'Leave with a live portfolio and a project you can show anyone.',
  },
]

export function AcademyCurriculum() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      id="curriculum"
      className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionHeader
            label="Full Curriculum"
            headline={<>8 weeks.<br />Everything you need.</>}
            subtext="The complete programme — not a highlights reel. Every topic is there because you will use it."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          <Tabs defaultValue="weeks-1-2" className="w-full">
            {/* Tab triggers — scroll horizontally on mobile */}
            <div className="mb-8 overflow-x-auto">
              <TabsList className="inline-flex h-auto w-auto gap-2 rounded-2xl border border-border bg-gray-white p-2">
                {phases.map((phase) => (
                  <TabsTrigger
                    key={phase.id}
                    value={phase.id}
                    className="whitespace-nowrap rounded-xl px-4 py-2.5 font-sans text-[13px] font-semibold text-text-mid transition-all data-[state=active]:bg-royal-blue data-[state=active]:text-white data-[state=active]:shadow-md"
                  >
                    {phase.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab content */}
            {phases.map((phase) => (
              <TabsContent key={phase.id} value={phase.id}>
                <div className="rounded-[20px] border border-border bg-gray-white p-5 lg:p-10">
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                    {phase.label}
                  </p>
                  <h3 className="mb-6 font-display text-[clamp(22px,3vw,30px)] font-bold text-text-dark">
                    {phase.title}
                  </h3>

                  <ul className="mb-8 space-y-3">
                    {phase.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-blue" />
                        <span className="font-sans text-[15px] leading-snug text-text-mid">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Outcome callout */}
                  <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/10 p-4">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-gold">
                        Phase Outcome
                      </p>
                      <p className="mt-0.5 font-sans text-[15px] font-medium text-text-dark">
                        {phase.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Certificate note */}
          <p className="mt-8 flex items-center gap-2 font-sans text-[15px] text-text-mid">
            <BadgeCheck className="h-5 w-5 shrink-0 text-royal-blue" />
            Includes a certificate of completion at the end of the programme.
          </p>

          {/* Download curriculum PDF */}
          {/* TODO: Replace /academy/curriculum.pdf with the real curriculum PDF when ready */}
          <div className="mt-8">
            <a
              href="/academy/curriculum.pdf"
              download
              id="academy-curriculum-download"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 font-sans text-[15px] font-semibold text-text-dark shadow-[var(--shadow-card)] transition-all duration-250 hover:-translate-y-0.5 hover:border-royal-blue hover:text-royal-blue hover:shadow-[var(--shadow-hover)]"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Download Full Curriculum (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
