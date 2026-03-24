type PublicationCardProps = {
  title: string
  authors: string
  journal?: string | null
  date?: string | null
  paperLink?: string | null
  scholarLink?: string | null
}

export const formatDateToMonthYear = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

const PublicationCard = ({
  title,
  authors,
  journal,
  date,
  paperLink,
  scholarLink,
}: PublicationCardProps) => {
  const formattedDate = date ? formatDateToMonthYear(date) : null

  return (
    <div className="group relative bg-card border border-border rounded-xl p-7 flex gap-5 items-start overflow-hidden transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]">
      {/* Left accent bar */}
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-sm scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />

      <div className="flex-1 min-w-0">
        {/* Meta: journal · date */}
        {(journal || formattedDate) && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {journal && (
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {journal}
              </span>
            )}
            {journal && formattedDate && (
              <span className="text-muted-foreground/40 text-xs select-none">·</span>
            )}
            {formattedDate && (
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg leading-snug mb-2">{title}</h3>

        {/* Authors */}
        <p className="text-sm text-muted-foreground font-light leading-relaxed">{authors}</p>

        {/* Secondary link */}
        {scholarLink && (
          <a
            rel="noreferrer"
            target="_blank"
            href={scholarLink}
            className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Google Scholar
          </a>
        )}
      </div>

      {/* Arrow circle — links to paper */}
      {paperLink && (
        <a
          rel="noreferrer"
          target="_blank"
          href={paperLink}
          aria-label="Open paper"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center transition-all duration-200 group-hover:bg-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors duration-200"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
      )}
    </div>
  )
}

export default PublicationCard
