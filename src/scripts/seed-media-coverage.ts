import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })

  // Create a 1x1 transparent PNG as a placeholder image for each media coverage item
  const placeholderPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64',
  )

  const items = [
    {
      title: 'Fertility Rates Drop to Record Lows Across Europe',
      publisher: 'The Guardian',
      link: 'https://theguardian.com/example',
    },
    {
      title: 'Late Motherhood: How Science Is Changing the Timeline',
      publisher: 'BBC News',
      link: 'https://bbc.com/news/example',
    },
    {
      title: 'IVF Access Inequality Revealed in New European Study',
      publisher: 'Le Monde',
      link: 'https://lemonde.fr/example',
    },
    {
      title: 'The Demography of the Future: An Interview with Ester Lazzari',
      publisher: 'Der Standard',
      link: 'https://derstandard.at/example',
    },
  ]

  console.log('Seeding media coverage...')
  for (const item of items) {
    // Write placeholder PNG to a temp file for upload
    const tmpPath = path.join(dirname, `_placeholder_${Date.now()}.png`)
    fs.writeFileSync(tmpPath, placeholderPng)

    const mediaDoc = await payload.create({
      collection: 'media',
      data: { alt: `placeholder_${item.publisher.replace(/\s/g, '_')}` },
      file: {
        data: placeholderPng,
        mimetype: 'image/png',
        name: `placeholder_${item.publisher.replace(/\s/g, '_')}.png`,
        size: placeholderPng.length,
      },
    })

    fs.unlinkSync(tmpPath)

    await payload.create({
      collection: 'media-coverage',
      data: {
        title: item.title,
        publisher: item.publisher,
        link: item.link,
        image: mediaDoc.id,
      },
    })

    console.log(`✓ ${item.publisher} — "${item.title}"`)
  }

  console.log('\n✅ Media coverage seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
