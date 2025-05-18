import PublicationCard from './PublicationCard'
import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PageRange } from '@/app/(frontend)/components/PageRange'

const Publications = async () => {
  const payload = await getPayload({ config: configPromise })
  const countPublicationsToShow = 4

  const publicationsQuery = await payload.find({
    collection: 'publications',
    depth: 1,
    pagination: false,
    select: {
      title: true,
      authors: true,
      journal: true,
      date: true,
      paperLink: true,
      scholarLink: true,
    },
  })

  const publications = publicationsQuery.docs

  const publicationsToShow = publications.slice(0, countPublicationsToShow)

  return (
    <section id="research" className="scroll-mt-8 bg-background text-foreground pb-5 lg:pb-[1%]">
      <div className="container mx-auto px-6 py-1 lg:py-16 lg:px-24">
        <h2 className="text-4xl font-bold mb-12 text-foreground text-center">
          Recent Publications
        </h2>

        {/* <PageRange collection="publications" totalDocs={publicationsQuery.totalDocs} /> */}
        <div className="font-semibold">
          Showing the latest {publicationsToShow.length} publications of{' '}
          {publicationsQuery.totalDocs}.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          {publicationsToShow.map((pub, i) => (
            <PublicationCard key={i} {...pub} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Recent Publications Section`,
  }
}

export default Publications
