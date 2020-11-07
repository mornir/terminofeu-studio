import Tabs from 'sanity-plugin-tabs'
import langFn from '../builder/langFn'

import { getPublishedId } from 'part:@sanity/base/util/draft-utils'

export default {
  name: 'entry',
  title: 'Einträge',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Verwandte Einträge',
      name: 'relatedEntries',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'reference',
          to: [{ type: 'entry' }],
          options: {
            filter: ({ document }) => {
              return {
                filter: '_id != $id',
                params: {
                  id: getPublishedId(document._id),
                },
              }
            },
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'de', title: 'Deutsch' },
        { name: 'fr', title: 'Français' },
        { name: 'it', title: 'Italienisch' },
      ],
      fields: [
        langFn({ title: 'Deutsch', code: 'de' }),
        langFn({ title: 'Français', code: 'fr' }),
      ],
    },
  ],
  preview: {
    select: {
      term: 'content.de.terms.0.term',
      definition: 'content.de.definition',
    },
    prepare({ term, definition }) {
      const block = (definition || []).find((block) => block._type === 'block')
      return {
        title: term,
        subtitle: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'Keine Definition',
      }
    },
  },
  orderings: [
    {
      title: 'Alphabetical',
      name: 'alphabetical',
      by: [{ field: 'content.de.terms.0.term', direction: 'asc' }],
    },
  ],
}
