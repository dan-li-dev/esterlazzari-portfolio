type TeachingCardProps = {
  courseName: string
  institution?: string | null
  role: string
  startDate?: string | null
  endDate?: string | null
  description?: string | null
  skills?: { id: number | string; name: string }[] | null
  courseLink?: string | null
}

const ROLE_LABELS: Record<string, string> = {
  instructor: 'Instructor',
  'co-instructor': 'Co-Instructor',
  ta: 'Teaching Assistant',
  'guest-lecturer': 'Guest Lecturer',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const TeachingCard = ({
  courseName,
  institution,
  role,
  startDate,
  endDate,
  description,
  skills,
  courseLink,
}: TeachingCardProps) => {
  const dateRange = startDate
    ? endDate
      ? `${formatDate(startDate)} – ${formatDate(endDate)}`
      : formatDate(startDate)
    : null

  return (
    <div className="bg-card border border-border rounded-xl p-7">
      <div className="space-y-3">
        {/* Role badge */}
        <span className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
          {ROLE_LABELS[role] || role}
        </span>

        {/* Course name */}
        <h3 className="text-xl leading-snug">{courseName}</h3>

        {/* Institution & dates */}
        {(institution || dateRange) && (
          <p className="text-sm text-muted-foreground">
            {institution}
            {institution && dateRange && ' · '}
            {dateRange}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground font-light leading-relaxed">{description}</p>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map(({ id, name }) => (
              <span
                key={id}
                className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Course link */}
        {courseLink && (
          <a
            href={courseLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Course page
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-3.5 h-3.5"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default TeachingCard
