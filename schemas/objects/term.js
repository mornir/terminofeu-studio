import React from 'react'
import { AiOutlineFileText } from 'react-icons/ai'

import { filter } from '../functions/sourceFn'

export default {
  title: 'Begriff',
  name: 'term',
  type: 'object',
  icon: AiOutlineFileText,
  fieldsets: [
    {
      name: 'abbreviation',
      title: 'Kurzform (falls vorhanden)',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: [
          { title: 'Hauptbegriff', value: 'main' },
          { title: 'Alternativ', value: 'variant' },
          { title: 'Zu vermeiden', value: 'avoid' },
          { title: 'Noch zu bestimmen', value: 'to_be_defined' },
        ],
      },
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'reference',
      to: [{ type: 'source' }],
      validation: (Rule) => Rule.required().error('Quelle fehlt beim Begriff'),
      options: {
        filter: filter,
      },
    },
    {
      title: 'Begriff',
      name: 'designation',
      type: 'string',
      description:
        'Begriffe sind in ihrer Grundform (z.B. Nominativ Singular) zu erfassen.',
    },
    {
      title: 'Quelle',
      name: 'abbreviationSource',
      type: 'reference',
      fieldset: 'abbreviation',
      to: [{ type: 'source' }],
      options: {
        filter: filter,
      },
    },
    {
      title: 'Abkürzung / Akronym / Silbenkurzwort',
      name: 'abbreviation',
      type: 'string',
      fieldset: 'abbreviation',
    },
  ],
  preview: {
    select: {
      term: 'designation',
      abbreviation: 'abbreviation',
      shortTitle: 'source.title',
      longTitle: 'source.longTitle',
      status: 'status',
    },
    prepare({ shortTitle, longTitle, term, abbreviation, status }) {
      const EMOJIS = {
        main: '✌️',
        variant: '👍',
        avoid: '👎',
        to_be_defined: '❓',
      }

      const title = abbreviation ? `${term} (${abbreviation})` : term

      const subtitle = longTitle ? longTitle : shortTitle

      return {
        title,
        subtitle,
        media: (
          <span style={{ fontSize: '1.5rem' }}>
            {status ? EMOJIS[status] : '✌️'}
          </span>
        ),
      }
    },
  },
}
