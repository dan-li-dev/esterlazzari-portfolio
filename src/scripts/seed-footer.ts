import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'footer-settings',
    data: {
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/LazzariEster' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/ester-lazzari-310550148/' },
        { platform: 'university', url: 'https://www.wittgensteincentre.org/en/staff/member/lazzari.htm' },
        { platform: 'googleScholar', url: 'https://scholar.google.es/citations?user=67ezXusAAAAJ&hl=en' },
        { platform: 'email', url: 'mailto:ester.lazzari@univie.ac.at' },
      ],
      copyrightText: '© 2012 – 2025 Ester Lazzari\nAll rights reserved.',
    },
  })

  console.log('✅ Footer settings seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
