import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'entry',
  title: 'Einträge',
  type: 'document',
  fieldsets: [
    {
      title: 'Bild',
      name: 'image',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by
      },
    },
  ],
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
      of: [{ type: 'entry' }],
    },
    {
      title: 'Abbildung',
      name: 'image',
      type: 'image',
      description: 'z.B. Zeichnungen, grafische Darstellungen oder Schemata',
      fieldset: 'image',
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
}
