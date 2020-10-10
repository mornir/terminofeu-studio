import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'entry',
  title: 'Begriffe',
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
      title: 'Verwandte Begriffe',
      name: 'relatedTerms',
      type: 'array',
      of: [{ type: 'entry' }],
    },
    {
      title: 'Bild',
      name: 'image',
      type: 'image',
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
          type: 'termLang',
          name: 'de',
          title: 'Deutsch',
          fieldset: 'de',
        },
        {
          type: 'termLang',
          name: 'fr',
          title: 'Französisch',
          fieldset: 'fr',
        },
        {
          type: 'termLang',
          name: 'it',
          title: 'Italienisch',
          fieldset: 'it',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content.de.vedette',
    },
  },
}
