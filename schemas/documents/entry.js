import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'entry',
  title: 'Einträge',
  type: 'document',
  fields: [
    {
      title: 'Bereich',
      name: 'domain',
      type: 'reference',
      to: [{ type: 'domain' }],
    },
    {
      title: 'Verwandte Einträge',
      name: 'relatedTerms',
      type: 'array',
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
          type: 'term',
          name: 'de',
          title: 'Deutsch',
          fieldset: 'de',
        },
        {
          type: 'term',
          name: 'fr',
          title: 'Französisch',
          fieldset: 'fr',
        },
        {
          type: 'term',
          name: 'it',
          title: 'Italienisch',
          fieldset: 'it',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content.de.preferredTerm',
    },
  },
  orderings: [
    {
      title: 'Alphabetical Order',
      name: 'alphabeticalOrder',
      by: [{ field: 'content.de.preferredTerm', direction: 'asc' }],
    },
  ],
}
