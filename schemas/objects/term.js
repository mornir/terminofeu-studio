import { AiOutlineFileText } from 'react-icons/ai'

import { generateStatus } from '../builder/status'

import { description, filter } from '../builder/sourceData'

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
        list: generateStatus(),
      },
    },
    {
      title: 'Interne Bemerkungen',
      description: 'zum Begriff',
      name: 'internalNotes',
      type: 'text',
      rows: 5,
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'reference',
      description: description,
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
      description: description,
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
      status: 'status',
    },
    prepare({ status, term, abbreviation }) {
      const title = abbreviation ? `${term} (${abbreviation})` : term
      const subtitle = status
        ? generateStatus().find((s) => s.value === status).title
        : 'kein Status'

      return {
        title,
        subtitle,
      }
    },
  },
}
