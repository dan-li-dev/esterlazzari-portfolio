import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import Navbar from './index'

export default async function NavWrapper() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const ALL_SECTIONS = ['publications', 'media', 'projects', 'teaching']
  const configuredSections = siteSettings?.sections as
    | { section: string; visible: boolean }[]
    | undefined

  const hiddenSections = configuredSections?.length
    ? configuredSections.filter((s) => !s.visible).map((s) => s.section)
    : ALL_SECTIONS

  return <Navbar hiddenSections={hiddenSections} />
}
