import PublicationCard from './PublicationCard'
import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PageRange } from '@/components/PageRange'

const Publications = async () => {
  const payload = await getPayload({ config: configPromise })

  const publicationsQuery = await payload.find({
    collection: 'publications',
    depth: 1,
    limit: 12,
    overrideAccess: false,
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

  return (
    <section id="research" className="bg-white text-primary">
      <div className=" mb-[15rem] md:mb-0 lg:px-24">
        <h2 className="text-4xl font-bold mb-12 text-primary text-center">Recent Publications</h2>

        <PageRange collection="publications" totalDocs={publicationsQuery.totalDocs} />

        {/* Map your <PublicationCard /> components here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, i) => (
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
