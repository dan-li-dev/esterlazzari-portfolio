import type { CollectionConfig } from 'payload'

export const Teaching: CollectionConfig = {
  slug: 'teaching',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'courseName',
  },
  fields: [
    {
      name: 'courseName',
      type: 'text',
      required: true,
      label: 'Course Name',
    },
    {
      name: 'institution',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Instructor', value: 'instructor' },
        { label: 'Co-Instructor', value: 'co-instructor' },
        { label: 'Teaching Assistant', value: 'ta' },
        { label: 'Guest Lecturer', value: 'guest-lecturer' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Leave empty if ongoing',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the course content or your role',
      },
    },
    {
      name: 'skills',
      type: 'relationship',
      label: 'Technical Skills Taught',
      relationTo: 'skills',
      hasMany: true,
      admin: {
        description: 'Skills and tools covered in this course',
        allowCreate: true,
      },
    },
    {
      name: 'courseLink',
      type: 'text',
      label: 'Course Link',
      admin: {
        description: 'Link to course page or syllabus',
      },
    },
  ],
}
