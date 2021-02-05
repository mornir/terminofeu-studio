import React from 'react'
import reviewers from '../data/reviewers'

export default {
  name: 'note',
  title: 'note',
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
      title: 'Freigeben',
      name: 'approval',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'text',
      title: 'Text',
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
        true: '✅',
        false: '❌',
        undefined: '➖',
      }

      return {
        title: `${author}: ${text}`,
        media: <span style={{ fontSize: '1.5rem' }}>{EMOJIS[approval]}</span>,
      }
    },
  },
}
