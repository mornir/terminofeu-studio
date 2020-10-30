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
      title: 'Abbildungen',
      name: 'illustrations',
      type: 'array',
      description: 'Zeichnungen, grafische Darstellungen oder Schemata',
      of: [{ type: 'illustration' }],
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
      term: 'content.de.terms[0].term',
      definition: 'content.de.definitions[0].definition',
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
      by: [{ field: 'content.de.preferredTerm', direction: 'asc' }],
    },
  ],
}
