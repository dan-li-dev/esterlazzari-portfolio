import { CollectionConfig } from 'payload'

export const Publications: CollectionConfig = {
  slug: 'publications',
  access: {
    read: () => true, // ✅ Allow everyone to read
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'authors',
      type: 'text',
      required: true,
    },
    {
      name: 'journal',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media', // You can use Payload's media library for PDFs
    },
    {
      name: 'paperLink',
      type: 'text',
    },
    {
      name: 'scholarLink',
      type: 'text',
    },
  ],
}
