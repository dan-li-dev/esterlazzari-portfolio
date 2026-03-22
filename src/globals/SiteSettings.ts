import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'publicationsPerPage',
      type: 'number',
      label: 'Publications per page',
      defaultValue: 10,
      min: 1,
      max: 100,
      admin: {
        description: 'How many publications to show on the homepage. Sorted by most recent date.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections (drag to reorder)',
      admin: {
        description: 'Control visibility and order of the Publications, Media, and Projects sections.',
      },
      fields: [
        {
          name: 'section',
          type: 'select',
          label: 'Section',
          required: true,
          options: [
            { label: 'Publications', value: 'publications' },
            { label: 'Media Coverage', value: 'media' },
            { label: 'Projects', value: 'projects' },
          ],
        },
        {
          name: 'visible',
          type: 'checkbox',
          label: 'Visible',
          defaultValue: true,
        },
      ],
    },
  ],
}
