interface SectionHeaderProps {
  /** Optional — kept for backwards compatibility; no longer rendered. */
  number?: string
  label: string
  headline: string | React.ReactNode
  subtext?: string
  centered?: boolean
  dark?: boolean
}

export function SectionHeader({
  label,
  headline,
  subtext,
  centered = false,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 lg:mb-14 ${centered ? 'text-center' : ''}`}>
      <p className={`mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold ${
        centered ? 'justify-center' : ''
      }`}>
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        {label}
      </p>
      <h2 className={`font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.1] tracking-tight ${
        dark ? 'text-text-white' : 'text-text-dark'
      }`}>
        {headline}
      </h2>
      {subtext && (
        <p className={`mt-4 max-w-lg text-lg leading-relaxed ${
          centered ? 'mx-auto' : ''
        } ${dark ? 'text-text-white-muted' : 'text-text-mid'}`}>
          {subtext}
        </p>
      )}
    </div>
  )
}
