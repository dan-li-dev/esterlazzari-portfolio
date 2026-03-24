import type { Metadata } from 'next/types'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import PublicationsList from './PublicationsList'

const Publications = async () => {
  const payload = await getPayloadClient()

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const perPage = siteSettings?.publicationsPerPage ?? 10

  const publicationsQuery = await payload.find({
    collection: 'publications',
    depth: 1,
    limit: 0,
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

  return (
    <section id="research" className="scroll-mt-16 bg-background text-foreground py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-24">
        <h2 className="text-4xl text-center mb-8">Publications</h2>
        <PublicationsList publications={publicationsQuery.docs} perPage={perPage} />
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
