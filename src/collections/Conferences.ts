import { CollectionConfig } from 'payload'

export const Conferences: CollectionConfig = {
  slug: 'conferences',
  access: {
    read: () => true, // ✅ Allow everyone to read
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'attendance',
      type: 'array',
      fields: [
        { name: 'date', type: 'date' },
        { name: 'location', type: 'text' },
      ],
      required: true,
    },
    {
      name: 'paperLink',
      type: 'text',
    },
  ],
}
