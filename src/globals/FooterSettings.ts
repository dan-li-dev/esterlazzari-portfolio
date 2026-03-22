import type { GlobalConfig } from 'payload'

export const SOCIAL_PLATFORMS = [
  { label: 'Twitter / X', value: 'twitter' },
  { label: 'Bluesky', value: 'bluesky' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'University / Institution', value: 'university' },
  { label: 'Google Scholar', value: 'googleScholar' },
  { label: 'ResearchGate', value: 'researchgate' },
  { label: 'ORCID', value: 'orcid' },
  { label: 'GitHub', value: 'github' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Email', value: 'email' },
] as const

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          required: true,
          options: [...SOCIAL_PLATFORMS],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© Ester Lazzari. All rights reserved.',
    },
  ],
}
