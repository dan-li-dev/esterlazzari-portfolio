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
  const formattedDate = date ? formatDateToMonthYear(date) : 'Unknown Date'

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground">{authors}</p>
        <p className="text-sm">
          <span className="font-medium">{journal}</span>
        </p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <a
          rel="noreferrer"
          target="_blank"
          href={paperLink || '#'}
          className="relative inline-block px-4 py-1.5 font-semibold text-primary border-2 border-current group overflow-hidden"
        >
          <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
            See Paper
          </span>
          <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0" />
        </a>

        {scholarLink && (
          <a
            rel="noreferrer"
            target="_blank"
            href={scholarLink}
            className="text-sm text-primary hover:underline transition"
          >
            View on Google Scholar
          </a>
        )}
      </div>
    </div>
  )
}

export default PublicationCard
