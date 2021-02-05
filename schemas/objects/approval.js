import React from 'react'
import reviewers from '../data/reviewers'

export default {
  name: 'approval',
  title: 'approval',
  type: 'object',
  fields: [
    {
      name: 'author',
      title: 'Verfasser',
      type: 'string',
      options: {
        list: reviewers,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Zustimmung',
      name: 'approval',
      type: 'string',
      options: {
        list: [
          { title: 'Zustimmen', value: 'approve' },
          { title: 'Ablehnen', value: 'reject' },
        ], // <-- predefined values
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    },
    {
      name: 'text',
      title: 'Kommentar',
      type: 'text',
    },
  ],
  preview: {
    select: {
      author: 'author',
      text: 'text',
      approval: 'approval',
    },
    prepare({ author, text, approval }) {
      const EMOJIS = {
        approve: '✅',
        reject: '❌',
        undefined: '➖',
      }
      return {
        title: `${author}: ${text}`,
        media: <span style={{ fontSize: '1.5rem' }}>{EMOJIS[approval]}</span>,
      }
    },
  },
}
