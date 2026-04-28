import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      publicationsPerPage: 10,
      sections: [
        { section: 'publications', visible: true },
        { section: 'media', visible: true },
        { section: 'projects', visible: true },
        { section: 'teaching', visible: true },
      ],
    },
  })

  console.log('✅ Site settings seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
