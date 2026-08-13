'use client'

const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'n8n',
  'Make.com',
  'React Native',
  'Flutter',
  'PostgreSQL',
  'Tailwind CSS',
  'Python',
  'Figma',
]

export function TechMarquee() {
  // Duplicated once so the -50% translate loops seamlessly.
  const items = [...stack, ...stack]

  return (
    <section className="border-y border-border bg-white py-10">
      <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
        The tools your product deserves
      </p>

      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track gap-12 px-6">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-display text-xl font-semibold text-text-mid/70 transition-colors hover:text-royal-blue lg:text-2xl"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
