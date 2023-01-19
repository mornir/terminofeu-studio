import React from 'react'

export default {
  name: 'approval',
  title: 'approval',
  type: 'object',
  fields: [
    {
      name: 'author',
      title: 'Verfasser',
      type: 'string',
      initialValue: (value, { currentUser }) => {
        return currentUser.name ?? ''
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Zustimmung',
      name: 'approval',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Ja', value: 'approve' },
          { title: 'Nein', value: 'reject' },
        ],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      author: 'author',
      approval: 'approval',
    },
    prepare({ author, approval }) {
      const EMOJIS = {
        approve: '✅',
        reject: '❌',
        changes_requested: '➖',
        undefined: '...',
      }
      return {
        title: author,
        media: <span style={{ fontSize: '1.5rem' }}>{EMOJIS[approval]}</span>,
      }
    },
  },
}
