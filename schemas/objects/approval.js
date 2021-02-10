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
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Zustimmen', value: 'approve' },
          { title: 'Ablehnen', value: 'reject' },
          { title: 'Ändern', value: 'changes_requested' },
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
