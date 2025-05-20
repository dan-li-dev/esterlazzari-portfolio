import PublicationCard from './PublicationCard'
import type { Metadata } from 'next/types'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'

const Publications = async () => {
  const payload = await getPayloadClient()
  const countPublicationsToShow = 4

  const publicationsQuery = await payload.find({
    collection: 'publications',
    depth: 1,
    pagination: false,
    sort: '-date',
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

  // const publicationsToShow = publications.slice(0, countPublicationsToShow)
  const publicationsToShow = publications

  return (
    <section id="research" className="scroll-mt-16 bg-background text-foreground py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-8">Publications</h2>

        <p className="text-center text-sm text-muted-foreground font-medium mb-10">
          Displaying {publicationsToShow.length} of {publicationsQuery.totalDocs} publications
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
