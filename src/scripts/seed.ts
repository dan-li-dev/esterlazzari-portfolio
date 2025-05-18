import payload from 'payload'
import path from 'path'
import fs from 'fs/promises'

const run = async () => {
  console.log('🚀 Payload initialized')

  const file = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8')
  const records = JSON.parse(file)

  for (const doc of records) {
    const result = await payload.create({
      collection: 'projects', // e.g. 'projects'
      data: doc,
    })

    console.log('✅ Inserted:', result.id)
  }

  console.log('🌱 Seed complete')
  process.exit()
}

run().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
