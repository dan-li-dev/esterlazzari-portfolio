import MediaCard from './MediaCard'
import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const Media = async () => {
  const payload = await getPayload({ config: configPromise })
  const countMediaToShow = 4

  const mediaQuery = await payload.find({
    collection: 'media-coverage',
    depth: 1,
    pagination: false,
    select: {
      title: true,
      publisher: true,
      link: true,
      image: true,
    },
  })

  const mediaItems = mediaQuery.docs
  // const mediaToShow = mediaItems.slice(0, countMediaToShow)
  const mediaToShow = mediaItems
  console.log(mediaToShow)

  return (
    <>
      {mediaToShow && (
        <section
          id="media"
          className="sm:scroll-mt-16 scroll-mt-8 bg-background text-foreground pb-[1%]"
        >
          <div className="container mx-auto px-6 py-1 lg:py-16 lg:px-24">
            <h2 className="text-4xl font-bold mb-12 text-foreground text-center">Media Coverage</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              {mediaToShow.map((item, i) => (
                <MediaCard key={i} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Media Coverage Section`,
  }
}

export default Media
