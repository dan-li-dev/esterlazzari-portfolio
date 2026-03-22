import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Conferences } from './collections/Conferences'
import { Publications } from './collections/Publications'
import { MediaCoverage } from './collections/MediaCoverage'
import { AboutSection } from './globals/AboutSection'
import { FooterSettings } from './globals/FooterSettings'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'Ester Lazzari admin panel',
      description: `Ester Lazzari's admin panel`,
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
    },
  },
  collections: [Media, Users, Publications, Projects, Conferences, MediaCoverage],
  globals: [AboutSection, FooterSettings, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db:
    process.env.NODE_ENV === 'development'
      ? sqliteAdapter({ client: { url: `file:${path.resolve(dirname, '..', 'local.db')}` } })
      : mongooseAdapter({ url: process.env.MONGODB_URI || '' }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
