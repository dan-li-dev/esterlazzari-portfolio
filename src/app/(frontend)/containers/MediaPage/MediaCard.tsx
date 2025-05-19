import { Media } from '@/payload-types'

const MediaCard = ({
  publisher,
  image,
  title,
  link,
}: {
  publisher: string
  image: string | Media | undefined | null
  title: string
  link: string
}) => {
  return (
    <div className="bg-card p-6 rounded shadow-sm flex flex-col justify-between min-h-[250px]">
      <div className="text-left space-y-3">
        {/* Image */}

        {typeof image !== 'string' && image?.url && (
          <img src={image.url} alt={title} className="w-full h-80 object-cover rounded" />
        )}

        {/* Title */}
        <h3 className="text-lg font-bold">
          <a
            className="text-foreground hover:text-primary cursor-pointer transition"
            rel="noreferrer"
            target="_blank"
            href={link || '#'}
          >
            {title}
          </a>
        </h3>

        {/* Publisher */}
        <h5 className="text-sm text-muted-foreground">
          Published by <span className="font-semibold">{publisher}</span>
        </h5>
      </div>
    </div>
  )
}

export default MediaCard
