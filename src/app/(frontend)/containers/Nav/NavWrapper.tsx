import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import Navbar from './index'

export default async function NavWrapper() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const hiddenSections = (
    (siteSettings?.sections as { section: string; visible: boolean }[] | undefined) ?? []
  )
    .filter((s) => !s.visible)
    .map((s) => s.section)

  return <Navbar hiddenSections={hiddenSections} />
}
