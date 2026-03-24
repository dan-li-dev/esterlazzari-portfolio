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
      name: 'cookieBannerEnabled',
      type: 'checkbox',
      label: 'Show cookie consent banner',
      defaultValue: false,
      admin: {
        description:
          'Display a cookie consent banner to visitors. Only enable if you are collecting cookies or running analytics that require consent.',
      },
    },
    {
      name: 'publicationsKeywordFilter',
      type: 'checkbox',
      label: 'Enable keyword filtering on publications',
      defaultValue: false,
      admin: {
        description:
          'When enabled, keyword pills are shown above the publications list so visitors can filter by topic.',
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
