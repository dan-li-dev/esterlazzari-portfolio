export const dynamic = 'force-dynamic'

import Hero from '@/app/(frontend)/containers/HeroPage'
import About from '@/app/(frontend)/containers/AboutPage'
import Publications from '@/app/(frontend)/containers/PublicationsPage'
import Projects from '@/app/(frontend)/containers/ProjectsPage'
import Conferences from '@/app/(frontend)/containers/ConferencesPage'
import Media from '@/app/(frontend)/containers/MediaPage'
import { Animations } from './scroll-effect'
import GA from '@/app/(frontend)/components/GoogleAnalytics'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'

const SECTION_COMPONENTS = {
  publications: Publications,
  media: Media,
  projects: Projects,
} as const

type SectionKey = keyof typeof SECTION_COMPONENTS

export default async function HomePage() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const sections: { section: SectionKey; visible: boolean }[] = siteSettings?.sections?.length
    ? (siteSettings.sections as { section: SectionKey; visible: boolean }[])
    : [
        { section: 'publications', visible: true },
        { section: 'media', visible: true },
        { section: 'projects', visible: true },
      ]

  return (
    <>
      <Hero />
      <About />
      {sections.map(({ section, visible }) => {
        if (!visible) return null
        const Component = SECTION_COMPONENTS[section]
        return <Component key={section} />
      })}
      <Conferences />
      <GA />
      <Animations />
    </>
  )
}
