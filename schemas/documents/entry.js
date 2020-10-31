import Tabs from 'sanity-plugin-tabs'

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
        {
          type: 'lang',
          name: 'de',
          title: 'Deutsch',
          fieldset: 'de',
        },
        {
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
        },
      ],
    },
  ],
  preview: {
    select: {
      term: 'content.de.preferredTerm.term',
      definition: 'content.de.definition',
    },
    prepare({ term, definition }) {
      console.log(term)
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
