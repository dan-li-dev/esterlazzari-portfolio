const MediaCard = ({
  publisher,
  image,
  title,
  articleLink,
}: {
  publisher: string
  image: string
  title: string
  articleLink: string
}) => {
  return (
    <div className="bg-card p-6 rounded shadow-sm flex flex-col justify-between min-h-[250px]">
      <div className="text-left space-y-3">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-40 object-cover rounded" />

        {/* Title */}
        <h3 className="text-lg font-bold">{title}</h3>

        {/* Publisher */}
        <h5 className="text-sm text-muted-foreground">
          Published by <span className="font-semibold">{publisher}</span>
        </h5>

        {/* Link Button */}
        <div className="mt-4">
          <a
            rel="noreferrer"
            target="_blank"
            href={articleLink || '#'}
            className="relative inline-block px-4 py-1.5 border-current text-primary overflow-hidden group font-bold border-2"
          >
            <span className="text-[clamp(0.8rem,2vw,1.25rem)] relative z-10 transition-colors duration-200 group-hover:text-white">
              Read Article
            </span>
            <span className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-200 ease-in-out z-0"></span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MediaCard
