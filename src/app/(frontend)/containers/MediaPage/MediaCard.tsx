import Image from 'next/image'
import type { Media } from '@/payload-types'

const MediaCard = ({
  publisher,
  image,
  title,
  link,
}: {
  publisher: string
  image: number | string | Media | undefined | null
  title: string
  link: string
}) => {
  const resolvedImage =
    typeof image !== 'string' && typeof image !== 'number' && image?.url ? image : null

  return (
    <a
      href={link || '#'}
      rel="noreferrer"
      target="_blank"
      className="group relative bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
    >
      {/* Left accent bar */}
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-sm scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center z-10" />

      {/* Image area — fixed height for consistent card sizing */}
      <div className="relative w-full h-40 flex-shrink-0 bg-secondary">
        {resolvedImage && (
          <Image src={resolvedImage.url!} alt={title} fill className="object-cover" />
        )}
      </div>

      {/* Content */}
      <div className="flex gap-4 items-start p-6 flex-1">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
            {publisher}
          </p>
          <h3 className="text-lg leading-snug">{title}</h3>
        </div>

        {/* Arrow circle */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center transition-all duration-200 group-hover:bg-primary">
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
        </div>
      </div>
    </a>
  )
}

export default MediaCard
