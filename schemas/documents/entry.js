import Tabs from 'sanity-plugin-tabs'
import langFn from '../objects/langFn'

import { getPublishedId } from 'part:@sanity/base/util/draft-utils'

export default {
  name: 'entry',
  title: 'Einträge',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Verwandte Einträge',
      name: 'relatedTerms',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'reference',
          to: [{ type: 'entry' }],
          options: {
            filter: ({ document }) => {
              console.log(document._id)
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
        { name: 'fr', title: 'Französisch' },
        { name: 'it', title: 'Italienisch' },
      ],
      fields: [
        langFn({ title: 'Deutsch', code: 'de' }),
        /*        {
          title: 'FR',
          name: 'fr',
          type: 'object',
          fieldset: 'fr',
          fields: [
            {
              type: 'array',
              name: 'alternativeTerms',
              title: 'Alternative Begriffe',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'frTerm' }],
                },
              ],
            },
          ],
        }, */
        /*         {
          type: 'lang',
          name: 'fr',
          title: 'Französisch',
          fieldset: 'fr',
        },
        {
          type: 'lang',
          name: 'it',
          title: 'Italienisch',
          fieldset: 'it',
        }, */
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
      by: [{ field: 'content.de.preferredTerm.term', direction: 'asc' }],
    },
  ],
}
