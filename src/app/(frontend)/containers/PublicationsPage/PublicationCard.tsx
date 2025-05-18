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
    <div className="bg-card p-6 rounded shadow-sm flex flex-col justify-between min-h-[250px]">
      <div className="text-left space-y-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <h4 className="text-md">{authors}</h4>
        <h4>
          <span className="font-semibold">{journal}</span>
        </h4>
        <h5 className="text-sm text-muted-foreground">{formattedDate}</h5>

        <div className="flex flex-row gap-2 mt-4">
          <a
            rel="noreferrer"
            target="_blank"
            href={paperLink || '#'}
            className="relative inline-block px-4 py-1.5 border-current text-primary overflow-hidden group font-bold border-2"
          >
            <span className=" text-[clamp(0.8rem,2vw,1.25rem)] relative z-10 transition-colors duration-200 group-hover:text-white">
              See Paper
            </span>
            <span className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
          </a>
          {scholarLink && (
            <a
              rel="noreferrer"
              target="_blank"
              href={scholarLink}
              className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent my-auto text-sm"
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
