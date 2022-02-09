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
      // TODO: Delete field if no longer needed in the future
      type: 'string',
      name: 'status',
      title: 'Status',
      hidden: true,
      options: {
        list: [
          { title: 'Hauptbegriff', value: 'main' },
          { title: 'Alternativ', value: 'variant' },
          { title: 'Abgelehnt', value: 'rejected' },
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
      subtitle: 'source.title',
    },
    prepare({ subtitle, term, abbreviation }) {
      const title = abbreviation ? `${term} (${abbreviation})` : term
      return {
        title,
        subtitle,
      }
    },
  },
}
