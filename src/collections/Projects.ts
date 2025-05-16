import { CollectionConfig } from 'payload'
export const Projects: CollectionConfig = {
  slug: 'projects',
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
      name: 'status',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
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
  ],
}
