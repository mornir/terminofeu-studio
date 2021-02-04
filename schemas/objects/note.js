import React from 'react'

const authors = [
  { title: 'Hannes Häuselmann', value: 'HH' },
  { title: 'Alois Keel', value: 'AK' },
  { title: 'Matteo Guidinetti', value: 'MG' },
]

export default {
  name: 'note',
  title: 'note',
  type: 'object',
  fields: [
    {
      name: 'author',
      title: 'author',
      type: 'string',
      options: {
        list: authors,
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
      console.log(author)
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
