import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'cv',
      label: 'CV (PDF only)',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { equals: 'application/pdf' },
      },
    },
    {
      name: 'twitterUrl',
      label: 'X (Twitter) Profile URL',
      type: 'text',
    },
  ],
}
