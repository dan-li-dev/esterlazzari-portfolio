import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'about-section',
    data: {
      bio: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'I am a postdoctoral research fellow and lecturer at the University of Vienna, with a PhD in demography from the Australian National University. My research focuses on the causes and consequences of late fertility, with a particular attention to how assisted reproduction shapes fertility trends. My work has been published in leading demographic and medical journals, including Demography, Population and Development Review, and Human Reproduction.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      },
      twitterUrl: 'https://x.com/LazzariEster',
    },
  })

  console.log('✅ About section seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
