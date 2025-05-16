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
    <div className="bg-white p-6 rounded shadow-md flex flex-col justify-between min-h-[300px]">
      <div className="text-left space-y-3">
        <h3 className="text-xl font-bold">{title}</h3>
        <h4 className="text-lg">
          {authors} - <span className="font-semibold">{journal}</span>
        </h4>
        <h5 className="text-sm text-muted-foreground">{formattedDate}</h5>

        <div className="flex flex-col gap-2 mt-4">
          <a
            rel="noreferrer"
            target="_blank"
            href={paperLink || '#'}
            className="inline-block text-white bg-primary px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            See Paper
          </a>
          {scholarLink && (
            <a
              rel="noreferrer"
              target="_blank"
              href={scholarLink}
              className="text-blue-600 underline hover:text-blue-800 text-sm"
            >
              View on Google Scholar
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default PublicationCard
